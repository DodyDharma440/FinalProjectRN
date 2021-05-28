import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import TextBold from "../TextBold";
import { useTheme } from "@react-navigation/native";
import { useMergeStyle } from "hooks";
import { generateColor } from "utils/generateColor";

const Avatar = ({ children, size, variant, style }) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, styles.container(size, variant));

  return (
    <View style={mergedStyle}>
      <TextBold style={styles.label}>{children}</TextBold>
    </View>
  );
};

Avatar.defaultProps = {
  variant: "primary",
  size: "md",
};

Avatar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  variant: PropTypes.oneOf(["primary", "secondary", "default"]),
};

export default Avatar;

const styles = StyleSheet.create({
  container: (size, variant) => {
    let width = 0;
    let height = 0;
    switch (size) {
      case "sm":
        width = 40;
        height = 40;
        break;
      case "md":
        width = 50;
        height = 50;
        break;
      case "lg":
        width = 65;
        height = 65;
        break;
      case "xl":
        width = 80;
        height = 80;
        break;

      default:
        break;
    }

    return {
      width,
      height,
      backgroundColor: generateColor(variant),
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  label: {
    color: "white",
    fontSize: 24,
  },
});
