import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Text,
  Heading,
  Image,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import CheckoutPage from "./CheckoutPage";

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://food-app-onfj.onrender.com/cart");
        const cartData = res.data.map((item) => ({
          ...item,
          count: 1,
        }));
        setCartItems(cartData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const increaseCount = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`https://food-app-onfj.onrender.com/cart/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      toast({
        title: "Item deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    return Math.ceil(cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0)
    );
  };

  return (
    <Box>
      {loading ? (
        <Box textAlign={"center"}>
          <Spinner  mt="15%" textAlign="center" size="xl" />
          <Text>Loading.....</Text>
        </Box>
      ) : (
          <Box>
         
          {cartItems.length > 0 ? (
            <Box w="90%" m="auto">
              <Table variant="striped">
                <Thead>
                  <Tr bg="tomato">
                    <Th color="white">Image</Th>
                    <Th color="white">Name</Th>
                    <Th color="white">Description</Th>
                    <Th color="white">Price</Th>
                    <Th color="white">Quantity</Th>
                    <Th color="white">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr
                      key={item._id}
                      padding="5px"
                      _hover={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                      mt="5px"

                      // border="5px solid red"
                    >
                      <Td>
                        <Image
                          w="100px"
                          h="100px"
                          m="auto"
                          transition="0.3s"
                          _hover={{ transform: "scale(1.1)" }}
                          bg="white"
                          src={item.image}
                          alt="images"
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.description}</Td>
                      <Td>{`₹${item.price}`}</Td>
                      <Td>
                        <Flex gap="5px" alignItems={"center"}>
                          <Button
                            bg="none"
                            size="sm"
                            _hover={{ bg: "green" }}
                            onClick={() => increaseCount(item._id)}
                          >
                            <AddIcon />
                          </Button>
                          <Text fontSize={"19px"}>{item.count}</Text>
                          <Button bg="none" size="sm" _hover={{ bg: "tomato" }}>
                            {" "}
                            <button
                              onClick={() => decreaseCount(item._id)}
                              disabled={item.count === 1}
                            >
                              <MinusIcon />
                            </button>
                          </Button>
                        </Flex>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => deleteItem(item._id)}
                          colorScheme="red"
                          ml={2}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex justifyContent="flex-end" alignItems="center" mt={4}>
                <Text fontSize="lg" fontWeight="bold" mr={2}>
                  Total Price:
                </Text>
                <Text mr="20px" fontSize="xl" color="tomato" fontWeight="bold">
                  ₹{calculateTotalPrice()}
                </Text>
              </Flex>
              <CheckoutPage cartItems={cartItems} />
            </Box>
          ) : (
            <Box m="auto" w="35%">
              <Image
                src="https://professionalscareer.com/assets/images/emptycart.png"
                alt="img cart"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Cartpage;
