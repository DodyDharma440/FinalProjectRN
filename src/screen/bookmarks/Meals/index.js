import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextMedium } from "components/common";
import { Container, GridListContainer } from "components/layout";
import { MealCardMedium } from "components/products";
import { useTheme } from "@react-navigation/native";

const Meals = ({ navigation }) => {
  const mealsState = useSelector((state) => state.meals);
  const bookmarksState = mealsState.bookmarks;
  const { colors } = useTheme();

  return (
    <Container>
      <ScrollView>
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
