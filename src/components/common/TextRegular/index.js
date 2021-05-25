import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { useMergeStyle } from "hooks";

const TextRegular = ({ children, style, ...props }) => {
  const mergedStyle = useMergeStyle(style, styles.text);

  return (
    <Text style={mergedStyle} {...props}>
      {children}
    </Text>
  );
};

TextRegular.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TextRegular;

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans_400Regular",
  },
});
