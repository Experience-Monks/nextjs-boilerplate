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
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Clone the GitHub repository or Fork it, and start working righ away with it.

```
git clone https://github.com/Jam3/nyg-nextjs.git
```

### Set up CI/CD

Deploying a static site is fairly simple, we are going to the set up for Codeship.

#### 1. Create env variables with AWS Access Keys

Create three environment variables based on `.env.codeship.[env].local.example`

Files:

- .env.codeship.dev.local
- .env.codeship.stage.local
- .env.codeship.prod.local

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

Run `$ ./encrypt-env.sh`.

> Note: you may face an issue if missing codeship.aes file locally.

#### 5. Update S3 and Cloudfront environment variables in codeship-services.yml

Update `S3_ORIGIN_BUCKET` and `DISTRIBUTION_ID` with your AWS information.

---

## Usage

#### 1. local Front End server

```
// http://localhost:3000
npm run dev
```

#### 2. storybook

```
// http://localhost:9001
npm run storybook
```

#### 3. template scripts

```
// create page(s)
npm run page [page-name 1] [page-name 2] ...

// create sub-page(s)
npm run page [parent page-name]/[child page-name]

// create api routes
npm run api [api-name 1] [api-name 2]

// create component(s)
npm run component [component-name 1] [component-name 2] ...

// create sub-component(s)
npm run component [parent component-name]/[child component-name]
```

---

## Release

To releasing new versions we are using [standard-version](https://github.com/conventional-changelog/standard-version).

Steps:

1. When PRs/commits land to your master branch, select the Squash and Merge option.
2. Add a title and body that follows the [Conventional Commits Specification](https://www.conventionalcommits.org).
3. Run `$ git checkout master; git pull origin master`
4. Run `$ npm run release`
5. Run `$ git push --follow-tags origin master`

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

---

## License

[MIT](LICENSE)
