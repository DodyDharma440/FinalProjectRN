import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextBold, TextMedium, TextRegular, Avatar } from "components/common";
import { useTheme } from "@react-navigation/native";

const MainHeader = () => {
  const { colors } = useTheme();
  const [greetings, setGreetings] = useState("");
  const name = "Dody";

  const makeGreetings = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 10) {
      setGreetings("Morning");
    } else if (hour >= 11 && hour <= 16) {
      setGreetings("Afternoon");
    } else if (hour >= 17 && hour <= 20) {
      setGreetings("Evening");
    } else if (hour >= 21 && hour <= 24) {
      setGreetings("Night");
    }
  };

  useEffect(() => {
    makeGreetings();

    return () => {
      setGreetings("");
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <TextBold style={styles.greeting}>
          {`Good ${greetings}, ${name}`}
        </TextBold>
        <TextMedium style={styles.subtitle(colors)}>
          What do you want to cook?
        </TextMedium>
      </View>
      <Avatar>{name.charAt(0)}</Avatar>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  titleWrapper: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: (colors) => ({
    fontSize: 18,
    color: colors.textSecondary,
  }),
});
