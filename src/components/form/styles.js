import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchbox: {},
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  commonTextInput: {
    height: 50,
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    height: "100%",
    paddingLeft: 10,
    position: "absolute",
    top: 0,
  },
});
