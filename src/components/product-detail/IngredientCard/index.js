import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { TextMedium, TextRegular } from "components/common";
import { useTheme, useNavigation } from "@react-navigation/native";

const IngredientCard = ({ item, isLastChild, isFirstChild }) => {
  const { ingredient, measure } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const ingredientsState = useSelector((state) => state.ingredients);
  const [ingredientId, setIngredientId] = useState("");
  const imageName = item?.ingredient?.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  useEffect(() => {
    const lowerCaseIngredient =
      ingredient && ingredient.length > 0
        ? ingredient.toLowerCase()
        : ingredient;

    if (ingredient) {
      ingredientsState.data.filter((ingredient) => {
        if (lowerCaseIngredient === ingredient.strIngredient.toLowerCase()) {
          return setIngredientId(ingredient.idIngredient);
        }
      });
    }
  }, [ingredient]);

  if (ingredient !== null || measure !== null) {
    return (
      <>
        {ingredient !== "" && measure !== " " && (
          <View style={styles.container(isFirstChild, isLastChild)}>
            <TouchableOpacity
              onPress={() =>
                navigation.push("DetailIngredient", {
                  itemId: ingredientId,
                })
              }
              style={styles.card(colors)}
            >
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 4 }}>
              <TextMedium style={styles.title}>{ingredient}</TextMedium>
              <TextRegular>{measure}</TextRegular>
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
