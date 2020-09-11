import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import AppText from "./AppText";
import colors from "../config/colors";

const OfflineNotice = (props) => {
  const netInfo = useNetInfo();
  // if (netInfo.type !== "unknown" &&netInfo.isInternetReachable === false) {
  if (netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    // height: 40,
    width: "100%",
    marginTop: StatusBar.currentHeight,
    // position: "absolute",
    zIndex: 1,
  },
  text: {
    color: colors.white,
    paddingVertical: 10,
  },
});
export default OfflineNotice;
