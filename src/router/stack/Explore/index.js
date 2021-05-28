import React, { useEffect } from "react";
import { useNavigation, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Search } from "components/products";
import {
  MealsExploreScreen,
  IngredientsExploreScreen,
  MealsSearchScreen,
  IngredientsSearchScreen,
} from "screen/explore";
import { DetailIngredientScreen, DetailMealScreen } from "screen/detail";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ExploreTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: "DMSans_700Bold",
        },
      }}
      swipeEnabled={false}
      initialRouteName="Meals"
    >
      <Tab.Screen component={MealsExploreScreen} name="Meals" />
      <Tab.Screen component={IngredientsExploreScreen} name="Ingredients" />
    </Tab.Navigator>
  );
};

const SearchTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: "DMSans_700Bold",
        },
      }}
      initialRouteName="Meals"
    >
      <Tab.Screen component={MealsSearchScreen} name="Meals" />
      <Tab.Screen component={IngredientsSearchScreen} name="Ingredients" />
    </Tab.Navigator>
  );
};

const Explore = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreTab"
        component={ExploreTab}
        options={{
          headerTitle: () => (
            <Search
              onPress={() => navigation.navigate("Search")}
              editable={false}
            />
          ),
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchTab}
        options={{
          headerTitle: () => <Search />,
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

export default Explore;
