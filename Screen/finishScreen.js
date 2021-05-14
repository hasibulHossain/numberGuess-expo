import React from "react";
import { View, Text, Button } from "react-native";

const finishScreen = (props) => {
  const { GuessedRounds, UserInput, resetHandler } = props;
  return (
    <View>
      <Text>game is finish</Text>
      <Text>Number was {UserInput}</Text>
      <Text>Your device took {GuessedRounds} rounds</Text>
      <Button title="okay" onPress={resetHandler} />
    </View>
  );
};

export default finishScreen;
