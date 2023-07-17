import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ContactMenuButtons = [
  {
    type: "starred",
    name: "Starred"
  },
  {
    type: "contact",
    name: "Aditi",
    photo: require("../assets/ADITI.jpeg"),
  },
  {
    type: "contact",
    name: "Sanjana",
    photo: require("../assets/SANJANA.jpeg"),
  },
  {
    type: "contact",
    name: "Bharti",
    photo: require("../assets/BHARTI.jpeg"),
  },
  {
    type: "contact",
    name: "Yash",
    photo: require("../assets/YASH.jpeg"),
  },
];
const ContactMenu = () => {
  return (
    <View style={styles.container}>
      {ContactMenuButtons.map((contact, index) => (
        <View key={index} style={styles.row}>
          {contact.type == "starred" ? (
            <View style={styles.starredIcon}>
              <AntDesign name="star" size={30} color="#efefef" />
            </View>
          ) : (
            <Image source={contact.photo} style={styles.image} />
          )}

          <Text style={styles.text}>
              {contact.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ContactMenu;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  starredIcon: {
    backgroundColor: "#333333",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
  image: {
      width: 55,
      height: 55,
      borderRadius: 20
  }
});
