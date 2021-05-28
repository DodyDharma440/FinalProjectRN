import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions, Platform, FlatList } from "react-native";
import PropTypes from "prop-types";
import * as api from "api";
import { TextRegular, TextBold } from "components/common";
import { Header, IngredientCard } from "components/product-detail";
import { useTheme } from "@react-navigation/native";
import { Container } from "components/layout";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { getFirstChild, getLastChild } from "utils/getComponentChild";
import * as Animatable from "react-native-animatable";
import { useBookmarked } from "hooks";
import { addFavMeal, removeFavMeal } from "my-redux/actions/recipe";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const Meal = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const titleView = useRef(null);
  const bookmarksState = useSelector((state) => state.meals.bookmarks);
  const [detailData, setDetailData] = useState({});
  const [{ isBookmarked, bookmarkId }, setBookmarked] = useBookmarked(
    bookmarksState,
    "meals",
    itemId
  );

  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
  } = detailData;
  const ingredientMeasure = [
    {
      ingredient: detailData?.strIngredient1,
      measure: detailData?.strMeasure1,
    },
    {
      ingredient: detailData?.strIngredient2,
      measure: detailData?.strMeasure2,
    },
    {
      ingredient: detailData?.strIngredient3,
      measure: detailData?.strMeasure3,
    },
    {
      ingredient: detailData?.strIngredient4,
      measure: detailData?.strMeasure4,
    },
    {
      ingredient: detailData?.strIngredient5,
      measure: detailData?.strMeasure5,
    },
    {
      ingredient: detailData?.strIngredient6,
      measure: detailData?.strMeasure6,
    },
    {
      ingredient: detailData?.strIngredient7,
      measure: detailData?.strMeasure7,
    },
    {
      ingredient: detailData?.strIngredient8,
      measure: detailData?.strMeasure8,
    },
    {
      ingredient: detailData?.strIngredient9,
      measure: detailData?.strMeasure9,
    },
    {
      ingredient: detailData?.strIngredient10,
      measure: detailData?.strMeasure10,
    },
    {
      ingredient: detailData?.strIngredient11,
      measure: detailData?.strMeasure11,
    },
    {
      ingredient: detailData?.strIngredient12,
      measure: detailData?.strMeasure12,
    },
    {
      ingredient: detailData?.strIngredient13,
      measure: detailData?.strMeasure13,
    },
    {
      ingredient: detailData?.strIngredient14,
      measure: detailData?.strMeasure14,
    },
    {
      ingredient: detailData?.strIngredient15,
      measure: detailData?.strMeasure15,
    },
    {
      ingredient: detailData?.strIngredient16,
      measure: detailData?.strMeasure16,
    },
    {
      ingredient: detailData?.strIngredient17,
      measure: detailData?.strMeasure17,
    },
    {
      ingredient: detailData?.strIngredient18,
      measure: detailData?.strMeasure18,
    },
    {
      ingredient: detailData?.strIngredient19,
      measure: detailData?.strMeasure19,
    },
    {
      ingredient: detailData?.strIngredient20,
      measure: detailData?.strMeasure20,
    },
  ];

  const ingredientMeasureLength = ingredientMeasure.filter((item) => {
    return (
      item.ingredient &&
      item.ingredient !== "" &&
      item.measure &&
      item.measure !== " "
    );
  }).length;

  const tags = strTags && strTags.split(",");

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
        const { data } = await api.getDetailMeal(itemId);
        isMounted && setDetailData(data.meals[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDetailData();

    return () => (isMounted = false);
  }, []);

  const Tag = ({ item }) => {
    return (
      <View style={styles.tag(colors)}>
        <TextRegular style={styles.tagLabel}>{item}</TextRegular>
      </View>
    );
  };

  return (
    <Container>
      <HeaderImageScrollView
        bounces={true}
        minHeight={MIN_HEIGHT}
        maxHeight={MAX_HEIGHT}
        maxOverlayOpacity={0.8}
        minOverlayOpacity={0.2}
        headerImage={{ uri: strMealThumb }}
        renderFixedForeground={() => (
          <Animatable.View style={styles.headerTitleWrapper} ref={titleView}>
            <TextBold numberOfLines={1} style={styles.headerTitle}>
              {strMeal}
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
            category={strCategory}
            title={strMeal}
            area={strArea}
            iconButtonAction={handleSetBookmark}
            isBookmarked={isBookmarked}
          />
        </TriggeringView>

        <View style={styles.itemContainer}>
          <TextBold style={[styles.itemTitle(colors), styles.item]}>
            Ingredients
          </TextBold>
          <FlatList
            data={ingredientMeasure}
            keyExtractor={(item, index) => `${index}`}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <IngredientCard
                item={item}
                isFirstChild={getFirstChild(index, ingredientMeasureLength)}
                isLastChild={getLastChild(index, ingredientMeasureLength)}
              />
            )}
          />
        </View>

        <View style={styles.itemContainer}>
          <TextBold style={[styles.itemTitle(colors), styles.item]}>
            Intructions
          </TextBold>
          <TextRegular style={[styles.instructions, styles.item]}>
            {strInstructions}
          </TextRegular>
          {tags && (
            <View style={styles.item}>
              <TextBold style={styles.tagsTitle}>Tags</TextBold>
              <View style={styles.tags}>
                {tags.map((tag, index) => (
                  <Tag key={index} item={tag} />
                ))}
              </View>
            </View>
          )}
        </View>
      </HeaderImageScrollView>
    </Container>
  );
};

Meal.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Meal;

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
  instructions: {
    fontSize: 16,
    marginBottom: 8,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagsTitle: {
    marginBottom: 4,
  },
  tag: (colors) => ({
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
  }),
  tagLabel: {
    color: "white",
  },
});
