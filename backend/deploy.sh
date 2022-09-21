echo 'Starting deployment...'

echo 'Removing node_modules...'
rm -r ./node_modules

echo 'Done. Installing packages...'
npm install

echo 'Done. Running predeploy...'
npm run predeploy