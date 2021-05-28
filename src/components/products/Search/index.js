import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RESET_SEARCH_MEALS, RESET_SEARCH_INGREDIENTS } from "my-redux/types";
import { InputField } from "components/common";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { searchMeals, searchIngredients } from "my-redux/actions/recipe";

const Search = ({ editable, ...props }) => {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (inputValue !== "") {
      dispatch(searchMeals(inputValue));
      dispatch(searchIngredients(inputValue));
    }
  };

  useEffect(() => {
    if (editable !== false) {
      dispatch({
        type: RESET_SEARCH_INGREDIENTS,
      });
      dispatch({
        type: RESET_SEARCH_MEALS,
      });
    }
  }, [dispatch]);

  return (
    <Pressable {...props}>
      <InputField
        placeholder="Search by name"
        editable={editable}
        value={inputValue}
        autoFocus
        onSubmitEditing={handleSubmit}
        onChangeText={(val) => setInputValue(val)}
        leftIcon={
          <FeatherIcon name="search" size={20} color={colors.textSecondary} />
        }
      />
    </Pressable>
  );
};

Search.defaultProps = {
  editable: true,
};

Search.propTypes = {
  editable: PropTypes.bool,
};

export default Search;
