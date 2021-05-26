import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { TextBold } from "components/common";
import { useTheme } from "@react-navigation/native";

const Avatar = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container(colors)}>
      <TextBold style={styles.label}>{children}</TextBold>
    </View>
  );
};

Avatar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Avatar;

const styles = StyleSheet.create({
  container: (colors) => ({
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }),
  label: {
    color: "white",
    fontSize: 24,
  },
});
