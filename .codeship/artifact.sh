#!/bin/bash
set -e

#### Running build ####
export COMMIT_ID=$(git rev-parse --short HEAD)
export COMMIT_COUNT=$(git rev-list --no-merges --count HEAD)

## Set Git LFS
# bash ./.codeship/set-lfs.sh

npm run build:static

rm -rf /artifacts/build
mv ./out /artifacts/build

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > /artifacts/build/VERSION.txt
