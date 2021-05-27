import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { TextMedium } from "components/common";
import { useTheme } from "@react-navigation/native";

const ListItem = ({ title, contentText, ...props }) => {
  const { colors } = useTheme();

  return (
    <View {...props} style={styles.listItem(colors)}>
      <TextMedium style={styles.label(colors)}>{title}</TextMedium>
      <TextMedium style={styles.contentText}>{contentText}</TextMedium>
    </View>
  );
};

ListItem.propTypes = {
  title: PropTypes.string,
  contentText: PropTypes.string,
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: (colors) => ({
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  }),
  label: (colors) => ({
    color: colors.primary,
    marginBottom: 4,
  }),
  contentText: {
    fontSize: 20,
  },
});
