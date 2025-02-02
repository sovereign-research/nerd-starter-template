/*                                            *\
** ------------------------------------------ **
**           Sample - NERD Starter    	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

module.exports = (() => {
  // THIRD-PARTY LIBRARIES
  const bodyparser = require("body-parser");
  const cookieparser = require("cookie-parser");
  const cors = require("cors");
  const session = require("express-session");
  const express = require("express");
  const app = express();
  const server = require("http").Server(app);
  const FileUpload = require("express-fileupload");

  // CONFIGURATION
  const Env = require("../config/env");
  const Error = require("../lib/common/Error");
  const DB = require("../lib/database");
  const Storage = require("../lib/storage");

  // INDEX MODULES
  const index = require("../routes/index");

  // SERVER
  server.listen(Env.API_PORT, () => {
    console.log("NERD Starter Template is Now Live @ PORT: ", Env.API_PORT);
    console.log("Using Storage Driver :: ", Storage.version);

    // Request Handling
    app.use(session(Env.SESSION_CONF));
    app.use(cookieparser());
    app.use(cors());
    app.use(FileUpload());
    app.use(bodyparser.json({ limit: "10mb" }));
    app.use(
      bodyparser.urlencoded({
        limit: "10mb",
        extended: false,
      })
    );

    // API 
    app.use("/api/:ver", (req, res) => {
      try {
        let apiVer = req.params.ver;
        switch (apiVer) {
          case "v1":
            apiRouter = require("../routes/" + apiVer + "/index.js");
            apiRouter(req, res);
            break;
          default:
            throw "Invalid API Version";
        }
      } catch (e) {
        console.log(e);
        Error.setError("Error", 400, e);
        Error.sendError(res);
      }
    });

    // File Storage (if being Used - ie. File Driver)
    if (Env.STORAGE_TYPE === "file")
      app.use("/storage", express.static(__dirname + "/../storage"));

    // Web App
    app.use("/static", express.static(__dirname + "/../build"));
    app.use("/", index);

    // Database Sync
    DB.sync();
  });

  // ERROR
  process.on("uncaughtException", function (e) {
    console.log("ERROR: " + e);
    if (e.errno === "EADDRINUSE") {
      // Read in New Port if unavailable
      console.log("Error ---> Port in Use: Please select another port: ");
      const readline = require("readline");
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        "PORT IN USE: Please select a different port (3000+)? ",
        (answer) => {
          // TODO: Log the answer in a database
          rl.close();
          let port = answer;
          server.listen(port);
        }
      );
    }
  });

  return server;
})();
