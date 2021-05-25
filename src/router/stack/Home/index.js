import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { logout } from "my-redux/actions/auth";

const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  console.log("u => ", userData);

  const handleLogout = async () => {
    dispatch(
      logout((success, err) => {
        if (success) {
          navigation.replace("Auth");
        }

        if (err) {
          console.log(err);
        }
      })
    );
  };

  return (
    <View>
      <Text>Main1</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main1"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
