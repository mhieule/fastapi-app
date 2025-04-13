import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Stack,
  HStack,
  VStack,
  Divider,
  Badge,
  Avatar,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { BiTransfer } from "react-icons/bi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const Route = createFileRoute("/_layout/transfer-planner")({
  component: TransferPlanner,
});

function TransferPlanner() {
  // Mock data for transfer suggestions
  const transfersOut = [
    {
      id: 1,
      name: "Kane",
      club: "Bayern",
      price: 13.2,
      points: 45,
      trend: "down",
    },
    {
      id: 2,
      name: "Cresswell",
      club: "West Ham",
      price: 5.5,
      points: 12,
      trend: "down",
    },
    {
      id: 3,
      name: "Gakpo",
      club: "Liverpool",
      price: 7.8,
      points: 18,
      trend: "down",
    },
  ];

  const transfersIn = [
    {
      id: 1,
      name: "Haaland",
      club: "Man City",
      price: 14.5,
      points: 68,
      trend: "up",
    },
    {
      id: 2,
      name: "Saliba",
      club: "Arsenal",
      price: 5.8,
      points: 42,
      trend: "up",
    },
    {
      id: 3,
      name: "Salah",
      club: "Liverpool",
      price: 12.8,
      points: 55,
      trend: "up",
    },
  ];

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={8}>
        FPL Transfer Planner
      </Heading>

      <Box mb={8}>
        <Text fontSize="lg" mb={4}>
          Optimize your team with strategic transfers based on form, fixtures,
          and value.
        </Text>

        <Image
          src="https://preview.redd.it/top-transfer-out-kane-240k-top-transfer-in-haaland-260k-who-v0-16jezamndcg91.png?width=640&crop=smart&auto=webp&s=75fb1730088c3cc38fb3d9b38042033d1cfe6bcf"
          alt="Transfer Trends"
          borderRadius="lg"
          mx="auto"
          mb={8}
          maxH="400px"
        />
      </Box>

      <HStack
        align="flex-start"
        spacing={10}
        mb={8}
        wrap={{ base: "wrap", md: "nowrap" }}
      >
        <VStack
          flex="1"
          align="stretch"
          spacing={4}
          minW={{ base: "100%", md: "45%" }}
        >
          <Heading size="md" color="red.500" mb={2}>
            Suggested Transfers Out
          </Heading>
          <Box borderWidth={1} borderRadius="lg" overflow="hidden">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Player</Th>
                  <Th>Club</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Points</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfersOut.map((player) => (
                  <Tr key={player.id}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={player.name} />
                        <Text>{player.name}</Text>
                      </HStack>
                    </Td>
                    <Td>{player.club}</Td>
                    <Td isNumeric>£{player.price}m</Td>
                    <Td isNumeric>{player.points}</Td>
                    <Td>
                      <FaArrowDown color="red" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>

        <Box display={{ base: "none", md: "block" }}>
          <BiTransfer size={40} />
        </Box>
        <Divider display={{ base: "block", md: "none" }} my={4} />

        <VStack
          flex="1"
          align="stretch"
          spacing={4}
          minW={{ base: "100%", md: "45%" }}
        >
          <Heading size="md" color="green.500" mb={2}>
            Suggested Transfers In
          </Heading>
          <Box borderWidth={1} borderRadius="lg" overflow="hidden">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Player</Th>
                  <Th>Club</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Points</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfersIn.map((player) => (
                  <Tr key={player.id}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={player.name} />
                        <Text>{player.name}</Text>
                      </HStack>
                    </Td>
                    <Td>{player.club}</Td>
                    <Td isNumeric>£{player.price}m</Td>
                    <Td isNumeric>{player.points}</Td>
                    <Td>
                      <FaArrowUp color="green" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </HStack>

      <Flex justify="center" mt={8}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Button colorScheme="teal" leftIcon={<BiTransfer />} size="lg">
            Make Transfers
          </Button>
          <Button colorScheme="blue" size="lg">
            Analyze Wildcard Options
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
