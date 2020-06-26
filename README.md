sdm
===

Installation
------------

Check the [pre-requisites for installation](#pre-requisites-for-installation) and then install sdm using npm:
```bash
npm i -g @space48/sdm
```

Pre-requisites for installation
-------------------------------

### Configure @space48 npm scope

sdm is distributed as a private npm package in the @space48 scope. To install sdm and other private Space 48 npm
packages, you must first configure the @space48 scope in npm.

1. [Create a github access token](https://github.com/settings/tokens/new) with `read packages` and `repo` privileges
2. Configure npm so that you can install sdm and other private Space 48 packages

    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@space48
    ```

### Enable node 10

sdm requires node 10. Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to enable node 10:
```bash
nvm use 10
```
