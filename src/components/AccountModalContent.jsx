import React, { useState } from "react";
import styled from "styled-components";
import { FiMail, FiLock } from "react-icons/fi";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const colors = {
  orange: "#FFA500",
  lightGray: "#D3D3D3",
  white: "#FFFFFF",
};

const FormContainer = styled.div`
  width: 315px;
  margin: 0 auto;
`;

const InputField = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  margin-left: 25px;
  padding: 0rem;
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -48px;
  background: lightgray;
  padding: 1rem;
  font-size: 1rem;
  color: ${colors.Gray};
`;

const StyledTextField = styled(TextField)`
  margin-right: 0px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 0;
  background-color: ${colors.orange};
  color: ${colors.white};
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.orange}; /* Change color on hover */
  }
`;
const SectionHeading = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login form submission
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <SectionHeading>Login with</SectionHeading>
      <InputField>
        <Icon>
          <FiMail />
        </Icon>
        <StyledTextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
      </InputField>
      <InputField>
        <Icon>
          <FiLock />
        </Icon>
        <StyledTextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          required
        />
      </InputField>
      <StyledButton type="submit" variant="contained">
        Login
      </StyledButton>
      <SectionHeading>
        <br></br>Or
      </SectionHeading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "3rem",
            height: "3rem",
            margin: "-8px 10px 0 10px",
            cursor: "pointer",
            backgroundImage: `url(${require("../icons/google_i.png")})`,
            backgroundSize: "cover",
          }}
          onClick={() => {
            // Logic for Google sign up
          }}
        />
        <div
          style={{
            width: "2rem",
            height: "2rem",
            margin: "0 10px",
            cursor: "pointer",
            backgroundImage: `url(${require("../icons/microsoft_i.png")})`,
            backgroundSize: "cover",
          }}
          onClick={() => {
            // Logic for Microsoft sign up
          }}
        />
      </div>
    </FormContainer>
  );
};

const SignUpForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle signup form submission
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <SectionHeading>Signup with</SectionHeading>
      <InputField>
        <Icon>
          <FiMail />
        </Icon>
        <StyledTextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
      </InputField>
      <InputField>
        <Icon>
          <FiLock />
        </Icon>
        <StyledTextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          required
        />
      </InputField>
      <InputField>
        <Icon>
          <FiLock />
        </Icon>
        <StyledTextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
        />
      </InputField>
      <StyledButton type="submit" variant="contained">
        Sign Up
      </StyledButton>
      <SectionHeading>
        <br></br>Or
      </SectionHeading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "3rem",
            height: "3rem",
            margin: "-8px 10px 0 10px",
            cursor: "pointer",
            backgroundImage: `url(${require("../icons/google_i.png")})`,
            backgroundSize: "cover",
          }}
          onClick={() => {
            // Logic for Google sign up
          }}
        />
        <div
          style={{
            width: "2rem",
            height: "2rem",
            margin: "0 10px",
            cursor: "pointer",
            backgroundImage: `url(${require("../icons/microsoft_i.png")})`,
            backgroundSize: "cover",
          }}
          onClick={() => {
            // Logic for Microsoft sign up
          }}
        />
      </div>
    </FormContainer>
  );
};

const AccountModalContent = ({ showLoginForm, toggleForm }) => {
  return (
    <FormContainer>
      {showLoginForm ? <LoginForm /> : <SignUpForm />}
      <div style={{ textAlign: "center" }}>
        {showLoginForm ? (
          <>
            <br></br>
            Don't have an account?{" "}
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={toggleForm}
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            <br></br>
            Already have an account?{" "}
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={toggleForm}
            >
              Login
            </span>
          </>
        )}
      </div>
    </FormContainer>
  );
};

export default AccountModalContent;
