#!/bin/bash
set -e

export COMMIT_ID=$(git log --pretty="%h" --no-merges -1)
export COMMIT_DATE="$(git log --date=format:'%Y-%m-%d %H:%M' --pretty="%cd" --no-merges -1)"

echo "ARTIFACT VERSION $VERSION_NUMBER"

rm -rf ./out

npm run build:next

echo "$CIRCLE_SHA1/$CIRCLE_BUILD_NUM" > out/VERSION.txt
