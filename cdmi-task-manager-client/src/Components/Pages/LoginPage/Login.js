import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../Services/userService";
import Background from "../../Background";
import {
  BgContainer,
  Container,
  CdmiIconContainer,
  FormSection,
  FormCard,
  Form,
  Title,
  Input,
  Button,
  Icon,
} from "./Styled";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [userInformations, setUserInformations] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Log in to CDMI Task"
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    login(userInformations, dispatch);
  };
  return (
    <>
      <BgContainer>
        <Background />
      </BgContainer>
      <Container>
        <CdmiIconContainer onClick={() => history.push("/")}>
          <Icon src="/C-logo-back.png" />
        </CdmiIconContainer>
        <FormSection>
          <FormCard>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Title>Log in to CDMI</Title>
              <Input
                type="email"
                placeholder="Enter email"
                required
                value={userInformations.email}
                onChange={(e) =>
                  setUserInformations({
                    ...userInformations,
                    email: e.target.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="Enter password"
                required
                value={userInformations.password}
                onChange={(e) =>
                  setUserInformations({
                    ...userInformations,
                    password: e.target.value,
                  })
                }
              />
              <Button>Log in</Button>
            </Form>
          </FormCard>
        </FormSection>
      </Container>
    </>
  );
};

export default Login;
