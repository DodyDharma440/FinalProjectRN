import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <View>
      <Text>Main</Text>
    </View>
  );
};

const Boookmark = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Boookmark;
