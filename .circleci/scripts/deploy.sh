#!/bin/bash
set -e

#### Synchronizing with AWS ####
cd out

# Setup
if [ "$CI_ENV" == "development" ]; then
  export DELETE_OLD_FILES=--delete
fi

# Sync bundles with strong cache
aws s3 sync ./common/favicons s3://${S3_ORIGIN_BUCKET}/common/favicons --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}
aws s3 sync ./_next s3://${S3_ORIGIN_BUCKET}/_next --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}
aws s3 sync ./common/assets s3://${S3_ORIGIN_BUCKET}/common/assets --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}

# Sync htmls and others with no cache
aws s3 sync ./ s3://${S3_ORIGIN_BUCKET} --exclude "common/favicons/*" --exclude "_next/*" --exclude "common/assets/*" ${DELETE_OLD_FILES}

# at this point you should invaldiate cache
# this is now in cache-invalidate.sh
