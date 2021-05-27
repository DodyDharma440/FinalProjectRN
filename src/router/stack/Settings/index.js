import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SettingsScreen,
  AboutScreen,
  AccountScreen,
  EditProfileScreen,
} from "screen/settings";
import { TextBold } from "components/common";

const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: () => (
            <TextBold style={{ fontSize: 20 }}>Your Account</TextBold>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: () => (
            <TextBold style={{ fontSize: 20 }}>Edit Profile</TextBold>
          ),
        }}
      />
      <Stack.Screen
        name="About Us"
        component={AboutScreen}
        options={{
          headerTitle: () => (
            <TextBold style={{ fontSize: 20 }}>About Us</TextBold>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Settings;
