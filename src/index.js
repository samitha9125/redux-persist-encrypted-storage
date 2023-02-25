import EncryptedStorage from "react-native-encrypted-storage";

function replacer(key) {
  return key.replace(/[^a-z0-9.\-_]/gi, "_");
}

export default function createSecuredStorage() {
  return {
    getItem: key => EncryptedStorage.getItem(replacer(key)),
    setItem: (key, value) =>
      EncryptedStorage.setItem(replacer(key), JSON.stringify(value)),
    removeItem: key => EncryptedStorage.removeItem(replacer(key))
  };
}
