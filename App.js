import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
// import Products from './Products';
import Header from "./components/Header";
// import Grid from "./components/Grid";
import StartGameScreen from "./Screen/StartGameScreen";
import StartGame from "./Screen/StartGame";
import FinishGame from "./Screen/finishScreen";

function App() {
  const [UserInput, setUserInput] = useState();
  const [GuessedRounds, setGuessedRounds] = useState(0);

  const onStartGameHandler = (input) => {
    setUserInput(input);
    setGuessedRounds(0);
  };

  const resetHandler = () => {
    setGuessedRounds(0);
    setUserInput(null);
  };

  const onFinishGameHandler = (rounds) => {
    setGuessedRounds(rounds);
  };

  let content = <StartGameScreen onStartGameHandler={onStartGameHandler} />;

  if (UserInput && GuessedRounds <= 0) {
    content = (
      <StartGame
        resetHandler={resetHandler}
        userGuessedNum={parseInt(UserInput)}
        onFinishGameHandler={onFinishGameHandler}
      />
    );
  }

  if (GuessedRounds > 0) {
    content = (
      <FinishGame
        resetHandler={resetHandler}
        GuessedRounds={GuessedRounds}
        UserInput={UserInput}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Home" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
