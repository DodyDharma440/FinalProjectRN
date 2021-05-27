import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const GridListContainer = ({ children }) => {
  return (
    <View style={[styles.listWrapper, styles.horizontalSpacer]}>
      {children}
    </View>
  );
};

GridListContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default GridListContainer;

const styles = StyleSheet.create({
  horizontalSpacer: {
    marginHorizontal: 10,
  },
  listWrapper: {
    marginVertical: 16,
    flex: 1,
  },
});
