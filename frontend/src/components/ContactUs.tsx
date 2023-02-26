import React from "react";
import styled from "styled-components";

const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-top: 40px;
`;

const InputField = styled.input`
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  height: 150px;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 200px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3e8e41;
  }
`;

const ContactUs: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <ContactUsContainer>
      <Title>Contact Us</Title>
      <Subtitle>Get in touch with us today!</Subtitle>
      <div className="container">
        <div className="text-container">
          <p className="intro-text">
            Thank you for your interest in Smadgify. If you have any questions
            or comments about our products or services, please feel free to
            contact us using the form below. We will get back to you as soon as
            possible.
          </p>
          <p className="contact-info">
            Alternatively, you can also reach us by phone at{" "}
            <a href="tel:555-555-5555">555-555-5555</a> or by email at{" "}
            <a href="mailto:support@smadgify.com">support@smadgify.com</a>.
          </p>
          <p className="support-hours">
            Our customer support team is available to assist you Monday to
            Friday from 9am to 5pm EST.
          </p>
          <p className="feedback">
            We value your feedback and are committed to providing the best
            possible customer experience.
          </p>
        </div>
      </div>
      <FormContainer onSubmit={handleSubmit}>
        <InputField type="text" name="name" placeholder="Name" required />
        <InputField type="email" name="email" placeholder="Email" required />
        <TextArea name="message" placeholder="Message" required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
    </ContactUsContainer>
  );
};

export default ContactUs;
