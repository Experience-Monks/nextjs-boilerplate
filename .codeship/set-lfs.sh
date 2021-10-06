#!/bin/bash

## Set GitHub private key
mkdir -p $HOME/.ssh
echo -e $PRIVATE_SSH_KEY >> $HOME/.ssh/id_rsa
chmod 600 $HOME/.ssh/id_rsa
ssh-keyscan -H github.com >> $HOME/.ssh/known_hosts

## Download Git LFS
GIT_LFS_VERSION=${GIT_LFS_VERSION:="2.7.0"}
GIT_LFS_DIR=${GIT_LFS_DIR:="./git-lfs"}
GIT_LFS_CACHE_DIR=${GIT_LFS_DIR:="./git-lfs-cache"}
REPO_DIR=$(readlink -f ".")
DOWNLOAD_URL_PREFIX="git-lfs-linux-amd64-"
STRIP_COMPONENTS=1

set -e

if [ "${GIT_LFS_VERSION:0:1}" -ge 2 ] && [ "${GIT_LFS_VERSION:2:1}" -ge 5 ]; then
        DOWNLOAD_URL_PREFIX="git-lfs-linux-amd64-v"
        STRIP_COMPONENTS=0
fi

CACHED_DOWNLOAD="${GIT_LFS_CACHE_DIR}/${DOWNLOAD_URL_PREFIX}${GIT_LFS_VERSION}.tar.gz"
mkdir -p "${GIT_LFS_DIR}"
mkdir -p "${GIT_LFS_CACHE_DIR}"

wget --continue --output-document "${CACHED_DOWNLOAD}" "https://github.com/github/git-lfs/releases/download/v${GIT_LFS_VERSION}/${DOWNLOAD_URL_PREFIX}${GIT_LFS_VERSION}.tar.gz"
tar -xaf "${CACHED_DOWNLOAD}" --strip-components=${STRIP_COMPONENTS} --directory "${GIT_LFS_DIR}"

## Install Git LFS
(
  cd "${GIT_LFS_DIR}" || exit 1
  bash ./install.sh
)

(
  cd "${REPO_DIR}" || exit 1
  git lfs fetch
  git lfs checkout
)

git lfs version | grep "git-lfs/${GIT_LFS_VERSION}"

## Remove GitHub private key from persisting in the container
rm -rf $HOME/.ssh
