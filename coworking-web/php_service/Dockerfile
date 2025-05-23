# Usa PHP 8.1 CLI con extensiones PDO y PostgreSQL
FROM php:8.1-cli

WORKDIR /app

# Instala dependencias: unzip, git, extensiones de PDO y PostgreSQL
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia archivos de Composer e instala dependencias
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copia el código fuente
COPY src/ src/

# Exponer puerto 8080
EXPOSE 8080

# Arrancar el servidor interno de PHP
CMD ["php", "-S", "0.0.0.0:8080", "-t", "src"]