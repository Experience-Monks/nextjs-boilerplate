#!/bin/bash
set -e

#### Running build ####
export COMMIT_ID=$(git rev-parse --short HEAD)
export COMMIT_COUNT=$(git rev-list --no-merges --count HEAD)

rm -rf ./out

npm run build:static

if [ "$CI_ENV" != "production" ]; then
  npm run build:storybook
fi

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > out/VERSION.txt
