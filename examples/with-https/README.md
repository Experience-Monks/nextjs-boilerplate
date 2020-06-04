# HTTPS example

In this folder, it contains only necessary files which means it will not function as its own. Please follow installation below.

# Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

1. Clone the GitHub repository or Fork it, and start working righ away with it.

```
git clone https://github.com/Jam3/nyg-nextjs.git
```

2. Copy `server.js` file to the root of the project

```
cp ./examples/with-https/server.js ./server.js
```

3. Create `certificates` folder in the root and go to the `certificates` folder

```
mkdir certificates && cd certificates
```

4. Run command to create certificate files locally

```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-private-key.pem -out localhost-cert.pem
```

5. Update .gitignore to not commit individuals certificate files.

```
// add this line in .gitignore
./certificates
```

6. Move to the root folder and Run local server

```
cd ..
node server.js
```

## License

[MIT](LICENSE)
