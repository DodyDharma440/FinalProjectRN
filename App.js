import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar, LogBox } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import * as firebase from "firebase";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "my-redux/reducers";
import AppLoading from "expo-app-loading";
import Router from "router";

const App = () => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  const firebaseConfig = {
    apiKey: "AIzaSyCTIQV5wE3uNSkr3ftYCHQRNv_E6TQd33g",
    authDomain: "rnsanbercode-423b7.firebaseapp.com",
    projectId: "rnsanbercode-423b7",
    storageBucket: "rnsanbercode-423b7.appspot.com",
    messagingSenderId: "953066858631",
    appId: "1:953066858631:web:3dce40e1dd8c04464db022",
    measurementId: "G-DWG13GRH7P",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ReduxProvider store={store}>
      <StatusBar barStyle="light-content" />
      <Router />
    </ReduxProvider>
  );
};

export default App;
