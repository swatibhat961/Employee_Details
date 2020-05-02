import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";
import Home from "./components/Home";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#67089e",
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={CreateEmployee}
          options={{
            title: "Details",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#67089e",
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#67089e",
            },
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c8c9",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
