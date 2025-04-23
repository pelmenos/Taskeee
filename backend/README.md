# Hpace CRM

```shell
sh storage/data/logs/create.sh

cp .env.example .env

composer install

php artisan migrate --seed
php artisan storage:link
php artisan key:generate
```
