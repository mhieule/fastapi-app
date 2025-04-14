import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";
import { teamOfTheWeekData } from "../../data/mockTeamData";

export const Route = createFileRoute("/_layout/team-of-the-week")({
  component: TeamOfTheWeek,
});

function TeamOfTheWeek() {
  return (
    <Container maxW="55%">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={8}>
        FPL Team of the Week
      </Heading>

      <Box mb={8} justifyContent="center">
        <Text fontSize="lg" mb={4}>
          This week's highest scoring players across all positions, based on FPL
          performance.
        </Text>
        <TeamFormation startingPlayers={teamOfTheWeekData} benchPlayers={[]} />
      </Box>
    </Container>
  );
}
