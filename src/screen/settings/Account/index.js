import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Container } from "components/layout";
import { Avatar, TextMedium, Button } from "components/common";

const Account = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const { colors } = useTheme();

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Avatar style={styles.avatar} size="lg" variant="primary">
          {userData.displayName?.charAt(0)}
        </Avatar>
        <View style={styles.card}>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>Name</TextMedium>
            <TextMedium style={styles.title}>{userData.displayName}</TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>Email</TextMedium>
            <TextMedium style={styles.title}>{userData.email}</TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>
              Meals Bookmarked
            </TextMedium>
            <TextMedium style={styles.title}>10</TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>
              Ingredients Bookmarked
            </TextMedium>
            <TextMedium style={styles.title}>1</TextMedium>
          </View>
        </View>
        <Button
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.button}
          title="Edit Profile"
          colorScheme="dark"
        />
      </ScrollView>
    </Container>
  );
};

Account.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Account;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 24,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    marginVertical: 16,
  },
  listItem: (colors) => ({
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  }),
  label: (colors) => ({
    color: colors.primary,
    marginBottom: 4,
  }),
  title: {
    fontSize: 20,
  },
  button: {
    width: "40%",
    alignSelf: "flex-end",
  },
});
