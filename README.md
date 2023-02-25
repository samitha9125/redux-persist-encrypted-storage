# redux-persist-encrypted-storage
[![Maintainability](https://api.codeclimate.com/v1/badges/e700ec33f7251abe0266/maintainability)](https://codeclimate.com/github/samitha9125/redux-persist-encrypted-storage/maintainability)

[![Known Vulnerabilities](https://snyk.io/test/github/samitha9125/redux-persist-encrypted-storage/badge.svg)](https://snyk.io/test/github/samitha9125/redux-persist-encrypted-storage)

Well known and trusted [React Native Encrypted Storage](https://www.npmjs.com/package/react-native-encrypted-storage) based [redux-persist](https://github.com/rt2zz/redux-persist) Storage Engine.

This library is using the well known and trusted `React Native Encrypted Storage` library under the hood to store your data in a secure way. According to the developers, react native encrypted storage uses a wrapper around Android's `EncryptedSharedPreferences` and iOS' `Keychain` and developed with the support for TypeScript.

## Installation

Ensure to install the `react-native-encrypted-storage` library as a dependency. [Check the installation guide](https://github.com/emeraldsanto/react-native-encrypted-storage#installation).

And also install the `redux-persist-encrypted-storage` library.

```bash
yarn add redux-persist-encrypted-storage
# or
npm install --save redux-persist-encrypted-storage
```

## Usage

#### Use as a `redux-persist` global storage engine:

```js
import createSecuredStorage from "redux-persist-encrypted-storage";

import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import reducers from "./reducers";

// Secured storage
const secureStorage = createSecuredStorage();

const config = {
  key: "encrypted",
  secureStorage
};

const reducer = persistCombineReducers(config, reducers);

function configureStore() {
  // ...
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
}
```

#### Use as a separate engine for a subset of your reducers:

```js
import createSecuredStorage from "redux-persist-encrypted-storage";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { mainReducers, securedReducers } from "./reducers";

// Secure storage configurations
const secureStorage = createSecuredStorage();
const securePersistConfig = {
  key: "secure",
  storage: secureStorage
};

// Non-secure storage configurations
const mainPersistConfig = {
  key: "main",
  storage: AsyncStorage
};

// Combine both reducers into one root reducer
const rootReducer = combineReducers({
  insecure: persistReducer(mainPersistConfig, mainReducers),
  secure: persistReducer(securePersistConfig, secureReducers)
});

function configureStore() {
  let store = createStore(rootReducer);
  let persistor = persistStore(store);

  return { persistor, store };
}
```

## Caveat

Keys for the Encrypted Storage only support `[A-Za-z0-9.-_]`, meaning all other characters are replaced by an internal `replacer` function (defaults to `_`).

## Note

Inspired by [redux-persist-expo-securestore](https://github.com/Cretezy/redux-persist-expo-securestore).
