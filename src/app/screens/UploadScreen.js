import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";

const UploadScreen = ({ onDone, progress = 0.3, visible = false }) => (
  <Modal visible={visible}>
    <View style={styles.container}>
      {progress < 1 ? (
        <Progress.Bar width={200} color={colors.primary} progress={progress} />
      ) : (
        <LottieView
          autoPlay
          loop={false}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
          onAnimationFinish={onDone}
        />
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  animation: {
    width: 150,
  },
});
export default UploadScreen;
