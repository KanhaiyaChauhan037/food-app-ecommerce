import React from 'react';
import { Box } from '@chakra-ui/react';
import AllRoutes from './components/AllRoutes';
import Navbar from './components/Navbar';

function App() {

  return (
    <Box>
      <Navbar/>
      <AllRoutes />
    </Box>
  );
}

export default App;
