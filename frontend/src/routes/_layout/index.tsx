import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Image,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { ImStarHalf } from "react-icons/im";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        <SimpleGrid
          spacing={5}
          // templateColumns="repeat(auto-fill, minmax(200px, 1fr))"

          minChildWidth={250}
        >
          <Card borderRadius={15}>
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
                height={400}
              />
            </CardBody>
            <CardFooter>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
          <Card borderRadius={15}>
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
                height={400}
              />
            </CardBody>
            <CardFooter>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
          <Card borderRadius={15}>
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
                height={400}
              />
            </CardBody>
            <CardFooter>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
