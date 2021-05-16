import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
// import Products from './Products';
import Header from "./components/Header";
// import Grid from "./components/Grid";
import StartGameScreen from "./Screen/StartGameScreen";
import StartGame from "./Screen/StartGame";
import FinishGame from "./Screen/finishScreen";
import { loadAsync as FontLoadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

const customFonts = {
  "roboto-regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  "roboto-light": require("./assets/Fonts/Roboto-Light.ttf"),
  "roboto-medium": require("./assets/Fonts/Roboto-Medium.ttf"),
  "roboto-bold": require("./assets/Fonts/Roboto-Bold.ttf"),
};

function App() {
  const [UserInput, setUserInput] = useState();
  const [GuessedRounds, setGuessedRounds] = useState(0);
  const [appIsReady, setAppIsReady] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await FontLoadAsync(customFonts);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    })();
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
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
