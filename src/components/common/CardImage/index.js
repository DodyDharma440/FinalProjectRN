import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import TextMedium from "../TextMedium";
import IconButton from "../IconButton";

const CardImage = ({ iconButton, buttonAction, onPress, image, label }) => {
  return (
    <>
      <ImageBackground
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
        source={image}
      >
        {iconButton && (
          <IconButton
            onPress={buttonAction}
            style={styles.button}
            size="sm"
            color="default"
            variant="filled"
            icon={iconButton}
          />
        )}
      </ImageBackground>
      {label && (
        <TouchableOpacity onPress={onPress}>
          <TextMedium style={styles.title}>{label}</TextMedium>
        </TouchableOpacity>
      )}
    </>
  );
};

CardImage.propTypes = {
  label: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  iconButton: PropTypes.element,
  buttonAction: PropTypes.func,
  onPress: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
};

export default CardImage;

const styles = StyleSheet.create({
  image: {
    height: 170,
    marginBottom: 4,
    padding: 8,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
  },
  button: {
    alignSelf: "flex-end",
    elevation: 4,
  },
});
