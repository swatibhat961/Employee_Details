import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Image,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Card, Title, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    _id,
    name,
    email,
    phone,
    salary,
    position,
    picture,
  } = props.route.params.item;

  const deleteEmploye = () => {
    fetch("https://e8406632.ngrok.io/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedEmp) => {
        Alert.alert(`${deletedEmp.name} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("someting went wrong");
      });
  };
  return (
    <View style={styles.mainView}>
      <LinearGradient colors={["#67089e", "pink"]} style={{ height: "20%" }} />
      <View style={styles.imageStyle}>
        <Image
          source={{
            uri: picture,
          }}
          style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
        />
      </View>
      <View style={styles.description}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 18 }}>{position}</Text>
      </View>
      <Card
        style={styles.cardstyle}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardView}>
          <MaterialIcons name="email" size={32} color="#67089e85" />
          <Text style={{ fontSize: 16 }}>{email}</Text>
        </View>
      </Card>
      <Card
        style={styles.cardstyle}
        onPress={() => {
          Linking.openURL("tel:{phone}");
        }}
      >
        <View style={styles.cardView}>
          <Entypo name="phone" size={32} color="#67089e85" />
          <Text>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.cardstyle}>
        <View style={styles.cardView}>
          <MaterialIcons name="attach-money" size={32} color="#67089e85" />
          <Text>{salary}</Text>
        </View>
      </Card>

      <View style={styles.buttonStyle}>
        <Button
          icon="account-edit"
          mode="contained"
          color="#75069185"
          onPress={() =>
            props.navigation.navigate("Details", {
              _id,
              name,
              picture,
              phone,
              salary,
              email,
              position,
            })
          }
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          color="#75069185"
          onPress={() => deleteEmploye()}
        >
          Fire
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  imageStyle: {
    alignItems: "center",
    marginTop: -70,
  },
  description: {
    padding: 15,
    alignItems: "center",
    margin: 10,
  },
  cardstyle: {
    margin: 5,
    padding: 10,
  },
  cardView: {
    flexDirection: "row",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    paddingTop: 40,
  },
});
export default Profile;
