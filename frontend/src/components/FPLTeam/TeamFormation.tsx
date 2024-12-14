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
} from "@chakra-ui/react";
import BackgroundImg from "/assets/images/field.jpg";
import ShirtImg from "/assets/images/MU.webp";

// Types
interface Player {
  id: number;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  club: string;
  points: number | null;
  opponent: string;
}

interface PlayerCardProps {
  player: Player;
}

// Player card component
const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { position, club, name, points, opponent } = player;

  return (
    <Card
      width="130px"
      height="130px"
      variant={"elevated"}
      border={"2px solid"}
      borderColor={"black"}
      bgColor={"green.100"}
    >
      <CardBody justifyContent="center" alignItems="center">
        <VStack
          // border="1px solid"
          // borderColor="gray.300"
          // borderRadius="md"
          //   p={2}
          //   spacing={5}
          //   width="100px"
          //   height="120px"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {/* Placeholder for shirt (here just the club name) */}
          {/* Club shirt */}
          <Image src={ShirtImg} borderRadius="lg" height={45} />
          <Divider borderColor={"black"} />
          {/* Player Name */}
          <Text
            fontSize="sm"
            fontWeight="bold"
            textAlign="center"
            color="black"
          >
            {name}
          </Text>
          {/* Points or Opponent */}
          <Text fontSize="xs" color="grey">
            {points !== null ? `${points} pts` : `vs ${opponent}`}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

// Formation component: returns arrays of player arrays by line
interface FormationConfig {
  defenders: number;
  midfielders: number;
  forwards: number;
}

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
