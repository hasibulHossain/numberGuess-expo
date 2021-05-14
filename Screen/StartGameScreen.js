import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredVal, setEnteredVal] = useState("");
  const [SubmitVal, setSubmitVal] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const onChangeInputHandler = (intVal) => {
    setEnteredVal(intVal.replace(/[^0-9]/g, ""));
  };

  const confirmInputHandler = () => {
    console.log("confirmInputHandler");
    const chosenNumber = parseInt(enteredVal);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Input has to be a number between 1 to 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
    }
    setSubmitVal(enteredVal);
    setConfirmed(true);
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setEnteredVal("");
    setConfirmed(false);
  };

  const startGameHandler = () => {
    props.onStartGameHandler(SubmitVal);
    setEnteredVal("");
  };

  let confirmedMessage;
  if (confirmed && SubmitVal) {
    confirmedMessage = (
      <Card style={styles.startGameModal}>
        <Text style={{ fontSize: 16 }}>You have chosen </Text>
        <View style={styles.startGameContainer}>
          <NumberContainer guessedNum={SubmitVal} />
        </View>
        <Button
          title="START GAME"
          color={colors.accent}
          onPress={startGameHandler}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          Start new game
        </Text>
        <View>
          <Card style={styles.inputContainer}>
            <Text style={{ fontSize: 20 }}>select a number</Text>
            <View style={{ width: 100, marginVertical: 20 }}>
              <Input
                keyboardType="number-pad"
                maxLength={2}
                selectionColor={colors.primary}
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  paddingVertical: 10,
                }}
                value={enteredVal}
                onChangeText={onChangeInputHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="Reset"
                  color={colors.primary}
                  onPress={resetInputHandler}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Confirm"
                  color={colors.accent}
                  onPress={confirmInputHandler}
                />
              </View>
            </View>
          </Card>
          {confirmedMessage}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    width: 300,
    marginTop: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: 100,
  },
  startGameModal: {
    marginTop: 20,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  startGameContainer: { alignItems: "center" },
});

export default StartGameScreen;
