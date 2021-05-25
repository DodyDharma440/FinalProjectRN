import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextRegular } from "components/common";
import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";

const Button = ({
  variant,
  color,
  title,
  withSpacer,
  colorScheme,
  ...props
}) => {
  const { colors } = useTheme();

  const generateColor = () => {
    switch (color) {
      case "primary":
        return colors.primary;

      case "secondary":
        return colors.secondary;

      default:
        return "#fff";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.variant(generateColor, variant),
        styles.spacer(withSpacer),
      ]}
      {...props}
    >
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
  variant: (color, variant) => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: color(),
        };
      case "outlined":
        return {
          borderWidth: 1,
          borderColor: color(),
        };

      default:
        break;
    }
  },
});
