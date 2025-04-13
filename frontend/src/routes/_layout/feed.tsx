import {
  Box,
  Heading,
  Container,
  Text,
  VStack,
  HStack,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import FeedImage from "/assets/images/feed.png";

export const Route = createFileRoute("/_layout/feed")({
  component: Feed,
});

function Feed() {
  // Mock feed data
  const feedItems = [
    {
      id: 1,
      author: "John Smith",
      authorRole: "FPL Expert",
      avatar: "https://bit.ly/dan-abramov",
      timestamp: "2 hours ago",
      content:
        "Haaland just scored another hat-trick! If you don't have him in your team yet, now is the time to get him in. He's breaking all FPL records this season.",
      image: "https://i.redd.it/d3q4lq38bvyb1.jpg",
      likes: 245,
      comments: 42,
    },
    {
      id: 2,
      author: "Emma Watson",
      authorRole: "Top 10k Manager",
      avatar: "https://bit.ly/sage-adebayo",
      timestamp: "5 hours ago",
      content:
        "Here's my team analysis for GW10. Captaining Salah against a leaky defense could be the differential we need this week. What do you think?",
      image:
        "https://preview.redd.it/top-transfer-out-kane-240k-top-transfer-in-haaland-260k-who-v0-16jezamndcg91.png?width=640&crop=smart&auto=webp&s=75fb1730088c3cc38fb3d9b38042033d1cfe6bcf",
      likes: 189,
      comments: 37,
    },
    {
      id: 3,
      author: "Marcus Chen",
      authorRole: "Fantasy Analyst",
      avatar: "https://bit.ly/ryan-florence",
      timestamp: "Yesterday",
      content:
        "The budget midfielders are outperforming premium options this season. Palmer at Chelsea offering incredible value at just £5.7m with consistent returns.",
      image:
        "https://www.dexerto.com/cdn-image/wp-content/uploads/2024/03/14/Screenshot-2024-05-03-at-11.07.37-1003x1024.jpeg?width=1200&quality=75&format=auto",
      likes: 321,
      comments: 53,
    },
    {
      id: 4,
      author: "Sophie Williams",
      authorRole: "Community Manager",
      avatar: "https://bit.ly/kent-c-dodds",
      timestamp: "2 days ago",
      content:
        "Weekly reminder: FPL Gameweek deadline is Friday at 18:30 GMT this week due to the early kickoff. Don't forget to make your transfers and set your captain!",
      image: FeedImage,
      likes: 412,
      comments: 28,
    },
  ];

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={8}>
        FPL Community Feed
      </Heading>

      <Box mb={8}>
        <Text fontSize="lg" mb={6}>
          Stay updated with the latest FPL news, tips, and community
          discussions.
        </Text>
      </Box>

      <VStack spacing={6} align="stretch" mb={10}>
        {feedItems.map((item) => (
          <Card
            key={item.id}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <CardHeader>
              <HStack>
                <Avatar src={item.avatar} name={item.author} />
                <Box ml={2}>
                  <Text fontWeight="bold">{item.author}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.authorRole} • {item.timestamp}
                  </Text>
                </Box>
              </HStack>
            </CardHeader>

            <CardBody py={2}>
              <Text mb={4}>{item.content}</Text>
              {item.image && (
                <Image
                  src={item.image}
                  alt="Post image"
                  borderRadius="md"
                  maxH="400px"
                  mx="auto"
                />
              )}
            </CardBody>

            <Divider />

            <CardFooter>
              <Flex justify="space-between" width="100%">
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                  Like ({item.likes})
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                  Comment ({item.comments})
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                  Share
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </VStack>
    </Container>
  );
}
