import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const MyFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} Or Smadga All Rights Reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default MyFooter;
