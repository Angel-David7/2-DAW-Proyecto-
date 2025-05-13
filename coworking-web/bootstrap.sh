#!/usr/bin/env bash

# bootstrap.sh - Script de arranque para crear y poblar la base de datos Postgres
# Debe ejecutarse desde la raíz del proyecto (donde está knexfile.js)

set -euo pipefail

# Cargar variables de entorno de .env (si existe)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
  echo "Variables de entorno cargadas desde .env"
else
  echo "Advertencia: no se encontró archivo .env, usando valores por defecto o variables de entorno ya exportadas"
fi

# Versión de Node.js deseada (nvm)
NODE_VERSION=$(cat .nvmrc || echo "18")
if command -v nvm &> /dev/null; then
  echo "Usando nvm para cambiar a Node.js $NODE_VERSION"
  nvm install "$NODE_VERSION"
  nvm use "$NODE_VERSION"
else
  echo "nvm no encontrado; asegúrate de usar Node $NODE_VERSION"
fi

# Variables de conexión
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-greenwork}
DB_PASSWORD=${DB_PASSWORD:-secret}
DB_NAME=${DB_NAME:-greenwork}

# Crear rol y base de datos en Postgres
echo "Creando rol y base de datos en Postgres..."
psql "postgresql://postgres@${DB_HOST}:${DB_PORT}/postgres" <<-PSQL
  DO
  \$do\$
  BEGIN
    IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}'
    ) THEN
      CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';
    END IF;
  END
  \$do\$;
  
  -- Crear base de datos si no existe
  SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec;
PSQL

# Instalar dependencias y ejecutar migraciones/seeds
echo "Instalando dependencias en backend..."
cd backend
npm install

echo "Ejecutando migraciones..."
npx knex migrate:latest

echo "Ejecutando seeds..."
npx knex seed:run

# Volver al directorio raíz
echo "Base de datos lista y poblada correctamente."
cd -
