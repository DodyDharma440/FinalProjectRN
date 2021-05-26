import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme, useNavigation } from "@react-navigation/native";
import { TextBold, TextMedium, IconButton } from "components/common";
import * as api from "api";
import FaIcon from "react-native-vector-icons/FontAwesome";

const MealCardLarge = ({ item }) => {
  const { strMeal, strMealThumb, idMeal } = item;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [detailData, setDetailData] = useState({});

  const getDetailData = async () => {
    try {
      const { data } = await api.getDetailMeal(idMeal);
      setDetailData(data.meals[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetailData();

    return () => {
      setDetailData({});
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: strMealThumb }}
        imageStyle={{ borderRadius: 18 }}
      >
        <LinearGradient
          colors={["transparent", "#0000009e", "#000"]}
          style={styles.overlay}
        >
          <IconButton
            style={styles.button}
            size="sm"
            color="white"
            variant="filled"
            icon={<FaIcon name="bookmark-o" size={20} color="#000" />}
          />
          <View style={styles.titleWrapper}>
            <TouchableOpacity>
              <TextBold numberOfLines={2} style={styles.title}>
                {strMeal}
              </TextBold>
            </TouchableOpacity>
            <TextMedium style={styles.subtitle(colors)}>
              {detailData?.strArea}
            </TextMedium>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

MealCardLarge.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MealCardLarge;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  image: {
    resizeMode: "cover",
    width: 225,
    height: 300,
  },
  overlay: {
    flex: 1,
    width: "100%",
    borderRadius: 18,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: (colors) => ({
    color: colors.primary,
  }),
  button: {
    alignSelf: "flex-end",
  },
});
