// src/routes/_layout/live_ranking.tsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Select,
  VStack,
  HStack,
  Text,
  Collapse,
  Container,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { TeamFormation } from "../../components/FPLTeam/TeamFormation";

export const Route = createFileRoute("/_layout/live_ranking")({
  component: LiveRanking,
});
// Mock data for leagues
const leagues = [
  { id: "league1", name: "#nhabaolon" },
  { id: "league2", name: "Some Other League" },
  { id: "league3", name: "Another League" },
];

// Mock data for managers in a league
// Each manager has rank, managerName, teamName, gameweekScore, totalPoints
// For simplicity, we just provide some sample data
interface ManagerData {
  id: string;
  rank: number;
  managerName: string;
  teamName: string;
  gameweekScore: number;
  totalPoints: number;
}

const mockManagers: ManagerData[] = [
  {
    id: "1",
    rank: 1,
    managerName: "Lam Tran",
    teamName: "Lenin Zoro",
    gameweekScore: 34,
    totalPoints: 1011,
  },
  {
    id: "2",
    rank: 2,
    managerName: "Nghia Chan Ngan",
    teamName: "Nghĩa Ngắn FPL",
    gameweekScore: 13,
    totalPoints: 939,
  },
  {
    id: "3",
    rank: 3,
    managerName: "Nhat Minh Nguyen",
    teamName: "#nhabaolon",
    gameweekScore: 30,
    totalPoints: 936,
  },
  {
    id: "4",
    rank: 4,
    managerName: "Hieu Le",
    teamName: "Finetuned Fantasy",
    gameweekScore: 48,
    totalPoints: 930,
  },
  {
    id: "5",
    rank: 5,
    managerName: "Nguyen Minh",
    teamName: "oinker",
    gameweekScore: 24,
    totalPoints: 928,
  },
];

// Mock formation data (reuse from previous example)
const mockTeamData = [
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
    position: "DEF" as const,
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
  // Bench
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

function LiveRanking() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [expandedManagerId, setExpandedManagerId] = useState<string | null>(
    null
  );

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeague(e.target.value);
    setExpandedManagerId(null); // reset expanded manager when league changes
  };

  const handleExpandClick = (managerId: string) => {
    setExpandedManagerId(expandedManagerId === managerId ? null : managerId);
  };

  // filter managers based on selectedLeague - in a real scenario we would fetch based on league
  const displayedManagers = selectedLeague ? mockManagers : [];

  const startingPlayers = mockTeamData.slice(0, 11);
  const benchPlayers = mockTeamData.slice(11);

  return (
    <Container maxW="55%">
      <VStack spacing={4} align="stretch" p={4} bg="gray.800" minH="100vh">
        {/* Header */}
        <Box>
          <Heading color="white">Gameweek 16</Heading>
        </Box>

        {/* League selection */}
        <Box>
          <Select
            placeholder="Select league"
            bg="black"
            onChange={handleLeagueChange}
            value={selectedLeague ?? ""}
          >
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </Select>
        </Box>

        {/* Managers List */}
        <VStack align="stretch" spacing={0}>
          {displayedManagers.map((manager) => {
            const isExpanded = expandedManagerId === manager.id;
            return (
              <Box
                key={manager.id}
                borderBottom="1px solid"
                borderColor="gray.700"
              >
                <Box
                  cursor="pointer"
                  p={4}
                  bg={isExpanded ? "whiteAlpha.300" : "whiteAlpha.200"}
                  _hover={{ bg: "whiteAlpha.300" }}
                  onClick={() => handleExpandClick(manager.id)}
                >
                  <HStack justify="space-between">
                    <HStack spacing={4}>
                      <Text color="white" width="20px">
                        {manager.rank}
                      </Text>
                      <VStack align="start" spacing={0}>
                        <Text color="white" fontWeight="bold">
                          {manager.teamName}
                        </Text>
                        <Text fontSize="sm" color="gray.200">
                          {manager.managerName}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack spacing={4}>
                      <VStack spacing={0} align="end">
                        <Text color="green.300" fontWeight="bold" fontSize="xl">
                          {manager.gameweekScore}
                        </Text>
                        <Text fontSize="xs" color="gray.200">
                          GW Score
                        </Text>
                      </VStack>
                      <VStack spacing={0} align="end">
                        <Text color="white" fontWeight="bold" fontSize="xl">
                          {manager.totalPoints}
                        </Text>
                        <Text fontSize="xs" color="gray.200">
                          Total
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                </Box>

                {/* Expanded formation view */}
                <Collapse in={isExpanded} animateOpacity>
                  <Box p={4} bg="whiteAlpha.100">
                    <TeamFormation
                      startingPlayers={startingPlayers}
                      benchPlayers={benchPlayers}
                    />
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Container>
  );
}
