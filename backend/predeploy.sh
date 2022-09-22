echo 'Starting predeployment...'

echo 'Removing node_modules...'
rm -r ./node_modules

echo 'Done. Installing packages...'
npm install

echo 'Done. Running deploy-init...'
npm run deploy-init

# Only run once
# echo 'Done. Running db-init...'
# npm run db-init