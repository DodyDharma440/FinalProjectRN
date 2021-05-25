import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextRegular } from "components/common";
import { useTheme } from "@react-navigation/native";
import { useMergeStyle } from "hooks";
import { generateColor } from "utils";
import PropTypes from "prop-types";

const Button = ({
  variant,
  color,
  title,
  withSpacer,
  colorScheme,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, {
    ...styles.container,
    ...styles.variant(color, variant),
    ...styles.spacer(withSpacer),
  });

  return (
    <TouchableOpacity style={mergedStyle} {...props}>
      <TextRegular style={[styles.title, styles.colorScheme(colorScheme)]}>
        {title}
      </TextRegular>
    </TouchableOpacity>
  );
};

export default Button;

Button.defaultProps = {
  variant: "filled",
  color: "primary",
  title: "Button",
  colorScheme: "light",
};

Button.propTypes = {
  variant: PropTypes.oneOf(["filled", "outlined"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: (withSpacer) => ({
    marginVertical: withSpacer ? 8 : 0,
  }),
  title: {
    fontSize: 18,
  },
  colorScheme: (theme) => ({
    color: theme === "dark" ? "#fff" : theme === "light" ? "#222" : "#000",
  }),
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
