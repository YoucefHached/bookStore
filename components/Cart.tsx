import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const toggleCart = () => {
    if (open) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
        setShowForm(false);
      });
    } else {
      setOpen(true);
      Animated.timing(heightAnim, {
        toValue: 400,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleClearCart = () => {
    clearCart();
    setShowForm(false);
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setOpen(false));
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    if (cartItems.length <= 1) {
      setShowForm(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter your name.");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Validation", "Please enter your address.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Validation", "Please enter your phone number.");
      return;
    }

    clearCart();

    setName("");
    setAddress("");
    setPhone("");

    Alert.alert("Order placed successfully!", "", [
      {
        text: "OK",
        onPress: () => {
          Animated.timing(heightAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(() => setOpen(false));
          setShowForm(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartIcon} onPress={toggleCart}>
        <Ionicons name="cart" size={24} color="black" />
        {cartItems.length > 0 && (
          <View style={styles.cartItemCount}>
            <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {open && (
        <Modal
          transparent={true}
          animationType="none"
          onRequestClose={toggleCart}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={toggleCart}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[styles.cartContainer, { height: heightAnim }]}
              >
                <ScrollView contentContainerStyle={styles.cartContent}>
                  {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>
                      Your cart is empty.
                    </Text>
                  ) : (
                    cartItems.map((item) => (
                      <View key={item.id} style={styles.cartItem}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>
                          ${item.price.toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          style={styles.removeFromCartButton}
                          onPress={() => handleRemoveFromCart(item)}
                        >
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  )}
                  {cartItems.length > 0 && (
                    <View style={styles.cartButtons}>
                      <TouchableOpacity
                        style={styles.clearCartButton}
                        onPress={handleClearCart}
                      >
                        <Text style={styles.buttonText}>Clear Cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => setShowForm(true)}
                      >
                        <Text style={styles.buttonText}>Checkout</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {showForm && (
                    <View style={styles.formContainer}>
                      <Text style={styles.formTitle}>Order Form</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor="#888"
                        value={address}
                        onChangeText={setAddress}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor="#888"
                        value={phone}
                        onChangeText={setPhone}
                      />
                      <Button title="Place Order" onPress={handlePlaceOrder} />
                    </View>
                  )}
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  cartIcon: {
    backgroundColor: "#E9ECEF",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  cartItemCount: {
    backgroundColor: "#DC3545",
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  cartItemCountText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cartContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  cartContent: {
    padding: 15,
  },
  emptyCartText: {
    textAlign: "center",
    color: "#6C757D",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemTitle: {
    flex: 1,
  },
  itemPrice: {
    marginRight: 10,
  },
  removeFromCartButton: {
    backgroundColor: "#DC3545",
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: "#FFF",
  },
  cartButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearCartButton: {
    backgroundColor: "#0158CC",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  checkoutButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#CED4DA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Cart;
