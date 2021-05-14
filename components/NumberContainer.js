import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors.js";

const NumberContainer = (props) => {
  return (
    <View style={{ ...styles.numberContainer, ...props.style }}>
      <Text style={{ ...styles.number, ...props.style }}>
        {props.guessedNum}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderColor: colors.accent,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  number: {
    color: colors.primary,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default NumberContainer;
