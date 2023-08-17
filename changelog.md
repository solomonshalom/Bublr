# Build - Alpha (11 Aug'23)
This is the first, optimized and production build. Although a lot has changed from last year, a key issue that was faced in the development of the website was the `ERR_OSSL_EVP_UNSUPPORTED` issue which can be fixed using NodeJS version `LTS 16.20.1`. 

*A quick but temporary fix for the NodeJS version `18.x` was to try using `NODE_OPTIONS=--openssl-legacy-provider npm run start` under the script tag in `package.json`

Later, I had to mix in Yarn and NPM in the installation and deployment of the site which might not be a good practice, but it sure did fix the issue :D

There's a lot more I need to do, especially the issue with NodeJS version `18.x`. The issues will be noted more thoroughly in the discussions tab!

# Craft - Alpha (12 Aug'23)
This is the second, optimized and production build. Although this has the same issues as the previous version, it did come w/ a lot of makeovers. One of the key points of this build is the use of color, emojis, and a newly added contact page.

OH, I now officially also include an anonymous login :D but I am still trying to figure out how to moderate these contents, as that is a major challenge.

This is still considered beta due to the now-and-then code changes happening which could potentially break the UI, which is why I suggest using it w/ care and not playing rough, at least for now.

# Alabaster - Beta (14 Aug'23)
FINALLY, we're officially in Beta! W/ a production DB and a Guide tab added - this will be a game-changer! There are still going to be a lot of commits being pushed but nothing that will potentially break (Can't promise!). The styling has also been made better and optimized for both Mobile and Desktop. 

P.S - Every Glory and Honor is to our Lord and Saviour, Jesus Christ! Couldn't have done it w/o him, for he gave me the wisdom that I needed! :D

# Brown - Production (17th Aug'23)
WOHOO! We did it, the production version of The Abyss is up and ready to be used! W/ everything set-up and after initial tests, The Abyss is ready to run and explore the beautiful world of the Internet.

A major bug that does still exists, is the NodeJS version error (As documented in the first version [Build]). Though, we're launching the production version of The Abyss due to the fact that the error not really affecting any users and that we have tons of time to find the ultimate fix. 

P.S - God Is Good, All The Time!