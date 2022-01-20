import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";

const users = [
  {
    name: "brynn",
    avatar: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg",
    money: 432,
  },
  {
    name: "thot leader",
    avatar:
      "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
    money: 645,
  },
  {
    name: "jsa",
    avatar: "https://uifaces.co/our-content/donated/bUkmHPKs.jpg",
    money: 346,
  },
  {
    name: "talhaconcepts",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    money: 432,
  },
  {
    name: "andy vitale",
    avatar: "https://uifaces.co/our-content/donated/NY9hnAbp.jpg",
    money: 432,
  },
  {
    name: "katy friedson",
    avatar:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg",
    money: 432,
  },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setFullData(users);
    setData(users);
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
        {data.map((user, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate("Doctors")}
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

export default HomeScreen;

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
