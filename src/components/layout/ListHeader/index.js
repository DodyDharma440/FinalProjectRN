import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextBold, TextMedium } from "components/common";
import { useTheme } from "@react-navigation/native";

const ListHeader = ({ children, moreNav }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextBold style={styles.title}>{children}</TextBold>
      {moreNav && (
        <TouchableOpacity onPress={moreNav}>
          <TextMedium style={styles.moreNav(colors)}>See More</TextMedium>
        </TouchableOpacity>
      )}
    </View>
  );
};

ListHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  moreNav: PropTypes.func,
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    paddingRight: 12,
    fontSize: 20,
  },
  moreNav: (colors) => ({
    color: colors.primary,
  }),
});
