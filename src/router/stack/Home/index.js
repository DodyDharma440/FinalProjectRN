import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "screen/home";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
