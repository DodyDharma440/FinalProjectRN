import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { CardImage } from "components/common";
import { useNavigation } from "@react-navigation/native";
import FaIcon from "react-native-vector-icons/FontAwesome";

const MealCardMedium = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CardImage
        iconButton={<FaIcon name="bookmark-o" size={20} color="#000" />}
        buttonAction={() => {}}
        onPress={() => {}}
        image={{ uri: strMealThumb }}
        label={strMeal}
      />
    </View>
  );
};

MealCardMedium.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MealCardMedium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 8,
  },
});
