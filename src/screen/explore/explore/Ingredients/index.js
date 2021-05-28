import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getIngredientList } from "my-redux/actions/recipe";
import {
  Container,
  CardMediumSkeleton,
  GridListContainer,
} from "components/layout";
import { TextMedium } from "components/common";
import { IngredientCard } from "components/products";
import { useRefreshControl } from "hooks";

const Ingredients = ({ navigation }) => {
  const ingredientsState = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const [dataPerLoad, setDataPerLoad] = useState(10);
  const [croppedData, setCroppedData] = useState(
    ingredientsState.data.slice(0, dataPerLoad)
  );
  const { refresh, onRefresh } = useRefreshControl((setRefresh) => {
    dispatch(getIngredientList());

    if (!ingredientsState.loading) {
      setRefresh(false);
    }
  });

  const handleLoadMore = () => {
    setDataPerLoad(dataPerLoad + 10);
    setCroppedData(ingredientsState.data.slice(0, dataPerLoad + 10));
  };

  useEffect(() => {
    if (ingredientsState.data.length === 0) {
      dispatch(getIngredientList());
    }
  }, [dispatch]);

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <GridListContainer>
          {ingredientsState.loading ? (
            <FlatList
              scrollEnabled={false}
              data={[1, 2, 3, 4]}
              keyExtractor={(item, index) => `${item}-${index}`}
              numColumns={2}
              renderItem={() => <CardMediumSkeleton />}
              showsVerticalScrollIndicator={false}
            />
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
  loadMoreText: {
    textAlign: "center",
  },
});
