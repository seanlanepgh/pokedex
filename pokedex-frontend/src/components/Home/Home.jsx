import React from "react";
//style imports
import { Box } from "@chakra-ui/react";
//component imports
import Navbar from "../Navbar/Navbar";

/** The home compoment that tells you to register for a pokedex */
const Home = ({ match }) => (
  <div>
    <Navbar />
    <Box bg="bg" minHeight="95vh" textAlign="center">
      <Box bg="cyan" color="white" fontSize="50px" pt="100px">
        Register to have your very own pokedex!
      </Box>
    </Box>
  </div>
);

export default Home;