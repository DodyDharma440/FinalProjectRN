import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { wellcomeBg } from "assets/images";
import { Button, TextMedium, TextBold } from "components/common";

const Wellcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={wellcomeBg} style={styles.image}>
        <LinearGradient
          colors={["transparent", "#0000009e", "#000"]}
          style={styles.overlay}
        />
        <View style={{ marginBottom: 16 }}>
          <TextBold style={styles.title}>Explore Many Recipes</TextBold>
          <TextMedium style={styles.subtitle}>
            More than 100 recipes that you can try.
          </TextMedium>
        </View>
        <Button
          title="Login"
          variant="filled"
          color="primary"
          withSpacer
          colorScheme="dark"
          onPress={() =>
            navigation.navigate("Auth", {
              screen: "Auth",
              mode: "login",
            })
          }
        />
        <Button
          title="Sign Up"
          variant="outlined"
          color="primary"
          withSpacer
          colorScheme="dark"
          onPress={() =>
            navigation.navigate("Auth", {
              screen: "Auth",
              mode: "signup",
            })
          }
        />
      </ImageBackground>
    </View>
  );
};

Wellcome.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Wellcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    padding: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "white",
    fontSize: 40,
    marginBottom: 8,
  },
  subtitle: {
    color: "#bcbcbc",
    fontSize: 18,
  },
});
