FROM php:8.2-fpm-alpine

WORKDIR /app

#install packages
RUN apk update && apk add \
    build-base \
    vim \
    bash \
    curl \
    supervisor \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql bcmath


RUN apk add --update --no-cache autoconf g++ imagemagick-dev libtool make pcre-dev \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apk del autoconf g++ libtool make pcre-dev

#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add ini-files
COPY  ./.deploy/php.ini /usr/local/etc/php/conf.d/40-custom.ini
COPY  ./.deploy/supervisor/supervisor.ini /etc/supervisor.d/supervisor.ini

# Clean
RUN rm -rf /var/cache/apk/* && docker-php-source delete

# Install composer dependencies
COPY ./composer.lock /app
COPY ./composer.json /app
ARG COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-interaction --no-autoloader --no-scripts

# Copy laravel project files
COPY . /app
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache
RUN composer dump-autoload --optimize


EXPOSE 9000

