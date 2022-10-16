# Stop server
docker stop women-mssql-server

# Remove server
docker rm women-mssql-server

# Force delete server volume
docker volume prune --force

# sleep 5 seconds
sleep 5

# Start server
# docker run -e 'HOMEBREW_NO_ENV_FILTERING=4' -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password$1234' -p 1433:1433 --name=women-mssql-server -d liaisonintl/mssql-server-linux
docker run -e "ACCEPT_EULA=Y" -e 'ID=SA' -e 'SA_PASSWORD=<Password$1234>' -p 1433:1433 --name women-mssql-server -d mcr.microsoft.com/mssql/server:2022-latest

# Sleep 15 seconds
sleep 15

# Create database
sqlcmd -S 127.0.0.1 -U SA -P '<Password$1234>' -i cDB.sql

# Create tables
sqlcmd -S 127.0.0.1 -U SA -P '<Password$1234>' -i cTables.sql

# Insert women
sqlcmd -S 127.0.0.1 -U SA -P '<Password$1234>' -i iWomen.sql

# Notes ----------------------------------------------------------

# https://www.geeksforgeeks.org/what-is-docker-images/
# https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&pivots=cs1-bash

# Clone
# docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
# docker cp repo:/git/getting-started/ .

# Build
# cd getting-started
# docker build -t docker101tutorial .

# Run
# docker run -d -p 80:80 --name docker-tutorial docker101tutorial

# Share
# docker tag docker101tutorial endybendy/docker101tutorial
# docker push endybendy/docker101tutorial

# Try docker
# docker run -d -p 80:80 docker/getting-started