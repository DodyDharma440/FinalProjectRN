import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { TextMedium, TextRegular } from "components/common";
import { useTheme } from "@react-navigation/native";

const IngredientCard = ({ item, onPress, isLastChild, isFirstChild }) => {
  const { colors } = useTheme();
  const imageName = item?.ingredient?.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  if (item.ingredient !== null || item.measure !== null) {
    return (
      <>
        {item.ingredient !== "" && item.measure !== " " && (
          <View style={styles.container(isFirstChild, isLastChild)}>
            <TouchableOpacity onPress={onPress} style={styles.card(colors)}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 4 }}>
              <TextMedium style={styles.title}>{item.ingredient}</TextMedium>
              <TextRegular>{item.measure}</TextRegular>
            </View>
          </View>
        )}
      </>
    );
  }

  return <></>;
};

IngredientCard.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object.isRequired,
  isFirstChild: PropTypes.bool.isRequired,
  isLastChild: PropTypes.bool.isRequired,
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: (first, last) => ({
    marginRight: last ? 16 : 4,
    marginLeft: first ? 16 : 4,
  }),
  card: (colors) => ({
    backgroundColor: colors.secondary,
    elevation: 4,
    borderRadius: 10,
    marginBottom: 4,
    width: 130,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  }),
  image: {
    resizeMode: "contain",
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 16,
  },
});
