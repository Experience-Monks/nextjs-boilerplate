#!/bin/bash
set -e

#### Running runtime linters ####
npm run build:prod:static
npm run ci-prod-server
npm run adviser-ci

#### Synchronizing with AWS ####
cd out

# No cache
aws s3 sync ./ s3://${S3} --delete --exclude "favicons/*" --exclude "_next/*"

# Strong cache
aws s3 sync ./favicons s3://${S3}/favicons --delete --metadata-directive 'REPLACE' --cache-control max-age=31536000,public
aws s3 sync ./_next s3://${S3}/_next --delete --metadata-directive 'REPLACE' --cache-control max-age=31536000,public
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id ${CF} --paths "/*"
