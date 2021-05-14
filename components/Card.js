import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    shadowRadius: 6,
    // shadowOpacity: 0.9,
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
    backgroundColor: "#fff",
  },
});

export default Card;
