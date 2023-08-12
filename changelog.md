# Build V1 Beta
This is the first, optimized and production build. Although a lot has changed from last year, a key issue that was faced in the development of the website was the `ERR_OSSL_EVP_UNSUPPORTED` issue which can be fixed using NodeJS version `LTS 16.20.1`. 

*A quick but temporary fix for the NodeJS version `18.x` was to try using `NODE_OPTIONS=--openssl-legacy-provider npm run start` under the script tag in `package.json`

Later, I had to mix in Yarn and NPM in the installation and deployment of the site which might not be a good practice, it sure did fix the issue :D

There's a lot more I need to do, especially the issue with NodeJS version `18.x`. The issues will be noted more thoroughly in the discussions tab!

# Craft V2 Beta
This is the second, optimized and production build. Although this has the same issues as the previou version, it did come w/ a lot of makeover. One of the key points of this build is the use of colour, emojis and a newly added contact page.

OH, I now officially also include annonymous login :D but I am still trying to figure out on how to moderate these contents, as that is a major challenge.