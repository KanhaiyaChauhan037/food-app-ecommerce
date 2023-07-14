import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  TableCaption,
} from "@chakra-ui/react";

const OrderSummary = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  return (
    <Box>
      <Box
        m="auto"
        w="50%"
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
        }
    
      >
        <Box bg="gray.300" padding={"5px"}>
          <Text>Shipping Information:</Text>
        </Box>
        <Table variant="striped" colorScheme="gray" size={"sm"}>
          <Text px={"5px"} fontSize={"14px"} fontWeight={"bold"}>
            Customer Details:
          </Text>
          <hr/>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Customer Name:</Td>
              <Td>{data.customerName}</Td>
            </Tr>
            <Tr>
              <Td>Customer Address:</Td>
              <Td>{data.customerAddress}</Td>
            </Tr>
            <Tr>
              <Td>Delivery Time:</Td>
              <Td>{data.deliveryTime}</Td>
            </Tr>
            <Tr>
              <Td>Customer Phone:</Td>
              <Td>{data.customerPhone}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Text
          px="5px"
          py={"5px"}
          mt="5px"
          mb="-1.5"
          fontSize={"14px"}
          fontWeight={"bold"}
        >
          Products:
        </Text>
        <hr/>
        <Table m="auto" variant="striped" size="sm" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>name</Th>
              {/* <Th>Description</Th> */}
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.dishes.map((dish, index) => (
              <Tr key={index}>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Image
                      w="55px"
                      h="55px"
                      src={dish.image}
                      alt="Dish imagenpm s"
                      mr={4}
                    />
                  </Box>
                </Td>
                <Td>
                  {" "}
                  <Text fontWeight="bold">{dish.dishName}</Text>
                  <Text fontSize={"12px"}>{dish.dishDescription}</Text>
                </Td>
                <Td>{dish.quantity}</Td>
                <Td>{dish.price}</Td>
              </Tr>
            ))}
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td w="25%">
                <Text>Tax:</Text>
                <Text>Shipping:</Text>
                <Text fontWeight="bold"> Total Price:</Text>
              </Td>
              <Td>
                <Text>₹0.0</Text>
                <Text>₹0.0</Text>
                <Text fontWeight="bold" color="tomato">
                  {`₹${data.total}`}{" "}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default OrderSummary;
