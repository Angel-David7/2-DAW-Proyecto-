#!/usr/bin/env bash

# bootstrap.sh - Script para crear y poblar la BD,
# instalando deps con pnpm y ejecutando Knex.
# Debe ejecutarse desde backend/:  cd backend && ./bootstrap.sh

set -euo pipefail

# Determinar rutas
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(realpath "$SCRIPT_DIR/..")"

# Cargar .env desde la raíz
if [ -f "$ROOT_DIR/coworking-web/.env" ]; then
  export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)
  echo "✔ Variables de entorno cargadas desde $ROOT_DIR/.env"
else
  echo "⚠️ No se encontró $ROOT_DIR/.env; usando valores por defecto/exportados"
fi

# Cargar nvm (si no está en PATH)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # Si nvm está instalado vía script oficial
  source "$HOME/.nvm/nvm.sh"
elif command -v nvm &>/dev/null; then
  echo "nvm ya en PATH"
else
  echo "nvm no encontrado; instala y carga nvm para usar .nvmrc"
fi

# Seleccionar versión Node según .nvmrc en raíz
NODE_VERSION="$(cat "$ROOT_DIR/coworking-web/.nvmrc" || echo "18")"
if command -v nvm &>/dev/null; then
  echo "Usando Node.js $NODE_VERSION (nvm)"
  nvm install "$NODE_VERSION"
  nvm use "$NODE_VERSION"
else
  echo "⚠️ No se pudo usar nvm; asegúrate de tener Node $NODE_VERSION"
fi

# Variables de conexión (sobreescribibles en .env)
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-greenwork}"
DB_PASSWORD="${DB_PASSWORD:-secret}"
DB_NAME="${DB_NAME:-greenwork}"

# Crear rol y base de datos en Postgres
echo "➡ Creando rol y BD en Postgres si no existen..."
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

  -- Crear base de datos
  SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec;
PSQL

# Desde backend/, instalar dependencias y ejecutar Knex con pnpm
echo "➡ Instalando dependencias con pnpm..."
cd "$SCRIPT_DIR"
pnpm install --frozen-lockfile

echo "➡ Ejecutando migraciones..."
pnpm exec knex migrate:latest

echo "➡ Ejecutando seeds..."
pnpm exec knex seed:run

echo "Base de datos lista y poblada correctamente."
