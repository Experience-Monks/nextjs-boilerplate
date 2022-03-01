cd out

# Setup
if [ "$CI_ENV" == "develop" ]; then
  export DELETE_OLD_FILES=--delete
fi

# Sync bundles with strong cache
aws s3 sync ./favicons s3://$S3_ORIGIN_BUCKET/favicons --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}
aws s3 sync ./_next s3://$S3_ORIGIN_BUCKET/_next --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}
aws s3 sync ./assets s3://$S3_ORIGIN_BUCKET/assets --metadata-directive 'REPLACE' --cache-control max-age=31536000,public ${DELETE_OLD_FILES}

# Sync htmls and others with no cache
aws s3 sync ./ s3://$S3_ORIGIN_BUCKET --exclude "favicons/*" --exclude "_next/*" --exclude "assets/*" ${DELETE_OLD_FILES}
aws configure set preview.cloudfront true

# Invalidate S3 object
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
