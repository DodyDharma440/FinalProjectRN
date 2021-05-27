import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "my-redux/actions/auth";
import {
  TextBold,
  TextMedium,
  InputField,
  Button,
  Alert,
} from "components/common";
import { Container } from "components/layout";
import { logoWithBg } from "assets/images";

const Auth = ({ route, navigation }) => {
  const { mode } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [currentMode, setCurrentMode] = useState(mode ? mode : "login");
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = () => {
    setLoading(true);
    if (inputValue.password === inputValue.confirmPassword) {
      dispatch(
        signUp(inputValue, (success, err) => {
          if (success) {
            setInputValue({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }

          if (err) {
            setErrorMessage(err.message);
            setLoading(false);
          }
        })
      );
    } else {
      setErrorMessage("Password and confirm password is not match");
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setLoading(true);
    dispatch(
      signIn(inputValue, (success, err) => {
        if (success) {
          setInputValue({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }

        if (err) {
          setErrorMessage(err.message);
          setLoading(false);
        }
      })
    );
  };

  const handleSwitchMode = () => {
    setErrorMessage(null);
    setInputValue({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setCurrentMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const SuggestionText = () => {
    return (
      <View style={styles.suggestionTextWrapper}>
        {currentMode === "login" && (
          <>
            <TextMedium>Don't have an account? </TextMedium>
            <TouchableOpacity onPress={handleSwitchMode}>
              <TextMedium style={styles.linkText(colors)}>Sign Up</TextMedium>
            </TouchableOpacity>
          </>
        )}
        {currentMode === "signup" && (
          <>
            <TextMedium>Already have an account? </TextMedium>
            <TouchableOpacity onPress={handleSwitchMode}>
              <TextMedium style={styles.linkText(colors)}>Sign In</TextMedium>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Image source={logoWithBg} style={styles.imageLogo} />
        </View>
        <View style={styles.titleWrapper}>
          <TextBold style={styles.title}>
            {currentMode === "login" ? "Wellcome Back" : "Create Account"}
          </TextBold>
          <TextMedium style={styles.subtitle(colors)}>
            {currentMode === "login"
              ? "Please sign in to continue"
              : "Sign up your account to use this app."}
          </TextMedium>
        </View>
        {errorMessage && (
          <Alert style={{ marginBottom: 8 }} variant="warning">
            {errorMessage}
          </Alert>
        )}
        <View style={styles.form}>
          {currentMode === "signup" && (
            <InputField
              style={styles.input}
              placeholder="Your Name"
              value={inputValue.name}
              onChangeText={(val) =>
                setInputValue({ ...inputValue, name: val })
              }
              leftIcon={
                <FeatherIcon
                  name="user"
                  size={20}
                  color={colors.textSecondary}
                />
              }
            />
          )}
          <InputField
            style={styles.input}
            placeholder="Email"
            value={inputValue.email}
            onChangeText={(val) => setInputValue({ ...inputValue, email: val })}
            leftIcon={
              <FeatherIcon name="mail" size={20} color={colors.textSecondary} />
            }
          />
          <InputField
            style={styles.input}
            secureTextEntry={showPassword ? false : true}
            placeholder="Password"
            value={inputValue.password}
            onChangeText={(val) =>
              setInputValue({ ...inputValue, password: val })
            }
            leftIcon={
              <FeatherIcon name="lock" size={20} color={colors.textSecondary} />
            }
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FeatherIcon
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            }
          />
          {currentMode === "signup" && (
            <InputField
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={showConfirmPassword ? false : true}
              value={inputValue.confirmPassword}
              onChangeText={(val) =>
                setInputValue({ ...inputValue, confirmPassword: val })
              }
              leftIcon={
                <FeatherIcon
                  name="lock"
                  size={20}
                  color={colors.textSecondary}
                />
              }
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FeatherIcon
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              }
            />
          )}
          <Button
            onPress={currentMode === "signup" ? handleSignUp : handleLogin}
            variant="filled"
            color="primary"
            colorScheme="dark"
            withSpacer
            title={currentMode === "login" ? "Login" : "Sign Up"}
          />
          {loading && (
            <ActivityIndicator size="small" color={colors.textSecondary} />
          )}
        </View>
        <SuggestionText />
      </ScrollView>
    </Container>
  );
};

Auth.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Auth;

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  logoWrapper: {
    paddingTop: 36,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: windowHeight / 10,
  },
  imageLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  titleWrapper: {
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
  },
  subtitle: (colors) => ({
    fontSize: 18,
    color: colors.textSecondary,
  }),
  form: {
    marginBottom: windowHeight / 10,
  },
  input: {
    marginBottom: 16,
  },
  suggestionTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  linkText: (colors) => ({
    color: colors.primary,
  }),
});
