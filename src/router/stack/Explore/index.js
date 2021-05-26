import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Search } from "components/products";
import { MealsExploreScreen, IngredientsExploreScreen } from "screen/explore";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Contoh1 = () => {
  return (
    <View>
      <Text>Contoh1</Text>
    </View>
  );
};

const Contoh2 = () => {
  return (
    <View>
      <Text>Contoh2</Text>
    </View>
  );
};

const ExploreTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: "DMSans_700Bold",
        },
      }}
      swipeEnabled={false}
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
    >
      <Tab.Screen component={Contoh1} name="Meals" />
      <Tab.Screen component={Contoh2} name="Ingredients" />
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
    </Stack.Navigator>
  );
};

export default Explore;
