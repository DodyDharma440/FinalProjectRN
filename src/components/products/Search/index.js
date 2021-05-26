import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { InputField } from "components/common";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";

const Search = ({ editable, ...props }) => {
  const { colors } = useTheme();

  return (
    <Pressable {...props}>
      <InputField
        placeholder="Search"
        editable={editable}
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

const styles = StyleSheet.create({});
