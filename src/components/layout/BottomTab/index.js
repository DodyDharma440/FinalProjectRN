import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform, Keyboard } from "react-native";
import PropTypes from "prop-types";
import { BottomTabItem } from "components/layout";

const BottomTab = ({ state, descriptors, navigation }) => {
  const [visible, setVisible] = useState(true);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  useEffect(() => {
    let keyboardEvtListener;

    if (Platform.OS === "android") {
      keyboardEvtListener = [
        Keyboard.addListener("keyboardDidShow", () => setVisible(false)),
        Keyboard.addListener("keyboardDidHide", () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === "android") {
        keyboardEvtListener && keyboardEvtListener.forEach((e) => e.remove());
      }
    };
  }, []);

  const TabBar = () => (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options?.tabBarLabel
          ? options.tabBarLabel
          : options?.title
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <BottomTabItem
            key={`${index}-${label}`}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
          />
        );
      })}
    </View>
  );

  if (Platform.OS === "ios") {
    return <TabBar />;
  }

  if (!visible) {
    return null;
  }

  return <TabBar />;
};

export default BottomTab;

BottomTab.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 4,
  },
});
