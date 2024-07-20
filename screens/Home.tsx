import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to our bookstore</Text>
      <Text style={styles.subtitle}>
        Find your next favorite book here and enjoy reading!
      </Text>
      <Image
        source={require("../assets/books.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Books")}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2E86C1",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    textAlign: "left",
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 28,
  },
  image: {
    width: 250,
    height: 350,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#007BFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
