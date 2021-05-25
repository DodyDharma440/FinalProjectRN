import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Auth = ({ route, navigation }) => {
  const { mode } = route.params;

  return (
    <View>
      <Text>{mode}</Text>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({});
