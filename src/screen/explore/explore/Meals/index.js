import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Container } from "components/layout";
import { MealCardMedium, CategoryCard } from "components/products";
import { getCategoryList, getMealsByCategory } from "my-redux/actions/recipe";
import { getFirstChild, getLastChild } from "utils/getComponentChild";

const Meals = ({ navigation }) => {
  const dispatch = useDispatch();
  const mealsState = useSelector((state) => state.meals);
  const categoriesState = useSelector((state) => state.categories);

  const [currentCategory, setCurrentCategory] = useState("Beef");

  const handleSwitchCategory = (category) => {
    setCurrentCategory(category);
    if (category !== currentCategory) {
      dispatch(getMealsByCategory(category));
    }
  };

  useEffect(() => {
    dispatch(getMealsByCategory(currentCategory));
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container>
      <ScrollView>
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
        <View style={[styles.tileListWrapper, styles.horizontalSpacer]}>
          {mealsState.loading ? (
            <Text>Loading...</Text>
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
        </View>
      </ScrollView>
    </Container>
  );
};

Meals.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Meals;

const styles = StyleSheet.create({
  horizontalSpacer: {
    marginHorizontal: 10,
  },
  categoriesContainer: {
    paddingTop: 16,
    height: 100,
  },
  tileListWrapper: {
    marginVertical: 16,
    flex: 1,
  },
});
