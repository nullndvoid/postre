#!/bin/sh

set -e

# Make a read-only user. Might not be required.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER postre_readonly WITH PASSWORD '$POSTGRES_READONLY_PASSWORD';
	ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO postre_readonly;
EOSQL
