import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  MealsBookmarksScreen,
  IngredientsBookmarksScreen,
} from "screen/bookmarks";
import { TextBold } from "components/common";
import { DetailIngredientScreen, DetailMealScreen } from "screen/detail";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const BookmarksTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: "DMSans_700Bold",
        },
      }}
      initialRouteName="Meals"
    >
      <Tab.Screen component={MealsBookmarksScreen} name="Meals" />
      <Tab.Screen component={IngredientsBookmarksScreen} name="Ingredients" />
    </Tab.Navigator>
  );
};

const Boookmarks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksTab}
        options={{
          headerTitle: () => (
            <TextBold style={{ fontSize: 20, textAlign: "center" }}>
              Your Bookmarks
            </TextBold>
          ),
          headerStyle: {
            elevation: 0,
          },
        }}
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

export default Boookmarks;
