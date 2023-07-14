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
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Singlepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://food-app-onfj.onrender.com/menu/${_id}`
        );
        const d = res.data;
        setData(d);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  const addToCart = async () => {
    try {
      const res = await axios.post("https://food-app-onfj.onrender.com/cart", {
        id: data._id,
        image: data.image,
        name: data.name,
        price: data.price,
        description: data.description,
      });
      console.log(res.data);
      toast({
        title: "Item added in the cart",
        position: "top",
        description: "Go to Cart page",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {loading ? (
        <Spinner ml="45%" mt="18%" textAlign="center" size="xl" />
      ) : (
        <Box border="2px dotted tomato" padding="20px" m="auto">
          <Flex
            m="auto"
         
            boxShadow={
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
            }
            w="70%"
            key={data._id}
            padding="10px"
            overflow="hidden"
            gap="30px"
          >
            <Box overflow="hidden">
              <Image
                w="400px"
                h="400px"
                m="auto"
                transition="0.3s"
                _hover={{ transform: "scale(1.1)" }}
                bg="white"
                src={data.image}
                alt="images"
              />
            </Box>
            <Box lineHeight="1" padding="20px">
              <Heading overflow="hidden" size="lg">
                {data.name}
              </Heading>
              <br />
              <Text w="400px">{data.description}</Text>
              <Heading
                mt="10px"
                size="sm"
                color="tomato"
              >{`₹${data.price}`}</Heading>
              <Button
                bg={"tomato"}
                color="white"
                mt="20px"
                ml="10rem"
                _hover={{ bg: "red", color: "white" }}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Singlepage;
