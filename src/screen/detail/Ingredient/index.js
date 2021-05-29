import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import PropTypes from "prop-types";
import * as api from "api";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { Container, GridListContainer } from "components/layout";
import { TextRegular, TextBold } from "components/common";
import { MealCardMedium } from "components/products";
import { Header } from "components/product-detail";
import { useRefreshControl, useBookmarked } from "hooks";
import {
  addFavIngredient,
  removeFavIngredient,
  getFavIngredients,
} from "my-redux/actions/recipe";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const Ingredient = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { colors } = useTheme();
  const titleView = useRef();
  const dispatch = useDispatch();
  const ingredientsState = useSelector((state) => state.ingredients);
  const [detailData, setDetailData] = useState({});
  const { strIngredient, idIngredient, strDescription } = detailData;
  const bookmarksState = useSelector((state) => state.ingredients.bookmarks);
  const [{ isBookmarked, bookmarkId }, setBookmarked] = useBookmarked(
    bookmarksState,
    "ingredients",
    itemId
  );
  const [meals, setMeals] = useState([]);
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    getDetailData();
    dispatch(getFavIngredients());

    setTimeout(() => setRefresh(false), 3000);
  });

  const imageName = strIngredient && strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

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

  const getMeals = async (ingredient) => {
    const ingredientName = ingredient.strIngredient
      .toLowerCase()
      .replace(/\s/g, "%20");

    try {
      const { data } = await api.getMealsByIngredient(ingredientName);
      setMeals(data.meals);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getDetailData = () => {
    ingredientsState.data.filter((ingredient) => {
      if (ingredient.idIngredient === itemId) {
        setDetailData(ingredient);
        getMeals(ingredient);
      }
    });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getDetailData();
    }

    return () => (isMounted = false);
  }, []);

  return (
    <Container>
      <HeaderImageScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        bounces={true}
        minHeight={MIN_HEIGHT}
        maxHeight={MAX_HEIGHT}
        maxOverlayOpacity={0.8}
        minOverlayOpacity={0.2}
        headerImage={{ uri: imageUrl }}
        renderFixedForeground={() => (
          <Animatable.View style={styles.headerTitleWrapper} ref={titleView}>
            <TextBold numberOfLines={1} style={styles.headerTitle}>
              {strIngredient}
            </TextBold>
          </Animatable.View>
        )}
      >
        <TriggeringView
          onHide={() => titleView.current.fadeInUp(200)}
          onDisplay={() => titleView.current.fadeOut(300)}
          style={{ flexDirection: "row", padding: 16 }}
        >
          <Header
            title={strIngredient}
            iconButtonAction={handleSetBookmark}
            isBookmarked={isBookmarked}
          />
        </TriggeringView>

        <View style={styles.itemContainer}>
          <TextBold style={[styles.itemTitle(colors), styles.item]}>
            Description
          </TextBold>
          {!strDescription ? (
            <TextRegular
              style={[styles.description, styles.item, styles.placeholder]}
            >
              No description about this ingredient.
            </TextRegular>
          ) : (
            <TextRegular style={[styles.description, styles.item]}>
              {strDescription}
            </TextRegular>
          )}
        </View>

        <View style={styles.itemContainer}>
          <TextBold style={[styles.itemTitle(colors), styles.item]}>
            Meals with this ingredient
          </TextBold>
          <GridListContainer>
            {meals.length === 0 ? (
              <TextRegular
                style={[styles.description, styles.item, styles.placeholder]}
              >
                No meals with this ingredient.
              </TextRegular>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                renderItem={({ item }) => <MealCardMedium item={item} />}
                showsVerticalScrollIndicator={false}
              />
            )}
          </GridListContainer>
        </View>
      </HeaderImageScrollView>
    </Container>
  );
};

Ingredient.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Ingredient;

const styles = StyleSheet.create({
  headerTitleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: MIN_HEIGHT,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    maxWidth: "60%",
  },
  itemContainer: {
    marginVertical: 16,
  },
  item: {
    marginHorizontal: 16,
  },
  itemTitle: (colors) => ({
    color: colors.primary,
    marginBottom: 8,
    fontSize: 24,
  }),
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  placeholder: {
    textAlign: "center",
    opacity: 0.5,
    marginTop: 24,
  },
});
