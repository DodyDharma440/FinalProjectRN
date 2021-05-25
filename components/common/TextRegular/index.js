import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

const TextRegular = ({ children, style, ...props }) => {
  const [mergedStyle, setMergedStyle] = useState([]);

  useEffect(() => {
    if (typeof style === "object") {
      setMergedStyle([style, styles.text]);
    } else if (Object.prototype.toString.call(style) === "[object Array]") {
      setMergedStyle([...style, styles.text]);
    }

    return () => {
      setMergedStyle([]);
    };
  }, [style]);

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
