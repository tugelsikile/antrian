git reset --hard
git pull https://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:x-oauth-basic@github.com/tugelsikile/antrian.git main
php artisan route:cache
php artisan config:cache
php artisan migrate
chmod -R 755 public
chmod -R 777 storage
chmod 777 .env
