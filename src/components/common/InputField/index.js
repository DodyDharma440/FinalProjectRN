import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "@react-navigation/native";
import { useMergeStyle } from "hooks";

const InputField = ({ leftIcon, rightIcon, style, ...props }) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, styles.container(colors));

  return (
    <View style={mergedStyle}>
      {leftIcon && (
        <View style={[styles.iconWrapper, styles.leftIcon]}>{leftIcon}</View>
      )}
      <TextInput style={styles.input} {...props} />
      {rightIcon && (
        <View style={[styles.iconWrapper, styles.rightIcon]}>{rightIcon}</View>
      )}
    </View>
  );
};

InputField.propTypes = {
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default InputField;

const styles = StyleSheet.create({
  container: (colors) => ({
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
  }),
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
  },
});
