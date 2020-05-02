import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";
// import { useSelector, useDispatch } from "react-redux";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const fetchData = () => {
    fetch("https://e8406632.ngrok.io")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("someting  wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        key={item.id}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardview}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
            source={{ uri: item.picture }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item.id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <FAB
        onPress={() => navigation.navigate("Details")}
        style={styles.fab}
        small={false}
        icon="plus-circle-outline"
        loading={false}
        color="#a10eeb"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    marginBottom: 10,
  },
  cardview: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
