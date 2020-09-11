import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import colors from "../config/colors";

const Screen = ({ children, style }) => (
  <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

export default Screen;
