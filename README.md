# Welcome to Monks NextJS Generator! 🚀

Hey there, developer! Ready to dive into our awesome NextJS Boilerplate? This guide will help you set up and start developing in no time. Let's get started!

## Table of Contents

- [Setting Up](#setting-up)
- [Development](#development)
- [Documentation](#documentation)
- [License](#license)

## Setting Up

### 1. Check Your Node and NPM Versions

First things first, let's make sure you're using the right versions:

- Node: 18.19.0
- NPM: 10.2.3

Pro tip: Use NVM to manage your Node versions easily!

```bash
nvm install 18.19.0
nvm use 18.19.0
```

### 2. Install git-lfs

We use Git LFS for managing large files. Here's how to set it up:

- **For Ubuntu/Debian fans:**

  ```bash
  curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
  sudo apt-get install git-lfs
  ```

- **Mac users (with Homebrew):**

  ```bash
  brew update
  brew install git-lfs
  ```

- **Windows users:** Grab the installer from [Git LFS Releases](https://github.com/git-lfs/git-lfs/releases)

### 3. Set Up Your GSAP Token

To install our npm packages, you'll need a GSAP token. Ask your project lead for this key!

- **For Mac/Linux:**
  Add to your shell profile (e.g., `~/.bash_profile`, `~/.zshrc`):

  ```bash
  export GSAP_NPM_TOKEN=<your-gsap-token>
  ```

- **For Windows:**
  Choose your favorite method:
  1. Command Prompt:
     ```
     setx GSAP_NPM_TOKEN "<your-gsap-token>"
     ```
  2. PowerShell:
     ```powershell
     [Environment]::SetEnvironmentVariable("GSAP_NPM_TOKEN", "<your-gsap-token>", [System.EnvironmentVariableTarget]::User)
     ```
  3. GUI: Search for "Environment Variables" in the Start menu and add it there.

Remember to restart your terminal after setting this up!

### 4. Set Up Your Linters

For a smooth coding experience, set up these linters in VSCode:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

Update your VSCode settings (JSON) with our recommended configuration:

1. Press `Cmd + Shift + P` (on Mac) or `Ctrl + Shift + P` (on Windows/Linux)
2. Type "Open Settings (JSON)" and select it
3. Add or update the following settings:

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

These settings ensure that:

- Prettier formats your code on save
- ESLint fixes issues automatically
- Stylelint validates your CSS and SCSS files

With these linters set up, you'll catch and fix issues early, keeping your code clean and consistent!

### 5. Clone the Repo

```bash
git clone git@github.com:Experience-Monks/nextjs-boilerplate.git
```

### 6. Install Dependencies

```bash
npm install
```

## Development

Ready to code? Start your local server:

```bash
npm run dev
```

This will fire up:

- Frontend (https): https://localhost:3000
- Storybook: http://localhost:9001

## Documentation

Want to dive deeper? Check out our docs:

- [File Structure And Organization](./docs/file-structure-and-organization.md)
- [Template Generator](./docs/template-generator.md)
- [Copy Management](./docs/copy-management.md)
- [Import Aliases](./docs/import-aliases.md)

## License

We're open source! Check out our [MIT License](LICENSE).

Happy coding! 🎉👩‍💻👨‍💻
