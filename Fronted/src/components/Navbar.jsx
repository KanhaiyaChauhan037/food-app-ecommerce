import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
const Navbar = () => {
  return (
    <Box mb="30px" bg="tomato">
      <Flex
        justifyContent={"space-between"}
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;"
        }
        alignItems={"center"}
        padding="10px"
      >
        <Box>
          <Link to="/">
            {" "}
            <Image w="100px" borderRadius={"5px"} src={logo} />{" "}
          </Link>
        </Box>
        <Flex color="white" fontWeight={"400"} gap="50px" mr="20px">
          <Text
            transition={"0.1s"}
            _hover={{ color: "black", fontWeight: "bold" }}
          >
            <Link to="/">Home</Link>
          </Text>
          <Text
            transition={"0.1s"}
            _hover={{ color: "black"}}
          >
            {" "}
            <Link to="/order">Order Summary</Link>
          </Text>
          <Text
            transition={"0.1s"}
            _hover={{ color: "black", fontWeight: "bold" }}
          >
            <Link to="/cart">Cart</Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
