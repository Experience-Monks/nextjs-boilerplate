# Monks NextJS Generator

> NextJS Boilerplate for static and server side rendered projects

---

# Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Template Generator](./docs/template-generator.md)
- [File Structure And Organization](./docs/file-structure-and-organization.md)
- [Copy Management](./docs/copy-management.md)
- [License](#license)

## &nbsp;

# Installation

## Check your Node and NPM versions

Make sure you are using Node 18.19.0 and NPM 10.2.3 on your development environment to match CircleCI setup. Using NVM is highly encouraged.

```properties
$ nvm install 18.19.0
$ nvm use 18.19.0
```

> TIP: You can deeply integrate into your shell to automatically invoke NVM when changing directories.: https://github.com/nvm-sh/nvm#deeper-shell-integration

### &nbsp;

## Install git-lfs

Download git-lfs by following the steps based on your operating system.

- **Debian / Ubuntu**

  ```properties
  $ curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
  $ sudo apt-get install git-lfs
  ```

- **MacOS (Using Homebrew)**

  ```properties
  $ brew update
  $ brew install git-lfs
  ```

- **Windows**  
  Download and run the latest windows installer from https://github.com/git-lfs/git-lfs/releases.

### &nbsp;

## GSAP token

In order to install npm packages you will need a valid GSAP token set on your environment. You can get it from your project lead.

- **MacOS / Linux:**  
  Add the following to your shell profile (e.g. `~/.bash_profile`, `~/.zshrc`, etc.):

  ```properties
  export GSAP_NPM_TOKEN=<valid-gsap-auth-token>
  ```

- **Windows**  
  Here are three ways you can set the environment variable on windows.

  1. **Using the command prompt:**

  ```properties
  setx GSAP_NPM_TOKEN "<valid-gsap-auth-token>"
  ```

  2. **Using powershell:**

  ```properties
  [Environment]::SetEnvironmentVariable("GSAP_NPM_TOKEN", "<valid-gsap-auth-token>", [System.EnvironmentVariableTarget]::User)
  ```

  3. **Using the windows GUI.**

  - Open the start menu.
  - Search for the "Advanced System Settings" control panel and click on it.
  - Click on the "Environment Variables" button toward the bottom of the screen.
  - Follow the prompts to add the variable to the user table.

Remember to restart your terminal after setting the environment variable.

### &nbsp;

## Set up your linters

In order to save time developing it is highly recommended to have proper linters set up. Below are instructions for VSCode (if you use other editor configure it in a similar way).

- **Install Extensions:**
  - Eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  - Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  - Stylelint: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
    &nbsp;
- **Configuration:**
  On MacOS do `cmd + shift + p` > `Open Settings (JSON)`. This will open VSCode's settings.json.
  Make sure you have the following settings in your settings.json:

  ```json
  {
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "stylelint.validate": ["css", "scss"]
  }
  ```

### &nbsp;

## Clone the GitHub repository

```properties
$ git clone git@github.com:Experience-Monks/nextjs-boilerplate.git
```

### &nbsp;

## Install NPM dependencies:

```properties
$ npm install
```

## &nbsp;

# Development

## Local Front End server

```properties
$ npm run dev
```

The command above will start the development servers on different ports:

- Frontend (https): https://localhost:3000
- Storybook: http://localhost:9001

## &nbsp;

# License

[MIT](LICENSE)
