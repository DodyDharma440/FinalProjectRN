import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WellcomeScreen, AuthScreen } from "screen/auth";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Wellcome">
      <Stack.Screen
        name="Wellcome"
        component={WellcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
