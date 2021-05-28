import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { CardImage } from "components/common";
import { useNavigation } from "@react-navigation/native";
import FaIcon from "react-native-vector-icons/FontAwesome";

const IngredientCard = ({ item }) => {
  const { strIngredient, idIngredient } = item;
  const navigation = useNavigation();

  const imageName = strIngredient.replace(/\s/g, "%20");
  const imageUrl = `https://www.themealdb.com/images/ingredients/${imageName}.png`;

  return (
    <View style={styles.container}>
      <CardImage
        iconButton={<FaIcon name="bookmark-o" size={20} color="#000" />}
        buttonAction={() => {}}
        onPress={() =>
          navigation.push("DetailIngredient", {
            itemId: idIngredient,
          })
        }
        image={{ uri: imageUrl }}
        label={strIngredient}
      />
    </View>
  );
};

IngredientCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
});
