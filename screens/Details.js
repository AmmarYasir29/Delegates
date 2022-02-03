import React, { cloneElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Input, Button, ButtonGroup } from "react-native-elements";
import {
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import db from "../db/firestore";
import { ListItem } from "react-native-elements";

export default function Details({ route }) {
  //TODO: calculate the amoutn for each doctor
  //      show the last date
  //      submite info
  const [name, setName] = useState("");
  const [Balance, setBalance] = useState(0);
  const [today, setToday] = useState(""); //null
  const [type, setType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [payment, setPayment] = useState([]);
  const { user } = route.params;
  let Today = new Date().toISOString().slice(0, 10);
  let listOfPayment = [];

  function compare(a, b) {
    var dateA = new Date(a.data.toDate());
    var dateB = new Date(b.data.toDate());
    return dateA - dateB;
  }

  useEffect(async () => {
    const querySnapshot = await getDocs(
      collection(db, "doctors", user.id, "payment"),
      orderBy("amount")
    );

    querySnapshot.forEach(doc => {
      // onSnapshot(querySnapshot, doc => {
      //   doc.docs.forEach(doc => {
      console.log(doc.id, " => data() from firebase! ", doc.data());

      listOfPayment.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    // });
    listOfPayment.sort(compare);
    setPayment(listOfPayment);
    setName(user.name);
    setToday(Today);
  }, []);

  const submitInfo = () => {
    console.log(selectedIndex);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.Row}>
        <Text style={styles.info}>{user.name}</Text>
        <Text style={styles.info}>{user.money}</Text>
      </View>
      <View style={styles.Row}>
        <Text style={styles.info}>{user.location}</Text>
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
          value={today}
          onChangeText={text => setToday(text)}
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

        {payment.map(l => (
          <ListItem
            // containerStyle={{
            //   justifyContent: "center",
            //   flexDirection: "row",
            // }}
            key={l.id}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Subtitle>{l.amount}</ListItem.Subtitle>
              <ListItem.Subtitle>{l.type}</ListItem.Subtitle>
              <ListItem.Subtitle>
                {l.data.toDate().toDateString()}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
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
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
