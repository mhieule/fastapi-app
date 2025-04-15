import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  Stack,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Spinner,
  useDisclosure,
  VStack,
  HStack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  List,
  ListItem,
  ListIcon,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExchangeAlt,
  FaArrowUp,
  FaRegSave,
  FaList,
  FaCheck,
} from "react-icons/fa";

// Define types for our component
type OptimizationCriteria = {
  points: boolean;
  xG: boolean;
  xA: boolean;
  xGA: boolean;
  cleanSheets: boolean;
  price: boolean;
  numTransfers: boolean;
};

type OptimizationStatus = "pending" | "in-progress" | "completed";

type Optimization = {
  id: string;
  criteria: OptimizationCriteria;
  status: OptimizationStatus;
  createdAt: Date;
  result?: OptimizationResult;
};

type OptimizationResult = {
  pointsIncrease: number;
  transfers: Array<{
    out: { name: string; team: string; position: string; price: number };
    in: { name: string; team: string; position: string; price: number };
  }>;
  teamValue: number;
  expectedPoints: number;
};

export const Route = createFileRoute("/_layout/optimized-team")({
  component: OptimizedTeam,
});

function OptimizedTeam() {
  // State for optimization criteria selection
  const [criteria, setCriteria] = useState<OptimizationCriteria>({
    points: true,
    xG: false,
    xA: false,
    xGA: false,
    cleanSheets: false,
    price: false,
    numTransfers: true,
  });

  // State for optimizations list
  const [optimizations, setOptimizations] = useState<Optimization[]>([]);

  // State for currently viewed optimization
  const [selectedOptimization, setSelectedOptimization] =
    useState<Optimization | null>(null);

  // State for animation when viewing optimization
  const [isAnimating, setIsAnimating] = useState(false);

  // Modal controls
  const {
    isOpen: isCriteriaModalOpen,
    onOpen: onCriteriaModalOpen,
    onClose: onCriteriaModalClose,
  } = useDisclosure();

  const {
    isOpen: isResultModalOpen,
    onOpen: onResultModalOpen,
    onClose: onResultModalClose,
  } = useDisclosure();

  // Handle criteria selection
  const handleCriteriaChange = (criteriaName: keyof OptimizationCriteria) => {
    setCriteria({
      ...criteria,
      [criteriaName]: !criteria[criteriaName],
    });
  };

  // Start a new optimization
  const startOptimization = () => {
    const newOptimization: Optimization = {
      id: `opt-${Date.now()}`,
      criteria,
      status: "pending",
      createdAt: new Date(),
    };

    setOptimizations([newOptimization, ...optimizations]);
    onCriteriaModalClose();

    // Simulate optimization process
    setTimeout(() => {
      setOptimizations((prevOptimizations) =>
        prevOptimizations.map((opt) =>
          opt.id === newOptimization.id
            ? { ...opt, status: "in-progress" }
            : opt
        )
      );

      // Simulate completion after some time
      setTimeout(() => {
        setOptimizations((prevOptimizations) =>
          prevOptimizations.map((opt) =>
            opt.id === newOptimization.id
              ? {
                  ...opt,
                  status: "completed",
                  result: {
                    pointsIncrease: 15,
                    transfers: [
                      {
                        out: {
                          name: "Son Heung-min",
                          team: "TOT",
                          position: "MID",
                          price: 10.2,
                        },
                        in: {
                          name: "Mo Salah",
                          team: "LIV",
                          position: "MID",
                          price: 12.5,
                        },
                      },
                      {
                        out: {
                          name: "Dominic Solanke",
                          team: "BOU",
                          position: "FWD",
                          price: 7.0,
                        },
                        in: {
                          name: "Erling Haaland",
                          team: "MCI",
                          position: "FWD",
                          price: 14.2,
                        },
                      },
                    ],
                    teamValue: 101.3,
                    expectedPoints: 109,
                  },
                }
              : opt
          )
        );
      }, 3000);
    }, 1000);
  };

  // View optimization details
  const viewOptimization = (optimization: Optimization) => {
    setSelectedOptimization(optimization);
    setIsAnimating(true);

    // Show results modal after animation
    setTimeout(
      () => {
        setIsAnimating(false);
        onResultModalOpen();
      },
      optimization.status === "completed" ? 1000 : 3000
    );
  };

  // Format criteria for display
  const formatCriteria = (criteria: OptimizationCriteria): string => {
    return Object.entries(criteria)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => key)
      .join(", ");
  };

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={8}>
        Optimized FPL Team
      </Heading>

      <Box mb={8}>
        <Text fontSize="lg" mb={4}>
          Our AI-powered FPL team optimization uses advanced algorithms to
          maximize points potential.
        </Text>

        <Image
          src="https://www.dexerto.com/cdn-image/wp-content/uploads/2024/03/14/Screenshot-2024-05-03-at-11.07.37-1003x1024.jpeg?width=1200&quality=75&format=auto"
          alt="Optimized FPL Team"
          borderRadius="lg"
          mx="auto"
          mb={8}
          maxH="400px"
        />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          mb={8}
          justify="center"
        >
          <Badge colorScheme="green" fontSize="lg" p={2} borderRadius="md">
            Expected Points: 109
          </Badge>
          <Button colorScheme="teal" size="md" onClick={onCriteriaModalOpen}>
            Auto-Optimize My Team
          </Button>
          <Button colorScheme="blue" size="md">
            Apply Suggestions
          </Button>
        </Stack>

        {/* Optimizations List */}
        {optimizations.length > 0 && (
          <Box mt={10}>
            <Heading size="md" mb={4}>
              Your Optimizations
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              {optimizations.map((optimization) => (
                <Card
                  key={optimization.id}
                  cursor="pointer"
                  onClick={() => viewOptimization(optimization)}
                  _hover={{
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s",
                  }}
                  borderColor={
                    optimization.status === "completed"
                      ? "green.300"
                      : "gray.300"
                  }
                  borderWidth={2}
                >
                  <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Heading size="sm">
                        Optimization #{optimization.id.split("-")[1]}
                      </Heading>
                      <Badge
                        colorScheme={
                          optimization.status === "completed"
                            ? "green"
                            : optimization.status === "in-progress"
                              ? "blue"
                              : "yellow"
                        }
                      >
                        {optimization.status}
                      </Badge>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text fontSize="sm" mb={2}>
                      <strong>Criteria:</strong>{" "}
                      {formatCriteria(optimization.criteria)}
                    </Text>
                    <Text fontSize="sm">
                      <strong>Created:</strong>{" "}
                      {optimization.createdAt.toLocaleString()}
                    </Text>
                    {optimization.status === "completed" && (
                      <Box mt={3}>
                        <Text color="green.500" fontWeight="bold">
                          +{optimization.result?.pointsIncrease} points
                        </Text>
                      </Box>
                    )}
                    {optimization.status === "in-progress" && (
                      <Progress
                        size="xs"
                        isIndeterminate
                        colorScheme="blue"
                        mt={3}
                      />
                    )}
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>

      {/* Criteria Selection Modal */}
      <Modal
        isOpen={isCriteriaModalOpen}
        onClose={onCriteriaModalClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Optimization Criteria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Select which factors should be considered during optimization:
            </Text>
            <VStack alignItems="flex-start" spacing={3}>
              <Checkbox
                isChecked={criteria.points}
                onChange={() => handleCriteriaChange("points")}
              >
                Expected Points
              </Checkbox>
              <Checkbox
                isChecked={criteria.xG}
                onChange={() => handleCriteriaChange("xG")}
              >
                Expected Goals (xG)
              </Checkbox>
              <Checkbox
                isChecked={criteria.xA}
                onChange={() => handleCriteriaChange("xA")}
              >
                Expected Assists (xA)
              </Checkbox>
              <Checkbox
                isChecked={criteria.xGA}
                onChange={() => handleCriteriaChange("xGA")}
              >
                Expected Goals Against (xGA)
              </Checkbox>
              <Checkbox
                isChecked={criteria.cleanSheets}
                onChange={() => handleCriteriaChange("cleanSheets")}
              >
                Clean Sheet Potential
              </Checkbox>
              <Checkbox
                isChecked={criteria.price}
                onChange={() => handleCriteriaChange("price")}
              >
                Price/Value
              </Checkbox>
              <Checkbox
                isChecked={criteria.numTransfers}
                onChange={() => handleCriteriaChange("numTransfers")}
              >
                Number of Transfers
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCriteriaModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={startOptimization}>
              Start Optimizing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Animation/Results Modal */}
      <Modal
        isOpen={isResultModalOpen}
        onClose={onResultModalClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedOptimization?.status === "completed"
              ? "Optimization Complete"
              : "Optimization in Progress"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isAnimating && (
              <Flex direction="column" align="center" justify="center" py={10}>
                <Spinner size="xl" color="blue.500" mb={5} />
                <Text>Running optimization analysis...</Text>
              </Flex>
            )}

            {!isAnimating &&
              selectedOptimization?.status === "completed" &&
              selectedOptimization.result && (
                <Box
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Stack spacing={6}>
                    {/* Summary Stats */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                      <Stat>
                        <StatLabel>Points Increase</StatLabel>
                        <StatNumber color="green.500">
                          +{selectedOptimization.result.pointsIncrease}
                        </StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          Over current team
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Transfers</StatLabel>
                        <StatNumber>
                          {selectedOptimization.result.transfers.length}
                        </StatNumber>
                        <StatHelpText>Suggested changes</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Team Value</StatLabel>
                        <StatNumber>
                          £{selectedOptimization.result.teamValue.toFixed(1)}m
                        </StatNumber>
                      </Stat>
                    </SimpleGrid>

                    <Divider />

                    {/* Transfers Table */}
                    <Box>
                      <Heading size="md" mb={4}>
                        Suggested Transfers
                      </Heading>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Out</Th>
                            <Th></Th>
                            <Th>In</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {selectedOptimization.result.transfers.map(
                            (transfer, idx) => (
                              <Tr key={idx}>
                                <Td>
                                  <VStack align="start" spacing={0}>
                                    <Text fontWeight="bold">
                                      {transfer.out.name}
                                    </Text>
                                    <HStack spacing={2}>
                                      <Tag size="sm">{transfer.out.team}</Tag>
                                      <Tag size="sm">
                                        {transfer.out.position}
                                      </Tag>
                                      <Text fontSize="xs">
                                        £{transfer.out.price.toFixed(1)}m
                                      </Text>
                                    </HStack>
                                  </VStack>
                                </Td>
                                <Td>
                                  <FaExchangeAlt />
                                </Td>
                                <Td>
                                  <VStack align="start" spacing={0}>
                                    <Text fontWeight="bold">
                                      {transfer.in.name}
                                    </Text>
                                    <HStack spacing={2}>
                                      <Tag size="sm" colorScheme="green">
                                        {transfer.in.team}
                                      </Tag>
                                      <Tag size="sm">
                                        {transfer.in.position}
                                      </Tag>
                                      <Text fontSize="xs">
                                        £{transfer.in.price.toFixed(1)}m
                                      </Text>
                                    </HStack>
                                  </VStack>
                                </Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </Box>

                    <Divider />

                    {/* Performance Insights */}
                    <Box>
                      <Heading size="md" mb={4}>
                        Performance Insights
                      </Heading>
                      <List spacing={3}>
                        <ListItem>
                          <ListIcon as={FaArrowUp} color="green.500" />
                          Expected points increase by{" "}
                          {selectedOptimization.result.pointsIncrease} over next
                          5 gameweeks
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Better fixture difficulty for key players
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Improved team balance and coverage
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Box>
              )}
          </ModalBody>
          <ModalFooter>
            {selectedOptimization?.status === "completed" && (
              <>
                <Button leftIcon={<FaRegSave />} variant="outline" mr={3}>
                  Save (Draft)
                </Button>
                <Button leftIcon={<FaList />} variant="outline" mr={3}>
                  Save (Transfer Planner)
                </Button>
                <Button leftIcon={<FaCheck />} colorScheme="green">
                  Apply Changes
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
