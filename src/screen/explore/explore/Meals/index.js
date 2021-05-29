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
  CategorySkeleton,
} from "components/layout";
import { MealCardMedium, CategoryCard } from "components/products";
import { getFirstChild, getLastChild } from "utils/getComponentChild";
import * as api from "api";
import { useRefreshControl } from "hooks";

const Meals = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [switchedMeals, setSwitchedMeals] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Beef");
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    setLoading(true);
    getCategories();
    getMealsByCategory(currentCategory);

    if (!loading) {
      setRefresh(false);
    }
  });

  const getMealsByCategory = async (category) => {
    setLoading(true);
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
    setCategoriesLoading(true);
    try {
      const { data } = await api.getCategoryList();
      setCategories(data.categories);
      setCategoriesLoading(false);
    } catch (error) {
      setCategoriesLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleSwitchCategory = (category) => {
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
        {categoriesLoading ? (
          <View style={[styles.categoriesContainer, { marginLeft: 12 }]}>
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={() => <CategorySkeleton />}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        ) : (
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
        )}
        {loading ? (
          <GridListContainer>
            <FlatList
              scrollEnabled={false}
              data={[1, 2, 3, 4]}
              keyExtractor={(item, index) => `${item}-${index}`}
              numColumns={2}
              renderItem={() => <CardMediumSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          </GridListContainer>
        ) : (
          <GridListContainer>
            <FlatList
              scrollEnabled={false}
              data={switchedMeals}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              renderItem={({ item }) => <MealCardMedium item={item} />}
              showsVerticalScrollIndicator={false}
            />
          </GridListContainer>
        )}
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
