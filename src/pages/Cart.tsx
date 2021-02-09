import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import CartItem from "../components/CartItem";
import CartItemMobile from "../components/CartItemMobile";
import { Link as RouterLink } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice } = useContext(GlobalContext);
  const [isLargerThan345] = useMediaQuery("(min-width: 345px)");

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex={1} minH="100%" mt={["120px", "72px"]}>
        <Box
          display={["none", "block"]}
          minH="100%"
          w="220px"
          py={8}
          color="gray.600"
        >
          <Sidebar />
        </Box>
        <Box flex={1} py={[0, 8]}>
          <Flex w="90%" mx="auto" direction="column" p={3}>
            <Flex
              // @ts-ignore
              display={{ base: "none", bigTablet: "flex" }}
              fontWeight="bold"
              fontSize="lg"
              mb={3}
            >
              <Text w="70%" pl={3}>
                Item
              </Text>
              <Text w="30%" pl={3}>
                Quantity
              </Text>
              <Text w="30%" pl={3}>
                Unit Price
              </Text>
              <Text w="30%" pl={3}>
                Sub-total
              </Text>
            </Flex>
            <Box // @ts-ignore
              display={{ base: "block", bigTablet: "none" }}
              fontWeight="bold"
              fontSize="lg"
              mb={3}
            >
              MY CART
            </Box>
            {/* Duplicated so the children don't have the same key */}
            {cartItems!.map(product => (
              <CartItem key={product.id} product={product} />
            ))}
            {cartItems!.map(product => (
              <CartItemMobile key={product.id} product={product} />
            ))}

            {cartItems!.length > 0 ? (
              <>
                <Text
                  fontSize={isLargerThan345 ? "2xl" : "xl"}
                  alignSelf="flex-end"
                  mb={4}
                >
                  Total:{" "}
                  <Box as="span" fontWeight="bold">
                    ${totalPrice?.toFixed(2)}
                  </Box>
                </Text>
                <HStack spacing={4} alignSelf="flex-end">
                  <Link
                    as={RouterLink}
                    to="/"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Button
                      colorScheme="gray"
                      boxShadow="md"
                      size={isLargerThan345 ? "md" : "sm"}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    colorScheme="red"
                    boxShadow="md"
                    size={isLargerThan345 ? "md" : "sm"}
                  >
                    Checkout
                  </Button>
                </HStack>
              </>
            ) : (
              <Box>
                <Text mb={4}>No Items in your cart</Text>
                <Link
                  as={RouterLink}
                  to="/"
                  _hover={{ textDecoration: "none" }}
                >
                  <Button colorScheme="gray" boxShadow="md">
                    Continue Shopping
                  </Button>
                </Link>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
      <Footer />
      <FooterMobile />
    </Flex>
  );
};

export default Cart;