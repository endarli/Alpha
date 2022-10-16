# Stop server
docker stop women-mssql-server

# Remove server
docker rm women-mssql-server

# Force delete server volume
docker volume prune --force