FROM php:8.1-cli
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader

COPY src/ src/
COPY manual/ manual/

EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080", "-t", "src"]