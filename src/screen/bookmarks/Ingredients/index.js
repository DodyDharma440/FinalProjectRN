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
import { IngredientCard } from "components/products";
import { useTheme } from "@react-navigation/native";
import { getFavIngredients } from "my-redux/actions/recipe";
import { useRefreshControl } from "hooks";

const Ingredients = ({ navigation }) => {
  const dispatch = useDispatch();
  const ingredientsState = useSelector((state) => state.ingredients);
  const bookmarksState = ingredientsState.bookmarks;
  const { colors } = useTheme();
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    dispatch(getFavIngredients());

    if (!ingredientsState.loading) {
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
          {ingredientsState.loading ? (
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
                keyExtractor={(item) => item.idIngredient}
                numColumns={2}
                renderItem={({ item }) => <IngredientCard item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </GridListContainer>
      </ScrollView>
    </Container>
  );
};

Ingredients.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Ingredients;

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
  },
  placeholder: {
    textAlign: "center",
  },
});
