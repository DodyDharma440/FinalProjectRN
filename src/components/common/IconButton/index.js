import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMergeStyle } from "hooks";
import { generateColor } from "utils";
import PropTypes from "prop-types";

const IconButton = ({
  variant,
  color,
  withSpacer,
  icon,
  style,
  size,
  ...props
}) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, {
    ...styles.container(size),
    ...styles.variant(color, variant),
    ...styles.spacer(withSpacer),
  });

  return (
    <TouchableOpacity style={mergedStyle} {...props}>
      {icon}
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  variant: "filled",
  color: "primary",
  size: "md",
};

IconButton.propTypes = {
  variant: PropTypes.oneOf(["filled", "outlined"]),
  color: PropTypes.oneOf(["primary", "secondary", "white"]),
  title: PropTypes.string,
  size: PropTypes.string.isRequired,
};

export default IconButton;

const styles = StyleSheet.create({
  container: (size) => {
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
        width = 60;
        height = 60;
        break;

      default:
        break;
    }

    return {
      width,
      height,
      borderRadius: width,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  spacer: (withSpacer) => ({
    marginVertical: withSpacer ? 8 : 0,
  }),
  title: {
    fontSize: 18,
  },
  variant: (colorType, variant) => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: generateColor(colorType),
        };
      case "outlined":
        return {
          borderWidth: 1,
          borderColor: generateColor(colorType),
        };

      default:
        break;
    }
  },
});
