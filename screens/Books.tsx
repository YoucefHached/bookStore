import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Cart from "../components/Cart";
import booksData from "../Data/books";
import images from "../Data/imageMapper";
import { useCart } from "../contexts/CartContext";

const BooksScreen = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const renderItem = ({ item }) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

    return (
      <View style={styles.bookContainer}>
        <Image source={images[item.image]} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.button, isInCart && styles.removeFromCartButton]}
          onPress={() => (isInCart ? removeFromCart(item) : addToCart(item))}
        >
          <Text style={styles.buttonText}>
            {isInCart ? "Remove from cart" : "Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Cart />
      <Text style={styles.title}>Books</Text>
      <Text style={styles.subtitle}>
        Pick a book from our collection and add it to your cart.
      </Text>
      <FlatList
        data={booksData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.booksList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  booksList: {
    paddingBottom: 20,
  },
  bookContainer: {
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  bookPrice: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  removeFromCartButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BooksScreen;
