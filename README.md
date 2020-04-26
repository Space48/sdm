# sdm


## Getting Started

* Create github access token with `read packages` and `repo` privs: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
* Using your github user access token as password, run `npm login --registry=https://npm.pkg.github.com --scope=@space48`
* Install sdm: `npm i -g @space48/sdm`
* Install jq: `brew install jq`
* Authenticate an m2 instance `sdm m2:creds:set http://foobar.test --username foo --password bar`
* Get a product from m2 `sdm m2:product:list http://foobar.test | head -n1 | jq`
