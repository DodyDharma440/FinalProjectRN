import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Container } from "components/layout";
import { Avatar, TextMedium, Button, Card } from "components/common";
import * as firebase from "firebase";

const Account = ({ navigation }) => {
  const userData = firebase.auth().currentUser;
  const { colors } = useTheme();
  const bookmarksMeal = useSelector((state) => state.meals.bookmarks);

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Avatar style={styles.avatar} size="lg" variant="primary">
          {userData?.displayName?.charAt(0)}
        </Avatar>
        <Card withSpacer>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>Name</TextMedium>
            <TextMedium style={styles.title}>
              {userData?.displayName}
            </TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>Email</TextMedium>
            <TextMedium style={styles.title}>{userData?.email}</TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>
              Meals Bookmarked
            </TextMedium>
            <TextMedium style={styles.title}>{bookmarksMeal.length}</TextMedium>
          </View>
          <View style={styles.listItem(colors)}>
            <TextMedium style={styles.label(colors)}>
              Ingredients Bookmarked
            </TextMedium>
            <TextMedium style={styles.title}>1</TextMedium>
          </View>
        </Card>
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
