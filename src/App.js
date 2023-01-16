import { Box, Flex, Heading } from '@chakra-ui/react';
import './App.css';
import { Schedule } from './Table';

function App() {
  return (
    <Flex bg={"#"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(140vh)'>
      <Heading>Week Travel Cronogram</Heading>
      <Box p={5}></Box>
      <Schedule></Schedule>
    </Flex>
  )
}

export default App;