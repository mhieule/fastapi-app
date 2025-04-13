// src/routes/_layout/live_points.tsx
import { Heading, Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";
import { teamData } from "../../data/mockTeamData";

export const Route = createFileRoute("/_layout/live_points")({
  component: LivePoints,
});

function LivePoints() {
  // Use imported mock data
  const startingPlayers = teamData.slice(0, 11);
  const benchPlayers = teamData.slice(11);

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
