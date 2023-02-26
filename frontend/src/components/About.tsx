import React from "react";
import styled from "styled-components";

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.5;
  text-align: justify;
`;

const About: React.FC = () => {
  return (
    <ParagraphContainer>
      <Paragraph>
        Our e-commerce website, named "Smadgify", is a one-stop-shop for all
        things fashion and accessories. With a sleek and intuitive user
        interface, users can easily browse through a wide selection of products
        and make purchases with just a few clicks.{" "}
      </Paragraph>
      <Paragraph>
        The website is built using React, a popular front-end JavaScript library
        that allows for dynamic and interactive user interfaces. The back-end is
        powered by Django, a high-level Python web framework that offers robust
        security features and scalable architecture. The database management
        system is PostgreSQL, which provides fast and reliable data storage and
        retrieval.{" "}
      </Paragraph>
      <Paragraph>
        On the homepage, users are greeted with a visually stunning slideshow of
        our best-selling products, complete with eye-catching images and
        enticing descriptions. There are several categories to choose from,
        including men's and women's clothing, shoes, accessories, and more.
        Users can also use the search bar to find specific items, or sort
        products by price, popularity, or newest arrivals.{" "}
      </Paragraph>
      <Paragraph>
        Each product page includes a detailed description, high-quality images,
        and customer reviews. Users can add items to their shopping cart and
        checkout using a secure payment gateway, with options for credit/debit
        cards, PayPal, and other popular payment methods. Customers can also
        create an account to save their billing and shipping information, view
        their order history, and receive exclusive promotions and discounts.
      </Paragraph>
      <Paragraph>
        Smadgify offers exceptional customer service, with a dedicated support
        team available 24/7 to answer any questions or resolve any issues. We
        also offer free shipping on all orders over a certain amount, and
        hassle-free returns and exchanges for our customers' convenience
      </Paragraph>
      <Paragraph>
        Overall, Smadgify is a user-friendly, reliable, and visually appealing
        e-commerce website that offers a seamless shopping experience for
        customers. Whether you're looking for a new outfit for a special
        occasion, or just browsing for inspiration, we've got you covered.
      </Paragraph>
    </ParagraphContainer>
  );
};

export default About;
