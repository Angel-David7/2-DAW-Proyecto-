set -euo pipefail

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    echo "Variable de entorno cargada desde .env"
else
    echo "Advertencia: no se encontró archivo .env, usando valores por defecto o variables de entorno ya exportadas"
fi

NODE_VERSION=$(cat .nvmrc || echo "24.0.1")
if command -v nvm &> /dev/null; then
