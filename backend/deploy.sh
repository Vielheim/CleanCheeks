echo 'Starting deployment...'

echo 'Removing node_modules...'
rm -r ./node_modules

echo 'Done. Installing packages...'
npm install

echo 'Done. Building...'
npm run build 

echo 'Done. Running migrations...'
npm run db-init