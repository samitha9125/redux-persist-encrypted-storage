import EncryptedStorage from "react-native-encrypted-storage";

const noop = () => null;
const replacer = (key) => {
  return key.replace(/[^a-z0-9.\-_]/gi, "_");
};

export default function createSecuredStorage() {
  return {
    getItem: async (key) => {
      const items = await EncryptedStorage.getItem(replacer(key));
      return JSON.parse(items);
    },
    setItem: async (key, value, callback = noop) => {
      try {
        const newValues = JSON.stringify(value);
        await EncryptedStorage.setItem(replacer(key), newValues);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },
    removeItem: async (key, callback = noop) => {
      try {
        await EncryptedStorage.removeItem(replacer(key));
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },
  };
}
