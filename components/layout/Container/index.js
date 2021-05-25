import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMergeStyle } from "hooks";
import PropTypes from "prop-types";

const Container = ({ children, style, ...props }) => {
  const { colors } = useTheme();
  const mergedStyle = useMergeStyle(style, styles.container(colors));

  return (
    <View style={mergedStyle} {...props}>
      {children}
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Container;

const styles = StyleSheet.create({
  container: (colors) => ({
    flex: 1,
    backgroundColor: colors.bgPrimary,
  }),
});
