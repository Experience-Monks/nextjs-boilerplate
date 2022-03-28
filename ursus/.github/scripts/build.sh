#!/bin/bash
set -e

#### Running build ####
export COMMIT_ID=$(git log --pretty="%h" --no-merges -1)
export COMMIT_DATE="$(git log --date=format:'%Y-%m-%d %H:%M' --pretty="%cd" --no-merges -1)"
export COMMIT_TIME="$(git log --pretty="%at" --no-merges -1)"

#### Print Environment Variables ####
printenv

rm -rf ./out

npm run build:static

if [ "$CI_ENV" != "production" ]; then
  npm run build:storybook
fi

echo "$CI_COMMIT_ID/$CI_BUILD_ID" > out/VERSION.txt
