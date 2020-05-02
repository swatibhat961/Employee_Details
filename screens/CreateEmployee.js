import React, { useState } from "react";
import { Text, StyleSheet, View, Modal, Alert } from "react-native";
import { Colors, TextInput, Button } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";

import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "salary":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "position":
          return route.params.position;
      }
    }
    return "";
  };

  const [name, setName] = useState(getDetails("name"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [position, setPosition] = useState(getDetails("position"));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    fetch("https://e8406632.ngrok.io/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        position,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Alert.alert(`${data.name} is saved successfuly`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("someting went wrong");
      });
  };

  const updateDetails = () => {
    fetch("https://e8406632.ngrok.io/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        email,
        phone,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is updated successfuly`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("someting went wrong");
      });
  };

  const pickFromGallary = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        handleUpload(newFile);
      }
    } else {
      Alert.alert("please give me a permission to acces the data from gallary");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        handleUpload(newFile);
      }
    } else {
      Alert.alert("please give me a permission to acces the data from gallary");
    }
  };
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "EmployeeApp");
    data.append("cloud_name", "swatibhat");

    fetch("https://api.cloudinary.com/v1_1/swatibhat/image/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("error while uploading");
      });
  };
  return (
    <View style={styles.mainView}>
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        mode="outlined"
        theme={theme}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Phone"
        mode="outlined"
        keyboardAppearance="dark"
        keyboardType="number-pad"
        theme={theme}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label="Salary"
        mode="outlined"
        keyboardAppearance="dark"
        keyboardType="numeric"
        theme={theme}
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />
      <TextInput
        label="Position"
        mode="outlined"
        theme={theme}
        value={position}
        onChangeText={(text) => setPosition(text)}
      />

      <View style={styles.buttonstyle}>
        <Button
          color="#67089e"
          icon={picture === "" ? "upload" : "check"}
          mode="contained"
          onPress={() => setModal(true)}
        >
          Upload
        </Button>
      </View>
      <View style={styles.buttonstyle}>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            color="#67089e"
            onPress={() => updateDetails()}
          >
            Update details
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            save
          </Button>
        )}
      </View>

      <Modal
        animationType="slide"
        visible={modal}
        transparent={true}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalstyle}>
          <View style={styles.modalbuttonstyle}>
            <Button
              icon="camera"
              mode="contained"
              color="#a10eeb"
              onPress={() => pickFromCamera()}
            >
              Cemera
            </Button>
            <Button
              icon="image-album"
              mode="contained"
              color="#a10eeb"
              onPress={() => pickFromGallary()}
            >
              Gallary
            </Button>
          </View>

          <Button icon="cancel" onPress={() => setModal(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  Colors: {
    accent: "#ff3443",
  },
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#999999",
  },
  buttonstyle: {
    margin: 6,
  },
  modalbuttonstyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  modalstyle: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "white",
  },
});
export default CreateEmployee;
