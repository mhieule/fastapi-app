import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  Image,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";
import { BiSearchAlt } from "react-icons/bi";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { ImStarHalf } from "react-icons/im";
import FeedImage from "/assets/images/feed.png";
import { PlayerCard } from "../../components/FPLTeam/TeamFormation";
import { dashboardPlayers } from "../../data/mockTeamData";
import { useState } from "react";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();
  const cardImageHeight = 200; // Define height variable
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter players based on search query
  const filteredPlayers = dashboardPlayers.filter(
    (player) =>
      searchQuery === "" ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigation handlers
  const navigateToTeamOfTheWeek = () => {
    router.navigate({ to: "/team-of-the-week" });
  };

  const navigateToOptimizedTeam = () => {
    router.navigate({ to: "/optimized-team" });
  };

  const navigateToTransferPlanner = () => {
    router.navigate({ to: "/transfer-planner" });
  };

  const navigateToFeed = () => {
    router.navigate({ to: "/feed" });
  };

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        <SimpleGrid spacing={5} minChildWidth={250}>
          <Card
            borderRadius={15}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
            onClick={navigateToTeamOfTheWeek}
          >
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center">
                <ImStarHalf size={35} style={{ marginRight: "10px" }} /> FPL
                Team of the Week
              </Heading>
            </CardHeader>
            <CardBody>
              <Image
                objectFit="cover"
                src="https://i.redd.it/d3q4lq38bvyb1.jpg"
                alt="Chakra UI"
                width={500}
                height={cardImageHeight}
              />
            </CardBody>
          </Card>

          <Card
            borderRadius={15}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
            onClick={navigateToOptimizedTeam}
          >
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center">
                <GiProcessor size={35} style={{ marginRight: "10px" }} />
                Optimized FPL Team
              </Heading>
            </CardHeader>
            <CardBody>
              <Image
                objectFit="cover"
                src="https://www.dexerto.com/cdn-image/wp-content/uploads/2024/03/14/Screenshot-2024-05-03-at-11.07.37-1003x1024.jpeg?width=1200&quality=75&format=auto"
                alt="Chakra UI"
                width={500}
                height={cardImageHeight}
              />
            </CardBody>
          </Card>

          <Card
            borderRadius={15}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
            onClick={navigateToTransferPlanner}
          >
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center">
                <MdSwapHorizontalCircle
                  size={35}
                  style={{ marginRight: "10px" }}
                />
                Transfer Planner
              </Heading>
            </CardHeader>
            <CardBody>
              <Image
                objectFit="cover"
                src="https://preview.redd.it/top-transfer-out-kane-240k-top-transfer-in-haaland-260k-who-v0-16jezamndcg91.png?width=640&crop=smart&auto=webp&s=75fb1730088c3cc38fb3d9b38042033d1cfe6bcf"
                alt="Chakra UI"
                width={500}
                height={cardImageHeight}
              />
            </CardBody>
          </Card>

          <Card
            borderRadius={15}
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
            onClick={navigateToFeed}
          >
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center">
                <MdSwapHorizontalCircle
                  size={35}
                  style={{ marginRight: "10px" }}
                />
                Feed
              </Heading>
            </CardHeader>
            <CardBody>
              <Image
                objectFit="cover"
                src={FeedImage}
                width={500}
                height={cardImageHeight}
              />
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* New Player List Section */}
        <Box m={20}>
          {/* Search Bar */}
          <Box maxW="400px" mx="auto" mb={5}>
            <InputGroup size="md">
              <Input
                placeholder="Search for player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius="full"
                borderWidth={1}
                borderColor="gray.300"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search"
                  icon={<BiSearchAlt />}
                  variant="ghost"
                  colorScheme="teal"
                  borderRadius="full"
                />
              </InputRightElement>
            </InputGroup>
          </Box>

          {/* Sorting Buttons - Centered */}
          <HStack spacing={4} mb={5} wrap="wrap" justify="center">
            {/* TODO: Add state and onClick handlers for sorting */}
            <Button variant="solid" colorScheme="teal" isActive>
              Popular
            </Button>
            <Button variant="outline">Top Point</Button>
            <Button variant="outline">Top Goal</Button>
            <Button variant="outline">Top Assist</Button>
            <Button variant="outline">Cheapest</Button>
            {/* Removed extra buttons to match requirement */}
          </HStack>

          {/* Player Grid using Flex wrap */}
          <Flex wrap="wrap" justify="center">
            {filteredPlayers.map((player) => (
              <Box key={player.id} m={2}>
                <PlayerCard player={player} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>
    </>
  );
}
