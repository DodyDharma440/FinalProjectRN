import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const CardLargeSkeleton = () => {
  const { colors } = useTheme();

  const fadeAnimation = {
    from: {
      opacity: 0.2,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <Animatable.View
      animation={fadeAnimation}
      easing="ease-in-cubic"
      iterationCount="infinite"
      style={styles.container(colors)}
    >
      <View style={[styles.dummy, styles.titleDummy]} />
      <View style={[styles.dummy, styles.subtitleDummy]} />
    </Animatable.View>
  );
};

export default CardLargeSkeleton;

const styles = StyleSheet.create({
  container: (colors) => ({
    width: 225,
    height: 300,
    borderRadius: 18,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: "flex-end",
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
  }),
  dummy: {
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
  },
  titleDummy: {
    height: 18,
    marginBottom: 8,
  },
  subtitleDummy: {
    height: 14,
    width: "40%",
  },
});
