import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Image,
  Divider,
  Tooltip,
  Flex,
  Badge,
  Progress,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import BackgroundImg from "/assets/images/field.jpg";
import ShirtImg from "/assets/images/MU.webp";

// Types
// Export the Player interface
export interface Player {
  id: number;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  club: string;
  points: number | null;
  opponent: string;
  // Extended FPL statistics, all optional for backward compatibility
  totalGoals?: number;
  totalAssists?: number;
  minutesPlayed?: number;
  cleanSheets?: number;
  saves?: number;
  bonusPoints?: number;
  ictIndex?: number;
  form?: number;
  priceChange?: number;
  selectedByPercent?: number;
  expectedGoals?: number;
  expectedAssists?: number;
  price?: number;
}

// Export the PlayerCardProps interface if needed, or keep it local
interface PlayerCardProps {
  player: Player;
}

// Get color based on form rating
const getFormColor = (form?: number): string => {
  if (!form) return "gray.400";
  if (form >= 8) return "green.400";
  if (form >= 6) return "green.300";
  if (form >= 4) return "yellow.400";
  if (form >= 2) return "orange.400";
  return "red.400";
};

// Get color based on price change
const getPriceChangeColor = (priceChange?: number): string => {
  if (!priceChange) return "gray.400";
  return priceChange > 0 ? "green.400" : "red.400";
};

// Player card component - Export the component
export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Create tooltip content with extended statistics
  const statsTooltip = (
    <Box
      p={3}
      maxW="200px"
      bg="#1a202c"
      color="white"
      borderRadius="md"
      boxShadow="none"
      overflow="hidden"
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={2}>
        <Box>
          <Text fontWeight="bold" fontSize="md">
            {player.name}
          </Text>
          <Flex align="center" mt={1}>
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
              mr={2}
            >
              {player.position}
            </Badge>
            <Text fontSize="xs">{player.club}</Text>
          </Flex>
        </Box>
        <Box textAlign="right">
          {player.price !== undefined && (
            <Text fontSize="lg" fontWeight="bold" color="#2ecc71">
              £{player.price}m
            </Text>
          )}
          {player.priceChange !== undefined && (
            <Text fontSize="xs" color={getPriceChangeColor(player.priceChange)}>
              {player.priceChange > 0
                ? `↑ £${player.priceChange}m`
                : `↓ £${Math.abs(player.priceChange)}m`}
            </Text>
          )}
        </Box>
      </Flex>

      <Divider my={2} borderColor="gray.600" />

      {/* Key stats */}
      <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={3}>
        {player.form !== undefined && (
          <GridItem>
            <Text fontSize="xs" color="gray.400">
              Form
            </Text>
            <Flex align="center">
              <Text fontWeight="bold" color={getFormColor(player.form)} mr={1}>
                {player.form}
              </Text>
              <Progress
                value={player.form * 10}
                size="xs"
                colorScheme={
                  player.form >= 6
                    ? "green"
                    : player.form >= 4
                      ? "yellow"
                      : "red"
                }
                w="60px"
                borderRadius="full"
              />
            </Flex>
          </GridItem>
        )}

        {player.selectedByPercent !== undefined && (
          <GridItem>
            <Text fontSize="xs" color="gray.400">
              Selected
            </Text>
            <Text fontWeight="bold">{player.selectedByPercent}%</Text>
          </GridItem>
        )}

        {player.minutesPlayed !== undefined && (
          <GridItem>
            <Text fontSize="xs" color="gray.400">
              Minutes
            </Text>
            <Text fontWeight="bold">{player.minutesPlayed}</Text>
          </GridItem>
        )}

        {player.bonusPoints !== undefined && (
          <GridItem>
            <Text fontSize="xs" color="gray.400">
              Bonus
            </Text>
            <Text fontWeight="bold">{player.bonusPoints}</Text>
          </GridItem>
        )}
      </Grid>

      {/* Performance */}
      <Flex justify="space-between" bg="#2D3748" p={2} borderRadius="md" mb={2}>
        <Box textAlign="center">
          <Text fontSize="xs" color="gray.400">
            Goals
          </Text>
          <Text fontWeight="bold" fontSize="md" color="#63B3ED">
            {player.totalGoals || 0}
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="xs" color="gray.400">
            Assists
          </Text>
          <Text fontWeight="bold" fontSize="md" color="#63B3ED">
            {player.totalAssists || 0}
          </Text>
        </Box>
        {player.cleanSheets !== undefined && (
          <Box textAlign="center">
            <Text fontSize="xs" color="gray.400">
              Clean Sh.
            </Text>
            <Text fontWeight="bold" fontSize="md" color="#63B3ED">
              {player.cleanSheets}
            </Text>
          </Box>
        )}
        {player.saves !== undefined && player.saves > 0 && (
          <Box textAlign="center">
            <Text fontSize="xs" color="gray.400">
              Saves
            </Text>
            <Text fontWeight="bold" fontSize="md" color="#63B3ED">
              {player.saves}
            </Text>
          </Box>
        )}
      </Flex>

      {/* Expected stats */}
      {(player.expectedGoals !== undefined ||
        player.expectedAssists !== undefined) && (
        <Box bg="#2D3748" p={2} borderRadius="md">
          <Text fontSize="xs" mb={1} color="gray.400">
            Expected Stats
          </Text>
          <Flex justify="space-between">
            {player.expectedGoals !== undefined && (
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.400">
                  xG
                </Text>
                <Text fontWeight="bold" fontSize="sm" color="#4FD1C5">
                  {player.expectedGoals.toFixed(1)}
                </Text>
              </Box>
            )}
            {player.expectedAssists !== undefined && (
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.400">
                  xA
                </Text>
                <Text fontWeight="bold" fontSize="sm" color="#4FD1C5">
                  {player.expectedAssists.toFixed(1)}
                </Text>
              </Box>
            )}
            {player.ictIndex !== undefined && (
              <Box textAlign="center">
                <Text fontSize="xs" color="gray.400">
                  ICT
                </Text>
                <Text fontWeight="bold" fontSize="sm" color="#4FD1C5">
                  {player.ictIndex.toFixed(1)}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );

  return (
    <Tooltip
      label={statsTooltip}
      hasArrow
      placement="top"
      openDelay={300}
      bg="transparent"
      boxShadow="none"
      padding={0}
      borderRadius={0}
      gutter={10}
      arrowSize={8}
      arrowShadowColor="transparent"
      css={{
        "--popper-arrow-bg": "#1a202c", // Match the main bg color
        ".chakra-tooltip__arrow": {
          background: "#1a202c !important",
          boxShadow: "none !important",
        },
      }}
    >
      <Card
        width="130px"
        height="130px"
        variant={"elevated"}
        border={"2px solid"}
        borderRadius={"10px"}
        borderColor={"black"}
        bgColor={"white"}
        _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
      >
        <CardBody justifyContent="center" alignItems="center">
          <VStack justifyContent="center" alignItems="center" spacing={1}>
            {/* Club shirt */}
            <Image src={ShirtImg} borderRadius="lg" height={45} />
            {/* Player Name */}
            <Text
              fontSize="sm"
              fontWeight="bold"
              textAlign="center"
              color="black"
            >
              {player.name}
            </Text>
            {/* Points or Opponent */}
            <Text fontSize="xs" color="grey">
              {player.points !== null
                ? `${player.points} pts`
                : `vs ${player.opponent}`}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Tooltip>
  );
};

// Formation component: returns arrays of player arrays by line
// interface FormationConfig {
//   defenders: number;
//   midfielders: number;
//   forwards: number;
// }

// This is an example formation generator.
// Given an array of 11 starting players, we separate them into GK, DEF, MID, FWD lines.
function generateFormation(players: Player[]): {
  gk: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
} {
  const gk = players.filter((p) => p.position === "GK").slice(0, 1);
  const defenders = players.filter((p) => p.position === "DEF");
  const midfielders = players.filter((p) => p.position === "MID");
  const forwards = players.filter((p) => p.position === "FWD");

  // It's assumed that the data respects a valid formation.
  return { gk, defenders, midfielders, forwards };
}

interface TeamFormationProps {
  startingPlayers: Player[];
  benchPlayers: Player[];
}

export const TeamFormation: React.FC<TeamFormationProps> = ({
  startingPlayers,
  benchPlayers,
}) => {
  const { gk, defenders, midfielders, forwards } =
    generateFormation(startingPlayers);

  return (
    <Card
      align="center"
      position="relative"
      width="850px"
      height="850px"
      alignContent={"center"}
      justifyContent={"center"}
      //   bgColor={"green.100"}
      backgroundImage={`url(${BackgroundImg})`}
    >
      <VStack>
        {/* Field background (optional) */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          //   zIndex={-1}
          bg="rgba(13, 67, 28, 0.4)"
          backgroundSize="cover"
          backgroundPosition="center"
        />

        {/* GK line */}
        <HStack spacing={4} justify="center" mt={4}>
          {gk.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </HStack>

        {/* DEF line */}
        <HStack spacing={4} justify="center">
          {defenders.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </HStack>

        {/* MID line */}
        <HStack spacing={4} justify="center">
          {midfielders.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </HStack>

        {/* FWD line */}
        <HStack spacing={4} justify="center" mb={6}>
          {forwards.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </HStack>

        {/* Bench line */}
        <HStack spacing={4} justify="center">
          {benchPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </HStack>
      </VStack>
    </Card>
  );
};
