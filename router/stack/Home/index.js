import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.replace("Loading");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Main1</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main1"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
