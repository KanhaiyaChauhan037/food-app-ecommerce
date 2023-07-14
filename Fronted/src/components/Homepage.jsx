import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Image, Spinner, Text, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://food-app-onfj.onrender.com/menu");
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

  return (
    <Box>
      <Heading mb="20px" textAlign={"center"}>
        Food App
      </Heading>

      {loading ? (
        <Box textAlign={"center"}>
        <Spinner  mt="15%" textAlign={"center"} size="xl" />
     <Text> Loading.....</Text>  </Box>
      ) : (
        <Box
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
          }
          w="90%"
          padding={"20px"}
          m="auto"
        >
          <Grid templateColumns="repeat(4, 1fr)" gap={10} >
            {data.map((item) => (
              <Link to={`/view/${item._id}`}>
                {" "}
                <Box
                  key={item.id}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
                  }
                  padding="10px"
                  textAlign={"center"}
                  overflow={"hidden"}
                  h="300px"
                  
                >
                  <Box overflow={"hidden"}>
                    <Image
                      h="200px"
                      m="auto"
                      transition="0.3s"
                      _hover={{ transform: "scale(1.1)" }}
                      bg={"white"}
                      src={item.image}
                      alt="images"
                    />
                  </Box>

                  <Heading mt="4px" overflow={"hidden"} fontSize={"20px"}>
                    {item.name}
                  </Heading>
                  {/* <Text>{item.description}</Text> */}
                  <Heading  size="sm" mt="10px" color={"tomato"}>{`₹${item.price}`}</Heading>
                </Box>
              </Link>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Homepage;
