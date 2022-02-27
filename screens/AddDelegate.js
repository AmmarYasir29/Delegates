import { StyleSheet, View, Button } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";

import { collection, addDoc } from "firebase/firestore";
import db from "../db/firestore";

const AddDelegate = () => {
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);

  const addNew = async () => {
    const docRef = await addDoc(collection(db, "delegates"), {
      name,
      money,
    });
    alert("Document written with ID: ", docRef.id);
  };
  return (
    <View>
      <Input
        placeholder="Delegate name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="noney have"
        value={money}
        onChangeText={text => setMoney(text)}
      />

      <Button
        onPress={addNew}
        title="add New Delegate!"
        color="#841584"
        accessibilityLabel="addNew"
      />
    </View>
  );
};

export default AddDelegate;

const styles = StyleSheet.create({});
