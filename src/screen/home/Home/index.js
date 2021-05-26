import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { getRandomMeals, getIngredientList } from "my-redux/actions/recipe";
import { Alert } from "components/common";
import { Container, MainHeader, ListHeader } from "components/layout";
import {
  Search,
  MealCardLarge,
  MealCardMedium,
  IngredientCard,
} from "components/products";
import { getFirstChild, getLastChild } from "utils/getComponentChild";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const mealsState = useSelector((state) => state.meals);
  const ingredientsState = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getRandomMeals());
    dispatch(getIngredientList());
  }, []);

  return (
    <Container>
      <ScrollView>
        <View style={[styles.horizontalSpacer, styles.headerWrapper]}>
          <MainHeader />
        </View>
        <View style={[styles.horizontalSpacer, styles.searchWrapper]}>
          <Search
            onPress={() =>
              navigation.navigate("Explore", {
                screen: "Search",
                initial: false,
              })
            }
            editable={false}
          />
        </View>
        <View style={[styles.horizontalSpacer, styles.listTitleWrapper]}>
          <ListHeader
            moreNav={() =>
              navigation.navigate("ExploreTab", {
                screen: "Meals",
              })
            }
          >
            Recommendation Recipes
          </ListHeader>
        </View>
        <View>
          {mealsState.loading ? (
            <Text>Loading...</Text>
          ) : mealsState.errorMessage ? (
            <Alert style={styles.horizontalSpacer} variant="danger">
              {mealsState.errorMessage}
            </Alert>
          ) : (
            <>
              <FlatList
                data={mealsState.data.slice(0, 5)}
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
              <View style={[styles.tileListWrapper]}>
                <FlatList
                  scrollEnabled={false}
                  numColumns={2}
                  data={mealsState.data.slice(6, 12)}
                  keyExtractor={(item) => item.idMeal}
                  renderItem={({ item }) => <MealCardMedium item={item} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </>
          )}
        </View>

        <View style={styles.horizontalSpacer}>
          <ListHeader
            moreNav={() =>
              navigation.navigate("ExploreTab", {
                screen: "Ingredients",
              })
            }
          >
            Popular Ingredients
          </ListHeader>
        </View>
        <View>
          {mealsState.loading ? (
            <Text>Loading...</Text>
          ) : ingredientsState.errorMessage ? (
            <Alert style={styles.horizontalSpacer} variant="danger">
              {ingredientsState.errorMessage}
            </Alert>
          ) : (
            <>
              <View style={[styles.tileListWrapper]}>
                <FlatList
                  scrollEnabled={false}
                  numColumns={2}
                  data={ingredientsState.data.slice(0, 6)}
                  keyExtractor={(item) =>
                    `${item.idMeal}-${item.strIngredient}`
                  }
                  renderItem={({ item }) => <IngredientCard item={item} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </>
          )}
        </View>
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
  tileListWrapper: {
    marginVertical: 16,
    marginHorizontal: 10,
    flex: 1,
  },
});
