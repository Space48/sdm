
# Resources

 * [companies](#companies)
 * [users](#users)
 * [addresses](#addresses)

## companies

### Endpoints

 * [create](#companiescreate)
 * [delete](#companiesdelete)
 * [get](#companiesget)
 * [list](#companieslist)
 * [update](#companiesupdate)

### companies.create

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].companies.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.companies.create(input?: unknown);
```


### companies[].delete

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].companies[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.companies.$doc(id).delete(input?: unknown);
const command = bundleB2b.companies.$all.delete(input?: unknown);
```


### companies[].get

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].companies[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.companies.$doc(id).get(input?: unknown);
const command = bundleB2b.companies.$all.get(input?: unknown);
```


### companies.list

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].companies.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.companies.list(input?: unknown);
```


### companies[].update

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].companies[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.companies.$doc(id).update(input?: unknown);
const command = bundleB2b.companies.$all.update(input?: unknown);
```


## users

### Endpoints

 * [create](#userscreate)
 * [delete](#usersdelete)
 * [get](#usersget)
 * [list](#userslist)
 * [update](#usersupdate)

### users.create

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].users.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.users.create(input?: unknown);
```


### users[].delete

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].users[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.users.$doc(id).delete(input?: unknown);
const command = bundleB2b.users.$all.delete(input?: unknown);
```


### users[].get

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].users[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.users.$doc(id).get(input?: unknown);
const command = bundleB2b.users.$all.get(input?: unknown);
```


### users.list

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].users.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.users.list(input?: unknown);
```


### users[].update

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].users[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.users.$doc(id).update(input?: unknown);
const command = bundleB2b.users.$all.update(input?: unknown);
```


## addresses

### Endpoints

 * [create](#addressescreate)
 * [delete](#addressesdelete)
 * [get](#addressesget)
 * [list](#addresseslist)
 * [update](#addressesupdate)

### addresses.create

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].addresses.create' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.addresses.create(input?: unknown);
```


### addresses[].delete

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].addresses[id|*].delete' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.addresses.$doc(id).delete(input?: unknown);
const command = bundleB2b.addresses.$all.delete(input?: unknown);
```


### addresses[].get

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].addresses[id|*].get' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.addresses.$doc(id).get(input?: unknown);
const command = bundleB2b.addresses.$all.get(input?: unknown);
```


### addresses.list

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].addresses.list' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.addresses.list(input?: unknown);
```


### addresses[].update

*CLI*
```sh
$ sdm 'bundle-b2b[some-store-alias].addresses[id|*].update' [input-as-json5]
```

*TypeScript*
```javascript
const command = bundleB2b.addresses.$doc(id).update(input?: unknown);
const command = bundleB2b.addresses.$all.update(input?: unknown);
```


