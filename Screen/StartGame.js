import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const StartGame = (props) => {
  const { userGuessedNum } = props;
  const [GeneratedNumber, setGeneratedNumber] = useState(
    generateRandomNumber(1, 100, userGuessedNum)
  );
  const [rounds, setRounds] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [isMistaken, setIsMistaken] = useState(false);

  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && GeneratedNumber < userGuessedNum) ||
      (direction === "greater" && GeneratedNumber > userGuessedNum)
    ) {
      setMistake((preState) => preState + 1);
      setIsMistaken(true);
      // Alert.alert('Wrong decision', 'message message message', [
      //   {text: 'cancel', style: 'cancel'},
      // ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary.current = GeneratedNumber;
    } else {
      minBoundary.current = GeneratedNumber;
    }

    const updatedRandomNum = generateRandomNumber(
      minBoundary.current,
      maxBoundary.current,
      GeneratedNumber
    );

    setIsMistaken(false);
    setGeneratedNumber(updatedRandomNum);
    setRounds((preState) => preState + 1);
  };

  useEffect(() => {
    console.log(
      "user guessed number => ",
      userGuessedNum,
      "computer generated number => ",
      GeneratedNumber
    );
    if (mistake > 2) {
      Alert.alert("Loose", "message message message", [
        {
          text: "End",
          style: "cancel",
          onPress: () => props.resetHandler(),
        },
      ]);
    }
    if (GeneratedNumber === userGuessedNum) {
      props.onFinishGameHandler(rounds);
    }
  });

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Your device choose</Text>
      </View>
      <NumberContainer
        style={isMistaken ? { color: "#FF0000" } : {}}
        guessedNum={GeneratedNumber}
      />
      <Card style={styles.card}>
        <Button
          title="<Less"
          color={colors.accent}
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <Button
          title="Great>"
          color={colors.primary}
          onPress={nextGuessHandler.bind(this, "greater")}
        />
        {/* <View>
          <TouchableWithoutFeedback
            onPress={nextGuessHandler.bind(this, "Lower")}
          >
            <Text>
              <AntDesign name="doubleleft" size={24} color="black" />
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Text>
              <AntDesign name="doubleright" size={24} color="black" />
            </Text>
          </TouchableWithoutFeedback>
        </View> */}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});

export default StartGame;
