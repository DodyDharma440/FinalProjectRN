import React from "react";
import { Container } from "components/layout";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <Container style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
