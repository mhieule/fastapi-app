// src/routes/_layout/live_points.tsx
import { Flex, VStack, Text, Heading, Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";

export const Route = createFileRoute("/_layout/live_points")({
  component: LivePoints,
});

function LivePoints() {
  // Mock data for 15 players: 11 starters + 4 bench
  // Positions: GK, DEF, MID, FWD
  const teamData = [
    {
      id: 1,
      name: "Henderson",
      position: "GK" as const,
      club: "ARS",
      points: 2,
      opponent: "H",
    },
    {
      id: 2,
      name: "Gvardiol",
      position: "DEF" as const,
      club: "MCI",
      points: null,
      opponent: "AVL(A)",
    },
    {
      id: 3,
      name: "Burn",
      position: "DEF" as const,
      club: "NEW",
      points: 6,
      opponent: "IPS(A)",
    },
    {
      id: 4,
      name: "Gabriel",
      position: "DEF" as const,
      club: "ARS",
      points: null,
      opponent: "CRY(A)",
    },
    {
      id: 5,
      name: "Rogers",
      position: "MID" as const,
      club: "ASV",
      points: null,
      opponent: "MCI(H)",
    },
    {
      id: 6,
      name: "Mbeumo",
      position: "MID" as const,
      club: "BRE",
      points: 5,
      opponent: "NFO(H)",
    },
    {
      id: 7,
      name: "Murphy",
      position: "MID" as const,
      club: "NEW",
      points: null,
      opponent: "IPS(A)",
    },
    {
      id: 8,
      name: "Salah",
      position: "MID" as const,
      club: "LIV",
      points: 10,
      opponent: "TOT(A)",
    },
    {
      id: 9,
      name: "Cunha",
      position: "FWD" as const,
      club: "WOL",
      points: 2,
      opponent: "LEI(A)",
    },
    {
      id: 10,
      name: "João Pedro",
      position: "FWD" as const,
      club: "BHA",
      points: null,
      opponent: "WHU(A)",
    },
    {
      id: 11,
      name: "Haaland",
      position: "FWD" as const,
      club: "MCI",
      points: 8,
      opponent: "AVL(A)",
    },
    // Bench (4 players)
    {
      id: 12,
      name: "Flekken",
      position: "GK" as const,
      club: "BRE",
      points: null,
      opponent: "NFO(H)",
    },
    {
      id: 13,
      name: "Mazraoui",
      position: "DEF" as const,
      club: "MUN",
      points: null,
      opponent: "BOU(H)",
    },
    {
      id: 14,
      name: "Smith Rowe",
      position: "MID" as const,
      club: "ARS",
      points: null,
      opponent: "SOU(H)",
    },
    {
      id: 15,
      name: "Lewis",
      position: "DEF" as const,
      club: "MCI",
      points: null,
      opponent: "AVL(A)",
    },
  ];

  const startingPlayers = teamData.slice(0, 11);
  const benchPlayers = teamData.slice(11);
  //   return <div>Live Ranking Page</div>;
  // return (
  //   <Container maxW="full">
  //     <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
  //       Live Ranking Page
  //     </Heading>
  //     <div>Live Ranking Page</div>
  //   </Container>
  // );
  return (
    <Container maxW="55%">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
        Points - Finetuned Fantasy
      </Heading>

      <TeamFormation
        startingPlayers={startingPlayers}
        benchPlayers={benchPlayers}
      />
    </Container>
  );
}
