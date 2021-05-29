import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import Container from "../Container";
import { TextBold } from "components/common";

const AppLoading = () => {
  return (
    <Container style={styles.container}>
      <ActivityIndicator size={50} color="#289672" />
      <TextBold style={styles.text}>Please Wait...</TextBold>
    </Container>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginVertical: 16,
    fontSize: 18,
  },
});
