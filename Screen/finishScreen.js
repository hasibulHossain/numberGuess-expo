import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
const finishPhoto = require("../assets/success.png");

const finishScreen = (props) => {
  const { GuessedRounds, UserInput, resetHandler } = props;
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image resizeMode="cover" source={finishPhoto} style={styles.image} />
      </View>
      <Text>
        Your phone needed {GuessedRounds} rounds to guess {UserInput}
      </Text>
      {/* <Text>Number was {UserInput}</Text>
      <Text>Your device took {GuessedRounds} rounds</Text> */}
      <Button title="okay" onPress={resetHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default finishScreen;
