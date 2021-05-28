import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import theme from "theme";
import {
  AuthStack,
  HomeStack,
  ExploreStack,
  BookmarksStack,
  SettingsStack,
} from "router/stack";
import { BottomTab } from "components/layout";
import { getUserData } from "my-redux/actions/auth";

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
      <Tab.Screen name="Bookmark" component={BookmarksStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.auth.userData);
  const [userData, setUserData] = useState(userRedux);

  useEffect(() => {
    dispatch(
      getUserData((user, err) => {
        if (user) {
          setUserData(user);
        }

        if (err) {
          setUserData(null);
        }
      })
    );
  }, [dispatch]);

  if (userData && Object.keys(userData).length === 0) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {userData?.uid ? (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
