import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const CardMediumSkeleton = () => {
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
      style={styles.container}
    >
      <View style={styles.card(colors)} />
      <View style={[styles.dummy, styles.titleDummy]} />
    </Animatable.View>
  );
};

export default CardMediumSkeleton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 6,
  },
  card: (colors) => ({
    marginBottom: 8,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    height: 170,
  }),
  dummy: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    marginHorizontal: 2,
  },
  titleDummy: {
    height: 15,
  },
});
