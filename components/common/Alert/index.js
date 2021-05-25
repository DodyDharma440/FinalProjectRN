import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import { TextMedium } from "components/common";
import { useMergeStyle } from "hooks";
import { generateColor } from "utils";

const Alert = ({ children, variant, style, ...props }) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, styles.container(variant));

  return (
    <View style={mergedStyle}>
      <TextMedium style={styles.text(variant)}>{children}</TextMedium>
    </View>
  );
};

Alert.defaultProps = {
  variant: "success",
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  variant: PropTypes.oneOf(["success", "danger", "warning"]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Alert;

const styles = StyleSheet.create({
  container: (colorType) => ({
    backgroundColor: generateColor(`bg-${colorType}`),
    borderWidth: 1,
    borderColor: generateColor(`text-${colorType}`),
    borderRadius: 10,
    padding: 16,
  }),
  text: (colorType) => ({
    color: generateColor(`text-${colorType}`),
  }),
});
