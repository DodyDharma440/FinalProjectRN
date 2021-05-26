import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Container } from "components/layout";
import { TextMedium } from "components/common";
import { IngredientCard } from "components/products";

const Ingredients = ({ navigation }) => {
  const ingredientsState = useSelector((state) => state.ingredients);
  const [dataPerLoad, setDataPerLoad] = useState(10);
  const [croppedData, setCroppedData] = useState(
    ingredientsState.data.slice(0, dataPerLoad)
  );

  const handleLoadMore = () => {
    setDataPerLoad(dataPerLoad + 10);
    setCroppedData(ingredientsState.data.slice(0, dataPerLoad + 10));
  };

  return (
    <Container>
      <ScrollView>
        <View style={[styles.tileListWrapper, styles.horizontalSpacer]}>
          {ingredientsState.loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <FlatList
                scrollEnabled={false}
                data={croppedData}
                keyExtractor={(item) => item.idIngredient}
                numColumns={2}
                renderItem={({ item }) => <IngredientCard item={item} />}
                showsVerticalScrollIndicator={false}
              />
              <TouchableOpacity onPress={handleLoadMore}>
                <TextMedium style={styles.loadMoreText}>Load More</TextMedium>
              </TouchableOpacity>
            </>
          )}
        </View>
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
  loadMoreText: {
    textAlign: "center",
  },
});
