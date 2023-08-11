# Build V1 Beta
This is the first, optimized and production build. Although a lot has changed from last year, a key issue that was faced in the development of the website was the `ERR_OSSL_EVP_UNSUPPORTED` issue which can be fixed using NodeJS version `LTS 16.20.1`. 

*A quick but temporary fix for the NodeJS version `18.x` was to try using `NODE_OPTIONS=--openssl-legacy-provider npm run start` under the script tag in `package.json`

Later, I had to mix in Yarn and NPM in the installation and deployment of the site which might not be a good practice, it sure did fix the issue :D

There's a lot more I need to do, especially the issue with NodeJS version `18.x`. The issues will be noted more thoroughly in the discussions tab!