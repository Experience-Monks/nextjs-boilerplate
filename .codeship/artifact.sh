#!/bin/bash
set -e

#### Running build ####
npm run build:prod:static

rm -rf /artifacts/build
mv ./out /artifacts/build

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > /artifacts/build/VERSION.txt
