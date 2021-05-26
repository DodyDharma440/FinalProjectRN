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
          navigation.replace("MainApp");
        }

        if (err) {
          navigation.replace("Auth");
        }
      })
    );
  }, []);

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
