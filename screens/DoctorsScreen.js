import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../db/firestore";

const DoctorsScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { id } = route.params;

  let total = 0;
  let dataa = [];
  useEffect(async () => {
    const q = query(
      collectionGroup(db, "doctors"),
      where("delegate_id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      dataa.push({
        id: doc.id,
        name: doc.data().name,
        lastDate: "",
        money: doc.data().money,
        location: doc.data().location,
      });
    });
    setData(dataa);
  }, []);
  const finalAmount = () => {
    data.forEach(item => {
      total = total + parseInt(item.money);
    });
  };

  const saveData = async () => {
    await updateDoc(doc(db, "delegates", id), {
      money: total,
    });
  };
  finalAmount();
  saveData();
  //FIXME: not work
  const updateSearch = searchedText => {
    setSearch(searchedText);
    data.filter(user => user.name.indexOf(search) !== -1);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchStyle}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            round
            lightTheme
          />
        </View>
        {data.map((user, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate("Details", { user })}
          >
            <View style={styles.user}>
              <Text style={styles.textInfo}>{user.name}</Text>
              <Text style={styles.textInfo}> {user.money}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    backgroundColor: "yellow",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  searchStyle: {
    marginVertical: 5,
  },
  user: {
    flexDirection: "row",
    backgroundColor: "yellow",
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  textInfo: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
});
export default DoctorsScreen;
