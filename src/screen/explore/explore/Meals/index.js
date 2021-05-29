import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import {
  Container,
  CardMediumSkeleton,
  GridListContainer,
} from "components/layout";
import { MealCardMedium, CategoryCard } from "components/products";
import { getFirstChild, getLastChild } from "utils/getComponentChild";
import * as api from "api";
import { useRefreshControl } from "hooks";

const Meals = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [switchedMeals, setSwitchedMeals] = useState([]);
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    setLoading(true);
    getCategories();
    getMealsByCategory(currentCategory);

    if (!loading) {
      setRefresh(false);
    }
  });

  const [currentCategory, setCurrentCategory] = useState("Beef");

  const getMealsByCategory = async (category) => {
    try {
      const { data } = await api.getMealsByCategory(category);
      setSwitchedMeals(data.meals);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await api.getCategoryList();
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleSwitchCategory = (category) => {
    setLoading(true);
    setCurrentCategory(category);
    if (category !== currentCategory) {
      getMealsByCategory(category);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCategories();
    getMealsByCategory(currentCategory);
  }, []);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.categoriesContainer]}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.idCategory}
            horizontal
            renderItem={({ item, index }) => (
              <CategoryCard
                item={item}
                isFirstChild={getFirstChild(index, categories.length)}
                isLastChild={getLastChild(index, categories.length)}
                currentCategory={currentCategory}
                onSwitchCategory={handleSwitchCategory}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <GridListContainer>
          {loading ? (
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
              data={switchedMeals}
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
