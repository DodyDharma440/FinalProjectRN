import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme, useNavigation } from "@react-navigation/native";
import { TextBold, TextMedium, IconButton } from "components/common";
import { addFavMeal, removeFavMeal } from "my-redux/actions/recipe";
import { useSelector, useDispatch } from "react-redux";
import * as api from "api";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useBookmarked } from "hooks";

const MealCardLarge = ({ item, isFirstChild, isLastChild }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const dispatch = useDispatch();
  const bookmarksState = useSelector((state) => state.meals.bookmarks);
  const [{ isBookmarked, bookmarkId }, setBookmarked] = useBookmarked(
    bookmarksState,
    "meals",
    idMeal
  );
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [detailData, setDetailData] = useState({});

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

  useEffect(() => {
    let isMounted = true;

    const getDetailData = async () => {
      try {
        const { data } = await api.getDetailMeal(idMeal);
        isMounted && setDetailData(data.meals[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDetailData();

    return () => (isMounted = false);
  }, []);

  return (
    <View style={styles.container(isFirstChild, isLastChild)}>
      <ImageBackground
        style={styles.image}
        source={{ uri: strMealThumb }}
        imageStyle={{ borderRadius: 18 }}
      >
        <LinearGradient
          colors={["transparent", "#0000009e", "#000"]}
          style={styles.overlay}
        >
          <IconButton
            onPress={handleSetBookmark}
            style={styles.button}
            size="md"
            color="default"
            variant="filled"
            icon={
              <FaIcon
                name={isBookmarked ? "bookmark" : "bookmark-o"}
                size={25}
                color={isBookmarked ? colors.primary : "#000"}
              />
            }
          />
          <View style={styles.titleWrapper}>
            <TouchableOpacity>
              <TextBold numberOfLines={2} style={styles.title}>
                {strMeal}
              </TextBold>
            </TouchableOpacity>
            <TextMedium style={styles.subtitle(colors)}>
              {detailData?.strArea}
            </TextMedium>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

MealCardLarge.propTypes = {
  item: PropTypes.object.isRequired,
  isFirstChild: PropTypes.bool,
  isLastChild: PropTypes.bool,
};

export default MealCardLarge;

const styles = StyleSheet.create({
  container: (first, last) => ({
    marginLeft: first ? 16 : 4,
    marginRight: last ? 16 : 4,
  }),
  image: {
    resizeMode: "cover",
    width: 225,
    height: 300,
  },
  overlay: {
    flex: 1,
    width: "100%",
    borderRadius: 18,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: (colors) => ({
    color: colors.primary,
  }),
  button: {
    alignSelf: "flex-end",
  },
});
