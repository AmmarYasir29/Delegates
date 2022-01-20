import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar, Text } from "react-native-elements";

const DoctorsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    {
      name: "brynn",
      avatar: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg",
      money: 432,
    },
  ]);

  //FIXME: not work
  const updateSearch = searchedText => {
    setSearch(searchedText);
    data.filter(user => user.name.indexOf(search) !== -1);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.headerTitle}>
          <Text style={styles.title}>Doctors Names</Text>
        </View> */}
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
            onPress={() => navigation.navigate("Details")}
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
