import React, { cloneElement, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";

export default function Details({ route }) {
  const [name, setName] = useState("");
  const [Balance, setBalance] = useState(0);
  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = route.params;

  const submitInfo = () => {
    console.log(selectedIndex);
  };
  console.log(user);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.Row}>
        <Text style={styles.info}>Doctor Name</Text>
        <Text style={styles.info}>Balance</Text>
      </View>
      <View style={styles.Row}>
        <Text style={styles.info}>Location</Text>
        <Text style={styles.info}>Last Date</Text>
      </View>
      <View>
        <Input
          placeholder="Doctor Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Date"
          value={date}
          onChangeText={text => setDate(text)}
        />
        <Input
          placeholder="Money"
          value={Balance}
          onChangeText={text => setBalance(text)}
        />
        <View style={styles.groupButton}>
          <ButtonGroup
            buttons={["-", "+"]}
            selectedIndex={selectedIndex}
            onPress={value => setSelectedIndex(value)}
            containerStyle={{ width: 100 }}
          />
          <Button
            title="Submit"
            buttonStyle={{
              backgroundColor: "rgba(127, 220, 103, 1)",
              height: 40,
              width: 100,
              marginTop: 5,
            }}
            onPress={submitInfo}
          />
        </View>
        {/* <FlatList>Rate your teams performance this quarter</FlatList> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Row: {
    backgroundColor: "yellow",
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 5,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  info: {
    fontSize: 20,
    fontWeight: "200",
    color: "black",
  },
  groupButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
