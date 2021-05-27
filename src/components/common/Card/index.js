import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { useMergeStyle } from "hooks";

const Card = ({ children, withSpacer, style, ...props }) => {
  const mergedStyle = useMergeStyle(style, styles.container(withSpacer));

  return (
    <View style={mergedStyle} {...props}>
      {children}
    </View>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;

const styles = StyleSheet.create({
  container: (withSpacer) => ({
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    marginVertical: withSpacer ? 16 : 0,
  }),
});
