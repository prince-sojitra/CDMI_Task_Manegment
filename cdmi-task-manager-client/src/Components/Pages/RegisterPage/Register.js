import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../Background";
import { register } from "../../../Services/userService";
import { useDispatch } from "react-redux";
import {
  BgContainer,
  Container,
  CdmiIconContainer,
  FormSection,
  FormCard,
  CustomForm,
  Title,
  Input,
  Button,
  Icon,
} from "./Styled";
import './register.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useEffect } from "react";
import { toggleSpinner } from "../../../Redux/Slices/spinnerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [userInformations, setUserInformations] = useState({
    name: "",
    surname: "",
    email: "",
    type: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    document.title = "Create a new user"
  }, [])

  const handleSubmit = async (values) => {
    dispatch(toggleSpinner(true))
    await register(values, dispatch);
    dispatch(toggleSpinner(false))
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Please enter name'),
    surname: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Please enter surname'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter email'),
    type: Yup.string()
      .required('Please select type'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')

  });

  return (
    <>
      <BgContainer>
        <Background />
      </BgContainer>
      <Container>
        <CdmiIconContainer>
          <Icon src="/C-logo-back.png" />
        </CdmiIconContainer>
        <FormSection>
          <FormCard>
            <Formik
              initialValues={userInformations}
              validationSchema={SignupSchema}
              onSubmit={async (values, actions) => {
                await handleSubmit(values)
                actions.resetForm()
                setUserInformations({
                  name: "",
                  surname: "",
                  email: "",
                  type: "",
                  password: "",
                  confirmpassword: "",
                })
              }}
            >
              {() => (
                <Form>
                  <div className="formParentBox">
                    <Field name="name" placeholder="Enter name" />
                    <ErrorMessage component="p" name="name" />
                  </div>
                  <div className="formParentBox">
                    <Field name="surname" placeholder="Enter surname" />
                    <ErrorMessage component="p" name="surname" />
                  </div>
                  <div className="formParentBox">
                    <Field name="email" type="email" placeholder="Enter email" />
                    <ErrorMessage component="p" name="email" />
                  </div>
                  <div className="formParentBox">
                    <Field as="select" name="type">
                      <option value="">Select Type</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="HOD">HOD</option>
                      <option value="FACULTY">FACULTY</option>
                      <option value="TRAINEE">TRAINEE</option>
                    </Field>
                    <ErrorMessage component="p" name="type" />
                  </div>
                  <div className="formParentBox">
                    <Field name="password" placeholder="Enter password" type="password" />
                    <ErrorMessage component="p" name="password" />
                  </div>
                  <div className="formParentBox">
                    <Field name="confirmpassword" placeholder="Enter confirm password" type="password" />
                    <ErrorMessage component="p" name="confirmpassword" />
                  </div>
                  <Button type="submit">
                    ADD USER
                  </Button>
                </Form>
              )}
            </Formik>
          </FormCard>
        </FormSection>
      </Container>
    </>
  );
};

export default Register;
