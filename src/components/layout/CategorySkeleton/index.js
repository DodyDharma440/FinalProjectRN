import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const CategorySkeleton = () => {
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
    />
  );
};

export default CategorySkeleton;

const styles = StyleSheet.create({
  container: (colors) => ({
    width: 110,
    padding: 8,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: colors.secondary,
  }),
});
