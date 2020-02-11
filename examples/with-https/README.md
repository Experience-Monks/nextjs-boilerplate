# nyg-nextjs with-https

Primary focus on this example is to demonstrate how to run `https` server.

### 1. Create public and private key in `certificates` folder

```
$ cd certificates

$ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-private-key.pem -out localhost-cert.pem
```

### 2. Run localhost
```
// in project's root folder
$ npm run dev-https
```

