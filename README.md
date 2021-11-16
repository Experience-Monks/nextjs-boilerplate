<p align="center">
  <a href="https://terminalizer.com">
    <img src="docs/logo.jpg"/>
  </a>
</p>

# Jam3 NextJS Generator

![GitHub](https://img.shields.io/github/license/jam3/nyg-nextjs)
[![Codeship Status for Jam3/nyg-nextjs](https://app.codeship.com/projects/0fcd63a0-29d6-0138-cc17-02df0a7848fa/status?branch=master)](https://app.codeship.com/projects/384142)

> Boilerplate for React, Static and Server Side Rendered projects with NextJS

> https://generator.jam3.net

> Icon made by Pixel perfect from www.flaticon.com

---

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Release](#release)
- [Set up Git LFS](#setupgitlfs)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Check your Node and NPM versions.

Make sure you are using Node 14.x.x and NPM 7.x.x on your development environment. Using NVM is highly encouraged.

```properties
$ nvm use 14
$ npm install --global npm@7
```

> TIP: If you use ZSH, you can configure automatic Node switching: https://kinduff.com/2016/09/14/automatic-version-switch-for-nvm/

### Clone the GitHub repository

Or Fork it, and start working right away with it.

```properties
$ git clone https://github.com/Jam3/nyg-nextjs.git
```

### Set up CI/CD

Deploying a static site is fairly simple, we are going to the set up for Codeship.

#### 1. Create env variables with AWS Access Keys

Create three environment variables based on `.codeship/.env.codeship.[env].local.example`

Files:

- `.codeship/.env.codeship.dev.local`
- `.codeship/.env.codeship.stage.local`
- `.codeship/.env.codeship.prod.local`
- (optional) `.codeship/.env.codeship.ssh.local`

Make sure updating `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

> Note: The environment variable files **can't** be commited. Based on the name convention they are ignored by GIT.

#### 2. Create a Codeship Pro project in Codeship

- Go to Codeship
- Create a project and follow the general step to initiate it.

#### 3. Downloading the project AES Key

- Go to Project setting > General and download AES Key
- Rename it to codeship.aes

> Note: codeship.aes should never be committed to the repository.

#### 4. Generate encrypted env variables

Run commands below;

```properties
# go to .codeship directory/folder
$ cd .codeship

# encrypts files
$ ./encrypt-env.sh

# go back to the root
$ cd ..
```

> Note: you may face an issue if missing codeship.aes file locally.

#### 5. Update S3 and Cloudfront environment variables in codeship-services.yml

Update `S3_ORIGIN_BUCKET` and `DISTRIBUTION_ID` with your AWS information.

---

## Usage

#### 1. local Front End server

```properties
# http://localhost:3000
$ npm run dev
```

#### 2. storybook

```properties
# http://localhost:9001
$ npm run storybook
```

#### 3. template scripts

We are using [seng-generator](https://github.com/mediamonks/seng-generator) to generate templates

```properties
# cli
$ npm run generate

# create page(s)
$ npm run generate page [page-name]

# create api routes
$ npm run generate api [api-name]

# create component
$ npm run generate component [component-name]
```

Default location can be edited here:

- [page](scripts/templates/page/.senggenerator)
- [component](scripts/templates/component/.senggenerator)
- [api](scripts/templates/api/.senggenerator)

## Release

To releasing new versions we are using [standard-version](https://github.com/conventional-changelog/standard-version).

Steps:

1. When PRs/commits land to your master branch, select the Squash and Merge option.
2. Add a title and body that follows the [Conventional Commits Specification](https://www.conventionalcommits.org).
3. Run `$ git checkout master; git pull origin master`
4. Run `$ npm run release`
5. Run `$ git push --follow-tags origin master`

---

## Set up Git LFS

If you would like to track files with Git LFS follow the below steps. These steps assume docker is used to deploy, and might change based on your deployment infrastructure as it was tested in Jam3 infrastructures.

1. Generate SSH key + save it in a encrypted env variable
   You can use the [Codeship Pro guide](https://github.com/codeship-library/docker-utilities/tree/master/ssh-helper). The encrypted environment will be a different file name, like `.env.codeship.ssh.local`

2. Upload public SSH key to GitHub

3. Enable Git LFS ini the artifact.sh script, uncommenting the line `bash ./.codeship/set-lfs.sh`
4. Enable ssh config `encrypted_env_file: .env.codeship.ssh.encrypted` in `codeship-services.yml`

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

---

## License

[MIT](LICENSE)
