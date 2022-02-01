import * as SecureStore from "expo-secure-store";

function useSecureStore() {
  async function save(key, value) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (err) {
      // TODO: Add error handling.
      console.log(err);
    }
  }

  async function getValueFor(key) {
    try {
      let result = await SecureStore.getItemAsync(key);
      if (result) return JSON.parse(result);
      console.log("No values stored under that key.");
    } catch (err) {
      // TODO: Add error handling.
      console.log(err);
    }
  }

  async function deleteItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      // TODO: Add error handling.
      console.log(err);
    }
  }

  const secureStore = {
    save,
    getValueFor,
    deleteItem,
  };

  return secureStore;
}

export default useSecureStore;
