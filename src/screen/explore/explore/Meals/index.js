import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  Container,
  CardMediumSkeleton,
  GridListContainer,
} from "components/layout";
import { MealCardMedium, CategoryCard } from "components/products";
import { getCategoryList, getMealsByCategory } from "my-redux/actions/recipe";
import { getFirstChild, getLastChild } from "utils/getComponentChild";
import { useRefreshControl } from "hooks";

const Meals = ({ navigation }) => {
  const dispatch = useDispatch();
  const mealsState = useSelector((state) => state.meals);
  const categoriesState = useSelector((state) => state.categories);
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    dispatch(getCategoryList());
    dispatch(getMealsByCategory(currentCategory));

    if (!categoriesState.loading && !mealsState.loading) {
      setRefresh(false);
    }
  });

  const [currentCategory, setCurrentCategory] = useState("Beef");

  const handleSwitchCategory = (category) => {
    setCurrentCategory(category);
    if (category !== currentCategory) {
      dispatch(getMealsByCategory(category));
    }
  };

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getMealsByCategory(currentCategory));
  }, [dispatch]);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.categoriesContainer]}>
          <FlatList
            data={categoriesState.data}
            keyExtractor={(item) => item.idCategory}
            horizontal
            renderItem={({ item, index }) => (
              <CategoryCard
                item={item}
                isFirstChild={getFirstChild(index, categoriesState.data.length)}
                isLastChild={getLastChild(index, categoriesState.data.length)}
                currentCategory={currentCategory}
                onSwitchCategory={handleSwitchCategory}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <GridListContainer>
          {mealsState.loading ? (
            <FlatList
              scrollEnabled={false}
              data={[1, 2, 3, 4]}
              keyExtractor={(item, index) => `${item}-${index}`}
              numColumns={2}
              renderItem={() => <CardMediumSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              scrollEnabled={false}
              data={mealsState.switchedMeals}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              renderItem={({ item }) => <MealCardMedium item={item} />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </GridListContainer>
      </ScrollView>
    </Container>
  );
};

Meals.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Meals;

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingTop: 16,
    height: 100,
  },
});
