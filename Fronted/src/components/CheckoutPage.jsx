import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartItems }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log("checkout", cartItems);

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const dishIds = cartItems.map((item) => item._id);
  const prices = cartItems.map((item) => item.price);
  console.log("dishIds", dishIds);
  console.log("prices", prices);

  const total = Math.ceil(
    cartItems.reduce((acc, item, index) => acc + item.price * item.count, 0)
  );
  console.log("total", total);

  const handleOrder = async () => {
    const orderData = {
      dishes: cartItems.map((item) => ({
        dishId: item._id,
        quantity: item.count,
      })),
      total: total,
      deliveryTime: "45 min",
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
    };

    try {
      const res = await axios.post(
        "https://food-app-onfj.onrender.com/order",
        orderData
      );
      const data = res.data;
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      await axios.delete("https://food-app-onfj.onrender.com/cart");
      toast({
        title: "Order placed",
        description: "Your order has been placed successfully.",
        position:"top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Button bg="tomato" color="white" _hover={{"bg":"red"}} onClick={onOpen}>
          Order Now
        </Button>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                placeholder="Name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOrder} bg="tomato" mr={3}>
              Order Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckoutPage;
