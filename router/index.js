import React, { useState, useEffect } from "react";
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
import { LoadingScreen } from "pages/loading";
import * as firebase from "firebase";

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
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user);
      } else {
        setUser({ isNotLogin: true });
      }
    });
  }, [user]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {user?.uid ? (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        ) : user?.isNotLogin ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Loading"
            options={{ headerShown: false }}
            component={LoadingScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
