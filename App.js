import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import * as firebase from "firebase";
import AppLoading from "expo-app-loading";
import Router from "router";

const App = () => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const firebaseConfig = {
    apiKey: "AIzaSyCTIQV5wE3uNSkr3ftYCHQRNv_E6TQd33g",
    authDomain: "rnsanbercode-423b7.firebaseapp.com",
    projectId: "rnsanbercode-423b7",
    storageBucket: "rnsanbercode-423b7.appspot.com",
    messagingSenderId: "953066858631",
    appId: "1:953066858631:web:3dce40e1dd8c04464db022",
    measurementId: "G-DWG13GRH7P",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Router />
    </>
  );
};

export default App;
