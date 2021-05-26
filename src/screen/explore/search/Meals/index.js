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
import { Container } from "components/layout";
import { Alert } from "components/common";
import { MealCardMedium } from "components/products";
import { useTheme } from "@react-navigation/native";
import { TextMedium, TextBold } from "components/common";

const Meals = ({ navigation }) => {
  const mealsState = useSelector((state) => state.meals);
  const { colors } = useTheme();

  return (
    <Container>
      <ScrollView>
        <View style={[styles.tileListWrapper, styles.horizontalSpacer]}>
          {mealsState.search.searchValue && !mealsState.loading && (
            <View style={styles.resultTextWrapper}>
              <TextMedium style={styles.resultText}>
                Search results for:{" "}
              </TextMedium>
              <TextBold style={styles.resultText}>
                {`${mealsState.search.searchValue}`}
              </TextBold>
            </View>
          )}
          {mealsState.loading ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={colors.primary}
            />
          ) : mealsState.errorMessage ? (
            <Alert variant="danger">{mealsState.errorMessage}</Alert>
          ) : (
            <>
              <FlatList
                scrollEnabled={false}
                data={mealsState.search.results}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                renderItem={({ item }) => <MealCardMedium item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </>
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
