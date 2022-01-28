import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, SearchBar } from "react-native-elements";
import db from "../db/firestore";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);

  let dataa = [];
  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "delegates"));
    querySnapshot.forEach(doc => {
      console.log(doc.id, " => data() from firebase! ", doc.data());
      dataa.push({ id: doc.id, name: doc.data().name, avatar: "", money: 123 });
    });
    setFullData(dataa);
    setData(dataa);
  }, []);

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
        {data.map(user => (
          <TouchableOpacity
            key={user.id}
            onPress={() => navigation.navigate("Doctors", { id: user.id })}
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

export default HomeScreen;
