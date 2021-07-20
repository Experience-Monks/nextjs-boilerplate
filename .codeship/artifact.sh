#!/bin/bash
set -e

#### Running build ####
export COMMIT_ID=$(git rev-parse --short HEAD)

npm run build:static

rm -rf /artifacts/build
mv ./out /artifacts/build

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > /artifacts/build/VERSION.txt
