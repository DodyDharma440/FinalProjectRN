import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import FaIcon from "react-native-vector-icons/FontAwesome";

const BottomNavItem = ({ isFocused, options, onPress, onLongPress, label }) => {
  const Icon = () => {
    const iconColor = isFocused ? "#289672" : "#686868";

    switch (label) {
      case "Home":
        return <AntIcon name="home" size={25} color={iconColor} />;

      case "Explore":
        return <FeatherIcon name="search" size={25} color={iconColor} />;

      case "Bookmark":
        return <FaIcon name="bookmark-o" size={25} color={iconColor} />;

      case "Settings":
        return <AntIcon name="setting" size={25} color={iconColor} />;
      default:
        return <Text>{label}</Text>;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Icon />
      {isFocused && <View style={styles.active} />}
    </TouchableOpacity>
  );
};

export default BottomNavItem;

BottomNavItem.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  options: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
  label: PropTypes.string,
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  active: {
    position: "absolute",
    bottom: 0,
    width: 40,
    height: 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#289672",
  },
});
