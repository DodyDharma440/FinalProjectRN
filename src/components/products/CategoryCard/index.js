import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TextRegular } from "components/common";

const CategoryCard = ({
  item,
  isFirstChild,
  isLastChild,
  currentCategory,
  onSwitchCategory,
}) => {
  const { strCategory, strCategoryThumb } = item;
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onSwitchCategory(item.strCategory)}
      style={[
        styles.container(isFirstChild, isLastChild),
        {
          backgroundColor:
            currentCategory === strCategory ? colors.primary : "white",
        },
      ]}
    >
      <Image
        style={styles.image}
        imageStyle={{ borderRadius: 25 }}
        source={{ uri: strCategoryThumb }}
      />
      <TextRegular
        style={{ color: currentCategory === strCategory ? "white" : "black" }}
      >
        {strCategory}
      </TextRegular>
    </TouchableOpacity>
  );
};

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired,
  isFirstChild: PropTypes.bool,
  isLastChild: PropTypes.bool,
  currentCategory: PropTypes.string.isRequired,
  onSwitchCategory: PropTypes.func.isRequired,
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: (first, last) => ({
    width: 110,
    padding: 8,
    marginLeft: first ? 16 : 4,
    marginRight: last ? 16 : 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 4,
    marginVertical: 4,
  }),
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
  },
});
