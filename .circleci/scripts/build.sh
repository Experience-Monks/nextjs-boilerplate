#!/bin/bash
set -e

export COMMIT_ID=$(git rev-parse --short HEAD)
export COMMIT_COUNT=$(git rev-list --no-merges --count HEAD)
export BUILD_STRING_TIME=$(date +"%T")

rm -rf ./out

npm run build:static

echo "$CIRCLE_SHA1/$CIRCLE_BUILD_NUM" > out/VERSION.txt
