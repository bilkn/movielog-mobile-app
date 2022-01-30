import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  return await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) return JSON.parse(result);
  // TODO: Add error handling.
  console.log("No values stored under that key.");
}

const secureStore = {
  save,
  getValueFor,
};

export default secureStore;
