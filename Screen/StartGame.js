import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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
  const [list, setList] = useState([]);

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

  const mapList = (item, index) => (
    <Card
      key={index}
      style={{ width: "80%", borderRadius: 5, marginBottom: 20 }}
    >
      <View style={styles.listItem}>
        <Text>#{index}</Text>
        <Text>{item}</Text>
      </View>
    </Card>
  );

  const renderedListItem = (listLength, itemData) => (
    <Card
      key={itemData.index}
      style={{ width: "80%", borderRadius: 5, marginBottom: 20 }}
    >
      <View style={styles.listItem}>
        <Text>#{itemData.index}</Text>
        <Text>{itemData.item}</Text>
      </View>
    </Card>
  );

  useEffect(() => {
    console.log("list => ", list);
    const cloneList = [...list];
    cloneList.push(GeneratedNumber);
    setList(cloneList);
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
  }, [GeneratedNumber]);

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
        <TouchableWithoutFeedback
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <View style={styles.btnContainer}>
            <Ionicons name="arrow-down-circle" color="#000" size={34} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <View style={styles.btnContainer}>
            <Ionicons name="arrow-up-circle" color="#000" size={32} />
          </View>
        </TouchableWithoutFeedback>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {list.map(mapList)}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.toString()}
          data={list}
          renderItem={renderedListItem.bind(this, list.length)}
        />
      </View>
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
  btnContainer: {
    backgroundColor: colors.accent,
    width: "30%",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  listContainer: {
    width: "60%",
    flex: 1,
    marginTop: 10,
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1,
    paddingLeft: "20%",
    // alignItems: "center",
    paddingVertical: 20,
  },
  listItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StartGame;
