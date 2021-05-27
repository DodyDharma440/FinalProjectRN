import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { logout } from "my-redux/actions/auth";
import { Container } from "components/layout";
import { logoWithBg } from "assets/images";
import { TextMedium, TextBold, Avatar, Button } from "components/common";
import { useTheme } from "@react-navigation/native";

const Settings = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(
      logout((success, err) => {
        if (err) {
          Alert.alert("Error", "Sign out failed. Please try again.");
        }
      })
    );
  };

  const listItems = [
    {
      id: "1",
      label: "Account",
      iconName: "user",
      rightIcon: true,
      onPress: () => navigation.navigate("Account"),
    },
    {
      id: "2",
      label: "About Us",
      iconName: "info",
      rightIcon: true,
      onPress: () => navigation.navigate("About Us"),
    },
    {
      id: "3",
      label: "Sign Out",
      iconName: "log-out",
      onPress: () => {
        Alert.alert("Sign Out", "Are you sure to sign out your account?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign Out",
            onPress: () => handleSignOut(),
          },
        ]);
      },
    },
  ];

  return (
    <Container style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.logoWrapper}>
          <Image source={logoWithBg} style={styles.imageLogo} />
        </View>
        <TextBold style={styles.title}>Settings</TextBold>
        <View style={styles.listContainer}>
          {listItems.map(({ id, label, iconName, rightIcon, onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              key={id}
              style={styles.listItemContainer}
            >
              <Avatar style={{ marginRight: 24 }} size="md" variant="secondary">
                <FeatherIcon name={iconName} size={25} color={colors.primary} />
              </Avatar>
              <TextMedium style={styles.listTitle}>{label}</TextMedium>
              {rightIcon && (
                <FeatherIcon
                  name="chevron-right"
                  size={25}
                  color={colors.textSecondary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={() => BackHandler.exitApp()}
          title="Exit App"
          colorScheme="dark"
          style={{ marginBottom: 16 }}
        />
      </ScrollView>
    </Container>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  logoWrapper: {
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  imageLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
  },
  listContainer: {
    paddingVertical: 24,
    flex: 1,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 18,
    flex: 1,
  },
});
