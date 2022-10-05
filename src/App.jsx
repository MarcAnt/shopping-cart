import { Heading } from "@chakra-ui/react";
import { Main } from "@/components";
import { Layout } from "@/components/Layout";

function App() {
  return (
    <Layout>
      <Heading
        as={"h1"}
        size={"xl"}
        textAlign={"center"}
        py={5}
        m={"0 auto"}
        width={"100%"}
      >
        List of Products
      </Heading>
      <Main />
    </Layout>
  );
}

export default App;
