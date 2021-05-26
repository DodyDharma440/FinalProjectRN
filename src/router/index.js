import React, { createRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "theme";
import {
  AuthStack,
  HomeStack,
  ExploreStack,
  BookmarkStack,
  SettingsStack,
} from "router/stack";
import { BottomTab } from "components/layout";
import { LoadingScreen } from "screen/loading";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Bookmark" component={BookmarkStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer ref={createRef()} theme={theme}>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          options={{ headerShown: false }}
          component={LoadingScreen}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
