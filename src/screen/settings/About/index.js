import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Container, ListItem } from "components/layout";
import { useTheme } from "@react-navigation/native";
import {
  Avatar,
  TextBold,
  TextMedium,
  TextRegular,
  Card,
} from "components/common";
import FeatherIcon from "react-native-vector-icons/Feather";
import { logoWithBg } from "assets/images";

const About = ({ navigation }) => {
  const { colors } = useTheme();

  const AboutApp = () => (
    <>
      <TextBold style={styles.title}>About this app</TextBold>
      <TextRegular style={styles.paragraph}>
        'CookBook' is an application to search for recipes. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nullam ac lacus nisi. Morbi vel
        nisi eget nisi consectetur eleifend. Duis dapibus dolor eu neque luctus
        convallis. Duis consequat turpis vel urna rutrum, non convallis lacus
        eleifend. Phasellus vehicula libero eget nibh tincidunt, quis luctus
        lorem pharetra. Vivamus nulla mauris, vulputate sit amet felis
        dignissim, faucibus ullamcorper tortor. Integer bibendum dictum posuere.
        In faucibus gravida efficitur.
      </TextRegular>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={logoWithBg} />
        <TextRegular style={styles.paragraph}>CookBook v1.0</TextRegular>
      </View>
    </>
  );

  const DevProfile = () => (
    <>
      <TextBold style={styles.title}>Developer Profile</TextBold>
      <Avatar style={styles.avatar} size="xl">
        <FeatherIcon name="user" size={50} />
      </Avatar>
      <View style={styles.nameWrapper}>
        <TextBold style={styles.name}>Dodi Aditya</TextBold>
        <TextMedium style={styles.subName(colors)}>Student</TextMedium>
      </View>
      <Card withSpacer>
        <ListItem title="Name" contentText="I Made Dodi Aditya Ari Dharma" />
        <ListItem
          title="Profession"
          contentText="Student of junior high school"
        />
        <ListItem title="Email" contentText="dodiaridharma@gmail.com" />
        <ListItem title="Github" contentText="DodyDharma440" />
        <ListItem title="Phone/WA" contentText="+6287762859712" />
      </Card>
    </>
  );

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DevProfile />
        <AboutApp />
      </ScrollView>
    </Container>
  );
};

About.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default About;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  paragraph: {
    marginBottom: 8,
  },
  avatar: {
    alignSelf: "center",
    marginVertical: 8,
  },
  nameWrapper: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    textAlign: "center",
  },
  subName: (colors) => ({
    color: colors.primary,
  }),
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
  profileItemText: {
    fontSize: 20,
  },
});
