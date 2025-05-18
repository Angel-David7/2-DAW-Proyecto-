FROM php:8.1-cli 

WORKDIR /app

COPY composer.json .

RUN apt-get update && apt-get- install -y libzip-dev-unzip

RUN curl -sS https://getcomposer.org/installer | php -- -- install-dir=/usr/local/bin -- filename=composer

RUN composer install -- no-dev

COPY . .

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080","-t", "src"]