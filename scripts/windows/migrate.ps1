# /*                                            *\
# ** ------------------------------------------ **
# **           Sample - Weather SPA    	      **
# ** ------------------------------------------ **
# **  Copyright (c) 2020 - Kyle Derby MacInnis  **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

# Read .ENV Variables
$env:BUILD_PATH="$(Get-Location)"
Set-Location $env:BUILD_PATH;

foreach( $line in $(Get-Content "$env:BUILD_PATH\.env")){
    $envData = $line.Split('=')
    [Environment]::SetEnvironmentVariable($envData[0], $envData[1], "User")   
}

Set-Location $env:BUILD_PATH\server

yarn

yarn migrate

Set-Location $env:BUILD_PATH;
