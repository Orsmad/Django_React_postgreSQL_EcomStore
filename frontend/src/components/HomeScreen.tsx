import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAllProductsAsync,
  selectProducts,
} from "../features/product/productSlice";
import { MY_SERVER,SERVER_IMAGES } from "../env";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: black;
  font-size: 36px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
`;

const SlideshowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  height: 150px;
  width: 70%;
  overflow: hidden;
`;

const SlideshowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    // Clean up the timer when the component unmounts
    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    // Set the timer to slide every 3 seconds
    timerRef.current = setInterval(() => {
      setIndex((index + 1) % (images.length + 1));
    }, 30);
  };

  const stopTimer = () => {
    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    // Pause the timer when the mouse enters the slideshow
    stopTimer();
  };

  const handleMouseLeave = () => {
    // Resume the timer when the mouse leaves the slideshow
    startTimer();
  };

  return (
    <HomeContainer>
                  <ToastContainer />

      <Title>Welcome to our E-commerce website</Title>
      <Subtitle>Discover the best products at the best prices</Subtitle>
      <SlideshowContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((src, i) => (
          <SlideshowImage
            key={i}
            src={SERVER_IMAGES + src.image}
            alt={`Slide ${i + 1}`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
          />
        ))}
      </SlideshowContainer>
      <ButtonsContainer>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "20px" }}
          >
            Shop Now
          </Button>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
};

export default HomeScreen;
