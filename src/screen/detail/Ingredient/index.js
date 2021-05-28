import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const Ingredient = ({ route, navigation }) => {
  return (
    <View>
      <Text>Detail Ingredient</Text>
    </View>
  );
};

Ingredient.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Ingredient;

const styles = StyleSheet.create({});
