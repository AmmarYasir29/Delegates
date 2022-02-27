import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Input, Button, ButtonGroup } from "react-native-elements";
import {
  getDocs,
  collection,
  orderBy,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import db from "../db/firestore";

export default function Details({ route }) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
  const [selectedIndex, setSelectedIndex] = useState(1);
  let total = 0;
  const [payment, setPayment] = useState([{ date: "" }]);
  // user here is same doctor
  const { user } = route.params;
  let listOfPayment = [];

  function compare(a, b) {
    var dateA = new Date(a.date.toDate());
    var dateB = new Date(b.date.toDate());
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
      // console.log(doc.id, " => data() from firebase! ", doc.data());

      listOfPayment.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    // });
    listOfPayment.sort(compare);
    setPayment(listOfPayment);
    setName(user.name);
  }, []);

  const finalAmount = () => {
    payment.forEach(item => {
      if (item.type === "+") total = total + parseInt(item.amount);
      else if (item.type === "-") total = total - parseInt(item.amount);
    });
  };
  const saveData = async () => {
    await updateDoc(doc(db, "doctors", user.id), {
      money: total,
    });
  };
  finalAmount();
  saveData();

  const submitInfo = async () => {
    let type;
    if (selectedIndex === 0) type = "-";
    else if (selectedIndex === 1) type = "+";
    const docRef = await addDoc(collection(db, "doctors", user.id, "payment"), {
      amount: balance,
      date: Timestamp.fromDate(new Date(today)),
      type: type,
    });
    alert("تم حفظ البيانات ", docRef.id);
  };
  // if (!user && !listOfPayment) return <Text>there is no data!</Text>;
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <>
      <View style={styles.Row}>
        <Text style={styles.info}>{user.name}</Text>
        <Text style={styles.info}>{user.money}</Text>
      </View>
      <View style={styles.Row}>
        <Text style={styles.info}>{user.location}</Text>
        <Text style={styles.info}>
          {payment[payment.length - 1].date
            ? payment[payment.length - 1].date.toDate().toDateString()
            : "Date"}
        </Text>
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
          value={balance}
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
        {payment.map((l, i) => (
          <ListItem
            // containerStyle={{
            //   justifyContent: "center",
            //   flexDirection: "row",
            // }}
            key={i}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Subtitle>{l.amount}</ListItem.Subtitle>
              <ListItem.Subtitle>{l.type}</ListItem.Subtitle>
              <ListItem.Subtitle>
                {l.date ? l.date.toDate().toDateString() : "Date"}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </>
    // </KeyboardAvoidingView>
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
