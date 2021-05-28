import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TextMedium } from "components/common";
import { Container, GridListContainer } from "components/layout";
import { MealCardMedium } from "components/products";
import { useTheme } from "@react-navigation/native";
import { getFavMeals } from "my-redux/actions/recipe";
import { useRefreshControl } from "hooks";

const Meals = ({ navigation }) => {
  const dispatch = useDispatch();
  const mealsState = useSelector((state) => state.meals);
  const bookmarksState = mealsState.bookmarks;
  const { colors } = useTheme();
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    dispatch(getFavMeals());

    if (!mealsState.loading) {
      setRefresh(false);
    }
  });

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <GridListContainer>
          {mealsState.loading ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={colors.primary}
            />
          ) : bookmarksState.length === 0 ? (
            <TextMedium style={styles.placeholder}>
              You don't have bookmarks
            </TextMedium>
          ) : (
            <>
              <FlatList
                scrollEnabled={false}
                data={bookmarksState}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                renderItem={({ item }) => <MealCardMedium item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </>
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
  loading: {
    alignSelf: "center",
  },
  placeholder: {
    textAlign: "center",
  },
});
