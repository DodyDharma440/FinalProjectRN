import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert as RnAlert,
} from "react-native";
import {
  TextMedium,
  TextBold,
  InputField,
  Button,
  Alert,
} from "components/common";
import { useDispatch } from "react-redux";
import { logout } from "my-redux/actions/auth";
import { Container } from "components/layout";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as api from "api";
import * as firebase from "firebase";

const EditProfile = ({ navigation }) => {
  const userData = firebase.auth().currentUser;
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const defaultInputValue = {
    name: userData.displayName,
    email: userData.email,
    newPassword: "",
    confirmPassword: "",
  };

  const [inputValue, setInputValue] = useState({
    name: userData.displayName,
    email: userData.email,
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConPw, setShowConPw] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState([]);

  const handleSuccess = () => {
    setLoading(false);

    if (
      errorMessage.length === 0 &&
      JSON.stringify(defaultInputValue) !== JSON.stringify(inputValue)
    ) {
      setIsSuccess(true);
    }
  };

  const handleError = (message) => {
    setLoading(false);
    setErrorMessage([...errorMessage, message]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage([]);
    const { name, email, newPassword, confirmPassword } = inputValue;

    if (name !== userData.displayName) {
      console.log("name");
      try {
        await api.updateProfile(userData, name);
      } catch (error) {
        handleError(error.message);
        return;
      }
    }

    if (email !== userData.email) {
      console.log("email");
      try {
        await api.updateEmail(userData, email);
      } catch (error) {
        handleError(error.message);
        return;
      }
    }

    if (newPassword !== "") {
      console.log("pass");
      if (newPassword === confirmPassword) {
        try {
          await api.updatePassword(userData, newPassword);
        } catch (error) {
          handleError(error.message);
          return;
        }
      } else {
        handleError("Password doesn't match");
        return;
      }
    }

    handleSuccess();
  };

  const handleDeleteAccount = async () => {
    try {
      await api.deleteAccount(userData);
      dispatch(
        logout((success, err) => {
          if (err) {
            RnAlert.alert("Error", "Sign out failed. Please try again.");
          }
        })
      );
    } catch (error) {
      RnAlert.alert("Error", error.message);
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextBold style={styles.title}>Edit Profile</TextBold>
        {isSuccess && (
          <Alert variant="success">
            Profile update is successful. Please re-login
          </Alert>
        )}
        {errorMessage.length > 0 && (
          <Alert variant="danger">
            {errorMessage.map((message, index) => (
              <TextMedium key={index}>{message}, </TextMedium>
            ))}
          </Alert>
        )}
        <InputField
          leftIcon={
            <FeatherIcon name="user" size={20} color={colors.textSecondary} />
          }
          style={styles.input}
          placeholder="Name"
          value={inputValue.name}
          onChangeText={(val) => setInputValue({ ...inputValue, name: val })}
        />
        <InputField
          leftIcon={
            <FeatherIcon name="mail" size={20} color={colors.textSecondary} />
          }
          style={styles.input}
          placeholder="Email"
          value={inputValue.email}
          onChangeText={(val) => setInputValue({ ...inputValue, email: val })}
        />
        <InputField
          leftIcon={
            <FeatherIcon name="lock" size={20} color={colors.textSecondary} />
          }
          style={styles.input}
          placeholder="New Password"
          value={inputValue.newPassword}
          onChangeText={(val) =>
            setInputValue({ ...inputValue, newPassword: val })
          }
          secureTextEntry={showNewPw ? false : true}
          rightIcon={
            <TouchableOpacity onPress={() => setShowNewPw(!showNewPw)}>
              <FeatherIcon
                name={showNewPw ? "eye-off" : "eye"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          }
        />
        <InputField
          leftIcon={
            <FeatherIcon name="lock" size={20} color={colors.textSecondary} />
          }
          style={styles.input}
          placeholder="Confirm New Password"
          value={inputValue.confirmPassword}
          onChangeText={(val) =>
            setInputValue({ ...inputValue, confirmPassword: val })
          }
          secureTextEntry={showConPw ? false : true}
          rightIcon={
            <TouchableOpacity onPress={() => setShowConPw(!showConPw)}>
              <FeatherIcon
                name={showConPw ? "eye-off" : "eye"}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          }
        />
        <Button
          onPress={handleSubmit}
          withSpacer
          title="Update Profile"
          colorScheme="dark"
        />
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
        <Button
          onPress={() =>
            RnAlert.alert(
              "Delete Account",
              "Are you sure to delete your CookBook account? This action can't be undo.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => handleDeleteAccount(),
                },
              ]
            )
          }
          withSpacer
          title="Delete Account"
          colorScheme="light"
          color="secondary"
        />
      </ScrollView>
    </Container>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
});
