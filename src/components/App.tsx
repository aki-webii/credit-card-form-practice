import * as React from "react";
import styled from "@emotion/styled";

import CreditCard from "./atoms/CreditCard";

const Container = styled.div({
  backgroundColor: "#ddeefc",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const App: React.FC = () => {
  return (
    <Container className="App">
      <CreditCard />
    </Container>
  );
};

export default App;
