import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  Stack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";

export const Route = createFileRoute("/_layout/optimized-team")({
  component: OptimizedTeam,
});

function OptimizedTeam() {
  // Mock data for optimized team
  const teamData = [
    {
      id: 1,
      name: "Ederson",
      position: "GK" as const,
      club: "MCI",
      points: 9,
      opponent: "ARS(H)",
    },
    {
      id: 2,
      name: "Alexander-Arnold",
      position: "DEF" as const,
      club: "LIV",
      points: 11,
      opponent: "TOT(A)",
    },
    {
      id: 3,
      name: "Dias",
      position: "DEF" as const,
      club: "MCI",
      points: 8,
      opponent: "ARS(H)",
    },
    {
      id: 4,
      name: "Gabriel",
      position: "DEF" as const,
      club: "ARS",
      points: 7,
      opponent: "MCI(A)",
    },
    {
      id: 5,
      name: "Foden",
      position: "MID" as const,
      club: "MCI",
      points: 12,
      opponent: "ARS(H)",
    },
    {
      id: 6,
      name: "Saka",
      position: "MID" as const,
      club: "ARS",
      points: 10,
      opponent: "MCI(A)",
    },
    {
      id: 7,
      name: "Ødegaard",
      position: "MID" as const,
      club: "ARS",
      points: 9,
      opponent: "MCI(A)",
    },
    {
      id: 8,
      name: "Gordon",
      position: "MID" as const,
      club: "NEW",
      points: 8,
      opponent: "BHA(H)",
    },
    {
      id: 9,
      name: "Haaland",
      position: "FWD" as const,
      club: "MCI",
      points: 14,
      opponent: "ARS(H)",
    },
    {
      id: 10,
      name: "Salah",
      position: "FWD" as const,
      club: "LIV",
      points: 12,
      opponent: "TOT(A)",
    },
    {
      id: 11,
      name: "Isak",
      position: "FWD" as const,
      club: "NEW",
      points: 9,
      opponent: "BHA(H)",
    },
    // Bench players
    {
      id: 12,
      name: "Raya",
      position: "GK" as const,
      club: "ARS",
      points: 6,
      opponent: "MCI(A)",
    },
    {
      id: 13,
      name: "Saliba",
      position: "DEF" as const,
      club: "ARS",
      points: 7,
      opponent: "MCI(A)",
    },
    {
      id: 14,
      name: "Diaz",
      position: "MID" as const,
      club: "LIV",
      points: 8,
      opponent: "TOT(A)",
    },
    {
      id: 15,
      name: "Alvarez",
      position: "FWD" as const,
      club: "MCI",
      points: 7,
      opponent: "ARS(H)",
    },
  ];

  const startingPlayers = teamData.slice(0, 11);
  const benchPlayers = teamData.slice(11);

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
          <Button colorScheme="teal" size="md">
            Auto-Optimize My Team
          </Button>
          <Button colorScheme="blue" size="md">
            Apply Suggestions
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
