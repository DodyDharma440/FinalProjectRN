import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Container, GridListContainer } from "components/layout";
import { TextMedium, TextBold } from "components/common";
import { IngredientCard } from "components/products";

const Ingredients = ({ navigation }) => {
  const ingredientsState = useSelector((state) => state.ingredients);
  const { colors } = useTheme();

  return (
    <Container>
      <ScrollView>
        <GridListContainer>
          {ingredientsState.search.searchValue &&
            !ingredientsState.loading &&
            ingredientsState.search.results.length > 0 && (
              <View style={styles.resultTextWrapper}>
                <TextMedium style={styles.resultText}>
                  Search results for:{" "}
                </TextMedium>
                <TextBold style={styles.resultText}>
                  {`${ingredientsState.search.searchValue}`}
                </TextBold>
              </View>
            )}

          {ingredientsState.loading ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={colors.primary}
            />
          ) : (
            <>
              <FlatList
                scrollEnabled={false}
                data={ingredientsState.search.results}
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
  resultTextWrapper: {
    flexDirection: "row",
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
  },
  loading: {
    alignSelf: "center",
  },
});
