import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { CardImage } from "components/common";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useBookmarked } from "hooks";
import { addFavIngredient, removeFavIngredient } from "my-redux/actions/recipe";

const IngredientCard = ({ item }) => {
  const { strIngredient, idIngredient, strDescription } = item;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bookmarksState = useSelector((state) => state.ingredients.bookmarks);
  const [{ isBookmarked, bookmarkId }, setBookmarked] = useBookmarked(
    bookmarksState,
    "ingredients",
    idIngredient
  );

  const handleSetBookmark = () => {
    if (!isBookmarked) {
      const body = {
        strIngredient,
        idIngredient,
        strDescription,
      };
      dispatch(
        addFavIngredient(body, (newData) => {
          setBookmarked({
            isBookmarked: true,
            bookmarkId: newData._id,
          });
        })
      );
    } else {
      dispatch(
        removeFavIngredient(bookmarkId, () => {
          setBookmarked({
            isBookmarked: false,
            bookmarkId: "0",
          });
        })
      );
    }
  };

  const imageName = strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

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
          navigation.push("DetailIngredient", {
            itemId: idIngredient,
          })
        }
        image={{ uri: imageUrl }}
        label={strIngredient}
      />
    </View>
  );
};

IngredientCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
});
