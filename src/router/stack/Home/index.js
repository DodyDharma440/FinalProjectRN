import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "screen/home";
import { DetailIngredientScreen, DetailMealScreen } from "screen/detail";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailMeal"
        component={DetailMealScreen}
        options={{
          headerTitle: false,
          headerTintColor: "white",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;
