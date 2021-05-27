import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "components/layout";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserData } from "my-redux/actions/auth";

const Loading = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserData((success, err) => {
        if (success) {
          return setTimeout(() => navigation.replace("MainApp"), 1000);
        }

        if (err) {
          return setTimeout(() => navigation.replace("Auth"), 1000);
        }
      })
    );
  }, [dispatch]);

  const { colors } = useTheme();

  return (
    <Container style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  );
};

Loading.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
