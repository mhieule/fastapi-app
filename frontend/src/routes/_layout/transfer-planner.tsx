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
  useColorModeValue,
  Icon,
  Input,
  useToast,
  CloseButton,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { BiTransfer } from "react-icons/bi";
import { FaArrowUp, FaArrowDown, FaEdit, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

export const Route = createFileRoute("/_layout/transfer-planner")({
  component: TransferPlanner,
});

// Define types
interface Player {
  id: number;
  name: string;
  club: string;
  price: number;
  points: number;
  trend: string;
}

interface TransferPlan {
  id: number;
  name: string;
  teamPrice: string;
  transfersMade: number;
  expectedPoints: number;
}

function TransferPlanner() {
  // Mock data for transfer suggestions
  const transfersOut: Player[] = [
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

  const transfersIn: Player[] = [
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

  // State for transfer plans
  const [transferPlans, setTransferPlans] = useState<TransferPlan[]>([]);
  const [draftName, setDraftName] = useState("My Draft");
  const toast = useToast();

  // Color mode values for consistent theming
  const headerBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const oddRowBg = useColorModeValue("gray.50", "gray.800");
  const hoverBg = useColorModeValue("blue.50", "blue.900");
  const cardBg = useColorModeValue("white", "gray.700");

  // Function to add a new transfer plan
  const addTransferPlan = () => {
    // Calculate new team price (original + transfers in - transfers out)
    const originalTeamPrice = 100.0; // Example starting budget
    const outPrice = transfersOut.reduce(
      (sum, player) => sum + player.price,
      0
    );
    const inPrice = transfersIn.reduce((sum, player) => sum + player.price, 0);
    const newTeamPrice = originalTeamPrice - outPrice + inPrice;

    // Calculate expected points (simple example calculation)
    const expectedPoints = Math.floor(
      transfersIn.reduce((sum, player) => sum + player.points, 0) * 0.7
    );

    const newPlan: TransferPlan = {
      id: Date.now(),
      name: draftName,
      teamPrice: newTeamPrice.toFixed(1),
      transfersMade: transfersIn.length,
      expectedPoints: expectedPoints,
    };

    setTransferPlans([...transferPlans, newPlan]);

    toast({
      title: "Transfer plan added",
      description: `${draftName} has been added to your plans.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  // Function to remove a transfer plan
  const removeTransferPlan = (id: number) => {
    setTransferPlans(transferPlans.filter((plan) => plan.id !== id));

    toast({
      title: "Transfer plan removed",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

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
          <Box
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th bg={headerBg} py={4}>
                    Player
                  </Th>
                  <Th bg={headerBg} py={4}>
                    Club
                  </Th>
                  <Th bg={headerBg} py={4} isNumeric>
                    Price
                  </Th>
                  <Th bg={headerBg} py={4} isNumeric>
                    Points
                  </Th>
                  <Th bg={headerBg} py={4} width="60px"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfersOut.map((player, index) => (
                  <Tr
                    key={player.id}
                    bg={index % 2 === 1 ? oddRowBg : "transparent"}
                    _hover={{
                      bg: hoverBg,
                      transition: "background-color 0.2s",
                    }}
                    cursor="pointer"
                  >
                    <Td py={3}>
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={player.name}
                          src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.id}.png`}
                          bg="gray.200"
                          border="1px solid"
                          borderColor="gray.300"
                        />
                        <Text fontWeight="medium">{player.name}</Text>
                      </HStack>
                    </Td>
                    <Td py={3}>
                      <Badge colorScheme="gray" px={2} py={1} borderRadius="md">
                        {player.club}
                      </Badge>
                    </Td>
                    <Td py={3} isNumeric fontWeight="medium">
                      £{player.price}m
                    </Td>
                    <Td py={3} isNumeric>
                      {player.points}
                    </Td>
                    <Td py={3}>
                      <Flex justifyContent="center">
                        <Icon
                          as={FaArrowDown}
                          color="red.500"
                          bg="red.100"
                          p={1.5}
                          boxSize={7}
                          borderRadius="full"
                          aria-label="Trending down"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>

        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Icon as={BiTransfer} boxSize={10} color="gray.400" />
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
          <Box
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th bg={headerBg} py={4}>
                    Player
                  </Th>
                  <Th bg={headerBg} py={4}>
                    Club
                  </Th>
                  <Th bg={headerBg} py={4} isNumeric>
                    Price
                  </Th>
                  <Th bg={headerBg} py={4} isNumeric>
                    Points
                  </Th>
                  <Th bg={headerBg} py={4} width="60px"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfersIn.map((player, index) => (
                  <Tr
                    key={player.id}
                    bg={index % 2 === 1 ? oddRowBg : "transparent"}
                    _hover={{
                      bg: hoverBg,
                      transition: "background-color 0.2s",
                    }}
                    cursor="pointer"
                  >
                    <Td py={3}>
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={player.name}
                          src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.id}.png`}
                          bg="gray.200"
                          border="1px solid"
                          borderColor="gray.300"
                        />
                        <Text fontWeight="medium">{player.name}</Text>
                      </HStack>
                    </Td>
                    <Td py={3}>
                      <Badge colorScheme="gray" px={2} py={1} borderRadius="md">
                        {player.club}
                      </Badge>
                    </Td>
                    <Td py={3} isNumeric fontWeight="medium">
                      £{player.price}m
                    </Td>
                    <Td py={3} isNumeric>
                      {player.points}
                    </Td>
                    <Td py={3}>
                      <Flex justifyContent="center">
                        <Icon
                          as={FaArrowUp}
                          color="green.500"
                          bg="green.100"
                          p={1.5}
                          boxSize={7}
                          borderRadius="full"
                          aria-label="Trending up"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </HStack>

      <Box
        mt={8}
        mb={10}
        p={6}
        borderRadius="lg"
        bg={useColorModeValue("gray.800", "gray.800")}
        boxShadow="md"
        borderWidth={1}
        borderColor="gray.700"
      >
        <Heading size="md" mb={6} textAlign="center" color="white">
          Create Your Transfer Plan
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          wrap="wrap"
          gap={5}
        >
          <Box>
            <InputGroup size="lg" w={{ base: "100%", md: "300px" }}>
              <InputLeftElement pointerEvents="none" h="50px">
                <Icon as={FaPencilAlt} color="teal.300" />
              </InputLeftElement>
              <Input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="My Draft"
                borderColor="gray.600"
                _hover={{ borderColor: "gray.500" }}
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
                }}
                fontWeight="medium"
                color="white"
                h="50px"
                bg="gray.700"
              />
            </InputGroup>
          </Box>

          <Button
            colorScheme="teal"
            leftIcon={<BiTransfer />}
            size="lg"
            onClick={addTransferPlan}
            minW="180px"
            h="50px"
            bg="teal.400"
            _hover={{ bg: "teal.500" }}
          >
            Make Transfers
          </Button>

          <Button
            colorScheme="blue"
            size="lg"
            minW="180px"
            h="50px"
            bg="blue.400"
            _hover={{ bg: "blue.500" }}
          >
            Analyze Wildcard Options
          </Button>
        </Flex>
      </Box>

      {/* Transfer Plans List */}
      {transferPlans.length > 0 && (
        <Box mt={8} mb={10}>
          <Heading size="md" mb={4}>
            Your Transfer Plans
          </Heading>
          <Divider mb={6} />

          <VStack spacing={4} align="stretch">
            {transferPlans.map((plan) => (
              <Box
                key={plan.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                borderColor={borderColor}
                bg={cardBg}
                boxShadow="sm"
                position="relative"
              >
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => removeTransferPlan(plan.id)}
                  aria-label="Remove transfer plan"
                />

                <Heading size="sm" mb={3}>
                  {plan.name}
                </Heading>

                <Flex
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  wrap="wrap"
                  gap={4}
                >
                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Team Value
                    </Text>
                    <Text fontWeight="bold">£{plan.teamPrice}m</Text>
                  </Box>

                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Transfers Made
                    </Text>
                    <Text fontWeight="bold">{plan.transfersMade}</Text>
                  </Box>

                  <Box>
                    <Text color="gray.500" fontSize="sm">
                      Expected Points
                    </Text>
                    <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                      {plan.expectedPoints} pts
                    </Badge>
                  </Box>

                  <Box>
                    <Button size="sm" colorScheme="blue" variant="outline">
                      View Details
                    </Button>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Container>
  );
}
