import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { TextMedium, IconButton } from "components/common";
import { useTheme } from "@react-navigation/native";
import FaIcon from "react-native-vector-icons/FontAwesome";

const Header = ({ category, area, title, iconButtonAction, isBookmarked }) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.titleWrapper}>
        <TextMedium style={styles.title}>{title}</TextMedium>
        {category && area && (
          <TextMedium style={styles.subtitle(colors)}>
            {`${category} | ${area}`}
          </TextMedium>
        )}
      </View>
      <IconButton
        onPress={iconButtonAction}
        size="lg"
        style={styles.iconButton}
        color="secondary"
        variant="filled"
        icon={
          <FaIcon
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={25}
            color={isBookmarked ? colors.primary : "#000"}
          />
        }
      />
    </>
  );
};

Header.propTypes = {
  category: PropTypes.string,
  area: PropTypes.string,
  title: PropTypes.string,
  iconButtonAction: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
};

export default Header;

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginRight: 16,
    marginBottom: 4,
  },
  subtitle: (colors) => ({
    color: colors.textSecondary,
    fontSize: 18,
  }),
  iconButton: {
    elevation: 4,
  },
});
