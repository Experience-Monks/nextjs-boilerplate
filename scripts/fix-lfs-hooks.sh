#!/bin/sh
ls .husky/lfs-hooks >> /dev/null 2>&1 || (
  rm -rf .git/hooks 
  git config --unset core.hooksPath 
  git lfs install  
  mv .git/hooks .husky/lfs-hooks 
  rm -rf node_modules/husky  
  npm install 
  git lfs pull
)