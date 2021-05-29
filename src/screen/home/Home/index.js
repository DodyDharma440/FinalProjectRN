import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  getIngredientList,
  getFavMeals,
  getFavIngredients,
} from "my-redux/actions/recipe";
import { getUserData } from "my-redux/actions/auth";
import { Alert } from "components/common";
import {
  Container,
  MainHeader,
  ListHeader,
  CardMediumSkeleton,
  CardLargeSkeleton,
  GridListContainer,
} from "components/layout";
import {
  Search,
  MealCardLarge,
  MealCardMedium,
  IngredientCard,
} from "components/products";
import { getFirstChild, getLastChild } from "utils/getComponentChild";
import { useRefreshControl } from "hooks";
import * as api from "api";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [randomMeals, setRandomMeals] = useState([]);
  const ingredientsState = useSelector((state) => state.ingredients);
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    getRandomMeals();
    dispatch(getUserData());
    dispatch(getIngredientList());
    dispatch(getFavMeals());
    dispatch(getFavIngredients());

    if (!loading && !ingredientsState.loading) {
      setRefresh(false);
    }
  });

  const getRandomMeals = async () => {
    setLoading(true);
    const category = [
      "Beef",
      "Chicken",
      "Dessert",
      "Lamb",
      "Miscellaneous",
      "Pasta",
      "Pork",
      "Seafood",
      "Side",
      "Vegetarian",
      "Breakfast",
    ];
    const randomIndex = Math.floor(Math.random() * category.length);

    try {
      const { data } = await api.getMealsByCategory(category[randomIndex]);
      setRandomMeals(data.meals);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getRandomMeals();
      dispatch(getUserData());
      dispatch(getIngredientList());
      dispatch(getFavMeals());
      dispatch(getFavIngredients());
    }

    return () => (isMounted = false);
  }, [dispatch]);

  const MealsSection = () => (
    <>
      <View style={[styles.horizontalSpacer, styles.listTitleWrapper]}>
        <ListHeader
          moreNav={() =>
            navigation.navigate("Explore", {
              screen: "ExploreTab",
              params: {
                screen: "Meals",
              },
            })
          }
        >
          Recommendation Recipes
        </ListHeader>
      </View>
      <View>
        {randomMeals.length > 0 ? (
          <>
            <FlatList
              data={randomMeals.slice(0, 5)}
              keyExtractor={(item) => item.idMeal}
              horizontal
              renderItem={({ item, index }) => (
                <MealCardLarge
                  item={item}
                  isFirstChild={getFirstChild(index, 5)}
                  isLastChild={getLastChild(index, 5)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
            <GridListContainer>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={randomMeals.slice(6, 12)}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => <MealCardMedium item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </GridListContainer>
          </>
        ) : errorMessage ? (
          <Alert style={styles.horizontalSpacer} variant="danger">
            {errorMessage}
          </Alert>
        ) : (
          <>
            <View style={{ marginLeft: 12 }}>
              <FlatList
                scrollEnabled={false}
                data={[1, 2, 3, 4]}
                keyExtractor={(item, index) => `${item}-${index}`}
                horizontal
                renderItem={() => <CardLargeSkeleton />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <GridListContainer>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={[1, 2, 3, 4]}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={() => <CardMediumSkeleton />}
                showsVerticalScrollIndicator={false}
              />
            </GridListContainer>
          </>
        )}
      </View>
    </>
  );

  const IngredientsSection = () => (
    <>
      <View style={styles.horizontalSpacer}>
        <ListHeader
          moreNav={() =>
            navigation.navigate("Explore", {
              screen: "ExploreTab",
              params: {
                screen: "Ingredients",
              },
            })
          }
        >
          Popular Ingredients
        </ListHeader>
      </View>
      <View>
        {ingredientsState.loading ? (
          <GridListContainer>
            <FlatList
              scrollEnabled={false}
              numColumns={2}
              data={[1, 2, 3, 4]}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={() => <CardMediumSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          </GridListContainer>
        ) : ingredientsState.errorMessage ? (
          <Alert style={styles.horizontalSpacer} variant="danger">
            {ingredientsState.errorMessage}
          </Alert>
        ) : (
          <>
            <GridListContainer>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={ingredientsState.data.slice(0, 6)}
                keyExtractor={(item) => `${item.idMeal}-${item.strIngredient}`}
                renderItem={({ item }) => <IngredientCard item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </GridListContainer>
          </>
        )}
      </View>
    </>
  );

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.horizontalSpacer, styles.headerWrapper]}>
          <MainHeader />
        </View>
        <View style={[styles.horizontalSpacer, styles.searchWrapper]}>
          <Search
            onPress={() => {
              navigation.navigate("Explore", {
                screen: "Search",
                initial: false,
              });
            }}
            editable={false}
          />
        </View>
        <MealsSection />
        <IngredientsSection />
      </ScrollView>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;

const styles = StyleSheet.create({
  horizontalSpacer: {
    marginHorizontal: 16,
  },
  headerWrapper: {
    marginVertical: 24,
  },
  searchWrapper: {
    marginBottom: 24,
  },
  listTitleWrapper: {
    marginBottom: 8,
  },
});
