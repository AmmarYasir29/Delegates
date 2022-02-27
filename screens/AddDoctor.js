import { StyleSheet, View, Button } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";

import { collection, addDoc, setDoc } from "firebase/firestore";
import db from "../db/firestore";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);
  const [location, setLocation] = useState("");
  const [delegate, setDelegate] = useState("");

  const addNew = async () => {
    let docId;
    const docRef = await addDoc(collection(db, "doctors"), {
      name,
      money,
      location,
      delegate_id: delegate,
    }).then(data => {
      docId = data.id;
    });
    // FIXME: not work add sub collection in firebase
    db.collection("doctors").doc(docId).collection("payment").add({
      amount: "Los Angeles",
      date: "CA",
      type: "USA",
    });
    alert("Document written with ID: ", docRef.id);
  };
  return (
    <View>
      <Input
        placeholder="Doctor name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="noney have"
        value={money}
        onChangeText={text => setMoney(text)}
      />
      <Input
        placeholder="location"
        value={location}
        onChangeText={text => setLocation(text)}
      />
      <Input
        placeholder="delegate ID"
        value={delegate}
        onChangeText={text => setDelegate(text)}
      />

      <Button
        onPress={addNew}
        title="add New Doctor!"
        color="#841584"
        accessibilityLabel="addNew"
      />
    </View>
  );
};

export default AddDoctor;

const styles = StyleSheet.create({});
