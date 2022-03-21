import {
  Flex,
  Link,
  Container,
  useColorModeValue,
  Icon,
  HStack,
  Avatar,
  Text,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { DarkModeSwitch } from "../DarkModeSwitch/DarkModeSwitch";

import styled from "@emotion/styled";
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";

const StickyNavMobile = styled(Flex)`
  position: fixed;
  z-index: 999;
  bottom: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const NavBarMobile = ({ user }) => {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.800", "lightgreen");
  return (
    <StickyNavMobile bg={bg} boxShadow="inner">
      <Container maxW="container.lg">
        <Flex w="100%" px="6" py="5" align="center" justify="space-between">
          <NextLink href="/home" passHref>
            <Link color={color}>
              <Icon as={FiHome} w={6} h={6} />
            </Link>
          </NextLink>
          <NextLink href="/new-track" passHref>
            <Link color={color}>
              <Icon as={FiPlusSquare} w={6} h={6} />
            </Link>
          </NextLink>
          <NextLink href="/my-profile" passHref>
            <Link color={color}>
              <Icon as={FiUser} w={6} h={6} />
            </Link>
          </NextLink>
          {user.username ? (
            <NextLink href="/my-profile" passHref>
              <HStack as="button" spacing="10px">
                <Avatar size="sm" />
                <Text fontSize="sm" fontWeight="bold">
                  {user.username}
                </Text>
              </HStack>
            </NextLink>
          ) : (
            <NextLink href="/login" passHref>
              <IconButton aria-label="Login" icon={<FiLogIn />} isRound />
            </NextLink>
          )}
          <DarkModeSwitch />
        </Flex>
      </Container>
    </StickyNavMobile>
  );
};

export default NavBarMobile;
