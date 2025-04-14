import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  CardHeader,
  Divider,
  VStack,
  HStack,
  Badge,
  Progress,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";
import { teamOfTheWeekData } from "../../data/mockTeamData";
import {
  FaFutbol,
  FaHandsHelping,
  FaShieldAlt,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { IoMdFootball } from "react-icons/io";

export const Route = createFileRoute("/_layout/team-of-the-week")({
  component: TeamOfTheWeek,
});

function TeamOfTheWeek() {
  // Get top performers from the team of the week
  const topScorer = [...teamOfTheWeekData].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  )[0];
  const mostGoals = [...teamOfTheWeekData].sort(
    (a, b) => b.totalGoals - a.totalGoals
  )[0];
  const mostAssists = [...teamOfTheWeekData].sort(
    (a, b) => b.totalAssists - a.totalAssists
  )[0];
  const bestForm = [...teamOfTheWeekData].sort((a, b) => b.form - a.form)[0];

  // Team stats
  const totalPoints = teamOfTheWeekData.reduce(
    (sum, player) => sum + (player.points || 0),
    0
  );
  const totalGoals = teamOfTheWeekData.reduce(
    (sum, player) => sum + player.totalGoals,
    0
  );
  const totalAssists = teamOfTheWeekData.reduce(
    (sum, player) => sum + player.totalAssists,
    0
  );

  // Get clubs with multiple players in team of the week
  const clubCounts: Record<string, number> = teamOfTheWeekData.reduce(
    (counts, player) => {
      counts[player.club] = (counts[player.club] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>
  );

  const topClub = Object.entries(clubCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 1)[0];

  // Find highest point contribution by position
  const pointsByPosition = teamOfTheWeekData.reduce(
    (acc, player) => {
      const position = player.position;
      acc[position] = (acc[position] || 0) + (player.points || 0);
      return acc;
    },
    {} as Record<string, number>
  );

  const positions = ["GK", "DEF", "MID", "FWD"];
  const highestScoringPosition = positions.reduce(
    (highest, pos) =>
      (pointsByPosition[pos] || 0) > (pointsByPosition[highest] || 0)
        ? pos
        : highest,
    positions[0]
  );

  // Calculate average points per player
  const averagePoints = totalPoints / teamOfTheWeekData.length;

  // Get all represented clubs
  const allClubs = [...new Set(teamOfTheWeekData.map((player) => player.club))];

  return (
    <Container maxW="100%" py={8}>
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} mb={6}>
        FPL Team of the Week Dashboard
      </Heading>

      {/* Top stats cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
        <Card overflow="hidden">
          <CardBody p={0}>
            <Box bg="blue.500" p={3}>
              <HStack spacing={3}>
                <Icon as={FaTrophy} color="white" boxSize={5} />
                <Heading size="sm" color="white">
                  Total Team Points
                </Heading>
              </HStack>
            </Box>
            <Box p={4}>
              <Text fontSize="3xl" fontWeight="bold" mb={2}>
                {totalPoints}
              </Text>
              <HStack justifyContent="space-between" mb={1}>
                <Text fontSize="sm">Avg per player:</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {averagePoints.toFixed(1)}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="sm">Top position:</Text>
                <Badge
                  colorScheme={
                    highestScoringPosition === "GK"
                      ? "purple"
                      : highestScoringPosition === "DEF"
                        ? "blue"
                        : highestScoringPosition === "MID"
                          ? "green"
                          : "red"
                  }
                >
                  {highestScoringPosition} (
                  {pointsByPosition[highestScoringPosition] || 0}pts)
                </Badge>
              </HStack>
            </Box>
          </CardBody>
        </Card>

        <Card overflow="hidden">
          <CardBody p={0}>
            <Box bg="green.500" p={3}>
              <HStack spacing={3}>
                <Icon as={FaFutbol} color="white" boxSize={5} />
                <Heading size="sm" color="white">
                  Total Goals
                </Heading>
              </HStack>
            </Box>
            <Box p={4}>
              <Flex>
                {/* Left side - Number in container */}
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  borderRadius="lg"
                  bg="green.50"
                  p={3}
                  mr={4}
                  h="100%"
                  minW="100px"
                >
                  <Text fontSize="3xl" fontWeight="bold" color="green.500">
                    {totalGoals}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    GOALS
                  </Text>
                </Flex>

                {/* Right side - Goals per position */}
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Goals per position:
                  </Text>
                  {["DEF", "MID", "FWD"].map((pos) => {
                    const posGoals = teamOfTheWeekData
                      .filter((p) => p.position === pos)
                      .reduce((sum, p) => sum + p.totalGoals, 0);
                    const maxGoals = Math.max(
                      ...["DEF", "MID", "FWD"].map((p) =>
                        teamOfTheWeekData
                          .filter((player) => player.position === p)
                          .reduce((sum, player) => sum + player.totalGoals, 0)
                      )
                    );
                    return (
                      <Box key={pos} mb={1}>
                        <HStack justifyContent="space-between" mb={0.5}>
                          <Badge
                            colorScheme={
                              pos === "DEF"
                                ? "blue"
                                : pos === "MID"
                                  ? "green"
                                  : "red"
                            }
                          >
                            {pos}
                          </Badge>
                          <Text fontSize="sm" fontWeight="bold">
                            {posGoals}
                          </Text>
                        </HStack>
                        <Progress
                          value={(posGoals / maxGoals) * 100}
                          colorScheme={
                            pos === "DEF"
                              ? "blue"
                              : pos === "MID"
                                ? "green"
                                : "red"
                          }
                          size="xs"
                          borderRadius="full"
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Flex>
            </Box>
          </CardBody>
        </Card>

        <Card overflow="hidden">
          <CardBody p={0}>
            <Box bg="purple.500" p={3}>
              <HStack spacing={3}>
                <Icon as={FaHandsHelping} color="white" boxSize={5} />
                <Heading size="sm" color="white">
                  Total Assists
                </Heading>
              </HStack>
            </Box>
            <Box p={4}>
              <Flex>
                {/* Left side - Number in container */}
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  borderRadius="lg"
                  bg="purple.50"
                  p={3}
                  mr={4}
                  h="100%"
                  minW="100px"
                >
                  <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                    {totalAssists}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    ASSISTS
                  </Text>
                </Flex>

                {/* Right side - Top assisters */}
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Top assisters:
                  </Text>
                  {teamOfTheWeekData
                    .sort((a, b) => b.totalAssists - a.totalAssists)
                    .slice(0, 3)
                    .map((player) => (
                      <Box key={player.id} mb={1.5}>
                        <HStack justifyContent="space-between">
                          <HStack>
                            <Badge
                              colorScheme={
                                player.position === "GK"
                                  ? "purple"
                                  : player.position === "DEF"
                                    ? "blue"
                                    : player.position === "MID"
                                      ? "green"
                                      : "red"
                              }
                              size="sm"
                            >
                              {player.position}
                            </Badge>
                            <Text fontSize="sm" fontWeight="medium">
                              {player.name}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" fontWeight="bold">
                            {player.totalAssists}
                          </Text>
                        </HStack>
                        <Progress
                          value={
                            (player.totalAssists / mostAssists.totalAssists) *
                            100
                          }
                          colorScheme="purple"
                          size="xs"
                          borderRadius="full"
                          mt={0.5}
                        />
                      </Box>
                    ))}
                </Box>
              </Flex>
            </Box>
          </CardBody>
        </Card>

        <Card overflow="hidden">
          <CardBody p={0}>
            <Box bg="orange.500" p={3}>
              <HStack spacing={3}>
                <Icon as={FaUsers} color="white" boxSize={5} />
                <Heading size="sm" color="white">
                  Club Distribution
                </Heading>
              </HStack>
            </Box>
            <Box p={4}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="md" fontWeight="bold">
                  Top club:
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {topClub ? topClub[0] : "None"}
                  {topClub && (
                    <Badge ml={2} colorScheme="orange">
                      {topClub[1]} players
                    </Badge>
                  )}
                </Text>
              </Flex>

              <Text fontSize="sm" mb={1}>
                All represented clubs:
              </Text>
              <Flex wrap="wrap" gap={1}>
                {allClubs.map((club) => (
                  <Badge key={club} colorScheme="gray">
                    {club}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main content grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Team formation section */}
        <GridItem>
          <Card>
            <CardHeader>
              <Heading size="md">Team Formation</Heading>
              <Text fontSize="sm" color="gray.500">
                This week's highest scoring players across all positions
              </Text>
            </CardHeader>
            <Divider />
            <CardBody>
              <TeamFormation
                startingPlayers={teamOfTheWeekData}
                benchPlayers={[]}
              />
            </CardBody>
          </Card>
        </GridItem>

        {/* Top performers section */}
        <GridItem>
          <VStack spacing={4} align="stretch">
            <Card>
              <CardHeader>
                <Heading size="md">Top Performers</Heading>
                <Text fontSize="sm" color="gray.500">
                  Standout players from this gameweek
                </Text>
              </CardHeader>
              <Divider />
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {/* Top Scorer */}
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <HStack spacing={3} mb={2}>
                      <Icon as={FaStar} color="yellow.400" boxSize={5} />
                      <Heading size="sm">Star Performer</Heading>
                    </HStack>
                    <HStack mt={3}>
                      <Badge
                        colorScheme={
                          topScorer.position === "GK"
                            ? "purple"
                            : topScorer.position === "DEF"
                              ? "blue"
                              : topScorer.position === "MID"
                                ? "green"
                                : "red"
                        }
                      >
                        {topScorer.position}
                      </Badge>
                      <Text fontWeight="bold">{topScorer.name}</Text>
                      <Text>({topScorer.club})</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={2}>
                      {topScorer.points} pts
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Minutes played: {topScorer.minutesPlayed}
                    </Text>
                  </Box>

                  {/* Top Goalscorer */}
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <HStack spacing={3} mb={2}>
                      <Icon as={FaFutbol} color="green.400" boxSize={5} />
                      <Heading size="sm">Top Goalscorer</Heading>
                    </HStack>
                    <HStack mt={3}>
                      <Badge
                        colorScheme={
                          mostGoals.position === "GK"
                            ? "purple"
                            : mostGoals.position === "DEF"
                              ? "blue"
                              : mostGoals.position === "MID"
                                ? "green"
                                : "red"
                        }
                      >
                        {mostGoals.position}
                      </Badge>
                      <Text fontWeight="bold">{mostGoals.name}</Text>
                      <Text>({mostGoals.club})</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={2}>
                      {mostGoals.totalGoals} goals
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      xG: {mostGoals.expectedGoals.toFixed(1)}
                    </Text>
                  </Box>

                  {/* Top Assister */}
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <HStack spacing={3} mb={2}>
                      <Icon as={FaHandsHelping} color="blue.400" boxSize={5} />
                      <Heading size="sm">Top Assister</Heading>
                    </HStack>
                    <HStack mt={3}>
                      <Badge
                        colorScheme={
                          mostAssists.position === "GK"
                            ? "purple"
                            : mostAssists.position === "DEF"
                              ? "blue"
                              : mostAssists.position === "MID"
                                ? "green"
                                : "red"
                        }
                      >
                        {mostAssists.position}
                      </Badge>
                      <Text fontWeight="bold">{mostAssists.name}</Text>
                      <Text>({mostAssists.club})</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={2}>
                      {mostAssists.totalAssists} assists
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      xA: {mostAssists.expectedAssists.toFixed(1)}
                    </Text>
                  </Box>

                  {/* In Form Player */}
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <HStack spacing={3} mb={2}>
                      <Icon as={FiTrendingUp} color="purple.400" boxSize={5} />
                      <Heading size="sm">In-Form Player</Heading>
                    </HStack>
                    <HStack mt={3}>
                      <Badge
                        colorScheme={
                          bestForm.position === "GK"
                            ? "purple"
                            : bestForm.position === "DEF"
                              ? "blue"
                              : bestForm.position === "MID"
                                ? "green"
                                : "red"
                        }
                      >
                        {bestForm.position}
                      </Badge>
                      <Text fontWeight="bold">{bestForm.name}</Text>
                      <Text>({bestForm.club})</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" mt={2}>
                      Form: {bestForm.form}
                    </Text>
                    <Progress
                      value={bestForm.form * 10}
                      colorScheme="green"
                      size="sm"
                      borderRadius="full"
                      mt={2}
                    />
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>

            {/* Player Selection Insights */}
            <Card>
              <CardHeader>
                <Heading size="md">Selection Insights</Heading>
                <Text fontSize="sm" color="gray.500">
                  Ownership trends among top performers
                </Text>
              </CardHeader>
              <Divider />
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {teamOfTheWeekData
                    .sort((a, b) => b.selectedByPercent - a.selectedByPercent)
                    .slice(0, 5)
                    .map((player) => (
                      <Box key={player.id}>
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Badge
                              colorScheme={
                                player.position === "GK"
                                  ? "purple"
                                  : player.position === "DEF"
                                    ? "blue"
                                    : player.position === "MID"
                                      ? "green"
                                      : "red"
                              }
                            >
                              {player.position}
                            </Badge>
                            <Text fontWeight="bold">{player.name}</Text>
                            <Text fontSize="sm">({player.club})</Text>
                          </HStack>
                          <Text fontWeight="bold">
                            {player.selectedByPercent}%
                          </Text>
                        </Flex>
                        <Progress
                          value={player.selectedByPercent}
                          colorScheme="blue"
                          size="sm"
                          borderRadius="full"
                          mt={1}
                        />
                      </Box>
                    ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
