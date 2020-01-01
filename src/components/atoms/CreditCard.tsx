import * as React from "react";
import styled from "@emotion/styled";
import { padEnd, range } from "lodash";

const Container = styled.div({
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column"
});

const Focus = styled.div<{
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
}>(({ left, top, width, height, opacity }) => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  opacity: opacity,
  border: "2px solid rgba(255, 255, 255, 0.65)",
  borderRadius: "4px",
  transition: "all 0.35s"
}));

const CreditCardContainer = styled.div({
  position: "relative",
  width: "430px",
  height: "270px",
  left: "34px",
  top: "24px"
});

const CreditCard = styled.div({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "6px",
  boxShadow: "0 30px 60px 0 rgba(90, 116, 148, 0.4)",
  display: "flex",
  padding: "24px",
  flexDirection: "column",
  justifyContent: "space-between",
  backfaceVisibility: "hidden",
  transition: "transform 0.8s",
  transformStyle: "preserve-3d"
});

const CreditCardFront = styled(CreditCard)<{ displayFlag: boolean }>(
  ({ displayFlag }) => ({
    backgroundColor: "PaleTurquoise",
    transform: `rotateY(${displayFlag ? "0" : "180deg"})`
  })
);

const CreditCardBack = styled(CreditCard)<{ displayFlag: boolean }>(
  ({ displayFlag }) => ({
    justifyContent: "center",
    backgroundColor: "LightPink",
    transform: `rotateY(${displayFlag ? "360deg" : "180deg"})`
  })
);

const CreditCardRow = styled.div({
  display: "flex",
  justifyContent: "space-between"
});

const CCNumber = styled.p({
  fontSize: "30px",
  letterSpacing: "4px",
  margin: "0 auto"
});

const CCLabel = styled.label({});

const CCHolder = styled.p({});

const CCExpirationDate = styled.p({});

const CCCvc = styled.p({
  backgroundColor: "white",
  borderRadius: "4px",
  padding: "8px",
  textAlign: "right",
  height: "34px"
});

const FormBlock = styled.div({
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 30px 60px 0 rgba(90, 116, 148, 0.4)",
  width: "500px",
  height: "600px",
  padding: "60px 18px 18px",
  backgroundColor: "white"
});

const InputBlock = styled.div({
  marginTop: "24px"
});

const Label = styled.label({});

const Input = styled.input({
  width: "100%",
  height: "50px",
  borderRadius: "5px",
  boxShadow: "none",
  border: "1px solid #ced6e0",
  transition: "all 0.3s ease-in-out",
  fontSize: "18px",
  padding: "5px 15px",
  background: "none",
  color: "#1a3b5d",
  backgroundColor: "white"
});

const Select = styled.select({});

enum CardSide {
  front = "front",
  back = "back"
}

enum FocusTarget {
  cardNumber = "cardNumber",
  cardHolder = "cardHolder",
  expirationDate = "expirationDate",
  cvc = "cvc",
  none = "none"
}

const focusPositions: {
  [key in keyof typeof FocusTarget]: {
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: number;
  };
} = {
  [FocusTarget.cardNumber]: {
    opacity: 1,
    left: "36px",
    top: "98px",
    width: "354px",
    height: "40px"
  },
  [FocusTarget.cardHolder]: {
    opacity: 1,
    left: "16px",
    top: "220px",
    width: "200px",
    height: "32px"
  },
  [FocusTarget.expirationDate]: {
    opacity: 1,
    left: "296px",
    top: "220px",
    width: "80px",
    height: "32px"
  },
  [FocusTarget.cvc]: {
    opacity: 0,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%"
  },
  [FocusTarget.none]: {
    opacity: 0,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%"
  }
};

const Component: React.FC = () => {
  const [cardNumber, setCardNumber] = React.useState("");
  const [holderName, setHolderName] = React.useState("");
  const [expirationMonth, setExpirationMonth] = React.useState("");
  const [expirationYear, setExpirationYear] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [displayingSide, setDisplayingSide] = React.useState<CardSide>(
    CardSide.front
  );
  const [focusTarget, setForcusTarget] = React.useState<FocusTarget>(
    FocusTarget.none
  );

  return (
    <Container>
      <CreditCardContainer>
        <CreditCardFront displayFlag={displayingSide === CardSide.front}>
          <Focus {...focusPositions[focusTarget]} />
          <CreditCardRow></CreditCardRow>
          <CreditCardRow>
            <CCNumber>
              {padEnd(cardNumber, 16, "#")
                .replace(/(.{4})/g, "$1 ")
                .trim()}
            </CCNumber>
          </CreditCardRow>
          <CreditCardRow>
            <div>
              <CCLabel>Card Holder</CCLabel>
              <CCHolder>
                {holderName.length === 0 ? "HOLDER NAME" : holderName}
              </CCHolder>
            </div>
            <div>
              <CCLabel>Expiration Date</CCLabel>
              <CCExpirationDate>
                {expirationMonth.length === 0 ? "MM" : expirationMonth} /{" "}
                {expirationYear.length === 0 ? "YY" : expirationYear}
              </CCExpirationDate>
            </div>
          </CreditCardRow>
        </CreditCardFront>
        <CreditCardBack displayFlag={displayingSide === CardSide.back}>
          <CCCvc>{cvc}</CCCvc>
        </CreditCardBack>
      </CreditCardContainer>

      <FormBlock>
        <InputBlock>
          <Label>Card Number</Label>
          <Input
            type="number"
            name="cardNumber"
            value={cardNumber}
            onFocus={() => {
              setDisplayingSide(CardSide.front);
              setForcusTarget(FocusTarget.cardNumber);
            }}
            onBlur={() => {
              setForcusTarget(FocusTarget.none);
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length <= 16) {
                setCardNumber(e.target.value);
              }
            }}
          />
        </InputBlock>
        <InputBlock>
          <Label>Holder Name</Label>
          <Input
            type="text"
            name="holderName"
            value={holderName}
            onFocus={() => {
              setDisplayingSide(CardSide.front);
              setForcusTarget(FocusTarget.cardHolder);
            }}
            onBlur={() => {
              setForcusTarget(FocusTarget.none);
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length <= 20) {
                setHolderName(e.target.value);
              }
            }}
          />
        </InputBlock>
        <InputBlock>
          <Label>Expiration Date</Label>
          <Select
            name="expirationMonth"
            onFocus={() => {
              setDisplayingSide(CardSide.front);
              setForcusTarget(FocusTarget.expirationDate);
            }}
            onBlur={() => {
              setForcusTarget(FocusTarget.none);
            }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setExpirationMonth(e.target.value);
            }}
          >
            <option value="">Month</option>
            {range(1, 12).map(v => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </Select>
          <Select
            name="expirationYear"
            onFocus={() => {
              setDisplayingSide(CardSide.front);
              setForcusTarget(FocusTarget.expirationDate);
            }}
            onBlur={() => {
              setForcusTarget(FocusTarget.none);
            }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setExpirationYear(e.target.value.slice(2));
            }}
          >
            <option value="">Year</option>
            {range(2020, 2040).map(v => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </Select>
        </InputBlock>
        <InputBlock>
          <Label>CVC</Label>
          <Input
            type="number"
            name="cvc"
            value={cvc}
            onFocus={() => {
              setDisplayingSide(CardSide.back);
              setForcusTarget(FocusTarget.cvc);
            }}
            onBlur={() => {
              setForcusTarget(FocusTarget.none);
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length <= 4) {
                setCvc(e.target.value);
              }
            }}
          />
        </InputBlock>
      </FormBlock>
    </Container>
  );
};

export default Component;
