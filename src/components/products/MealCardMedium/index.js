import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { CardImage } from "components/common";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addFavMeal, removeFavMeal } from "my-redux/actions/recipe";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useBookmarked } from "hooks";

const MealCardMedium = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookmarksState = useSelector((state) => state.meals.bookmarks);
  const [{ isBookmarked, bookmarkId }, setBookmarked] = useBookmarked(
    bookmarksState,
    "meals",
    idMeal
  );

  const handleSetBookmark = () => {
    if (!isBookmarked) {
      const body = {
        idMeal,
        strMeal,
        strMealThumb,
      };
      dispatch(
        addFavMeal(body, (newData) => {
          setBookmarked({
            isBookmarked: true,
            bookmarkId: newData._id,
          });
        })
      );
    } else {
      dispatch(
        removeFavMeal(bookmarkId, () => {
          setBookmarked({
            isBookmarked: false,
            bookmarkId: "0",
          });
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <CardImage
        iconButton={
          <FaIcon
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={20}
            color={isBookmarked ? colors.primary : "#000"}
          />
        }
        buttonAction={handleSetBookmark}
        onPress={() =>
          navigation.push("DetailMeal", {
            itemId: idMeal,
          })
        }
        image={{ uri: strMealThumb }}
        label={strMeal}
      />
    </View>
  );
};

MealCardMedium.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MealCardMedium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
});
