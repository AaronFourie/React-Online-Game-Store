import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import "@splidejs/react-splide/css";
import FilterSideNav from "./FilterSideNav";

function Popular() {
  const [popular, setPopular] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true); // New state for image loading
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth < 1300 ? (window.innerWidth < 900 ? 2 : 3) : 4
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(
        window.innerWidth < 1300 ? (window.innerWidth < 900 ? 2 : 3) : 4
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    getPopular();
  }, []);

  // Placeholder image component
  const PlaceholderImage = () => {
    return (
      <CardPlaceholder>
        {/* Customize the placeholder design as needed */}
        <div className="placeholder" />
      </CardPlaceholder>
    );
  };

  const getPopular = async () => {
    const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9dbf77f7b4msh0fbd5c6d905e58ep17b6cbjsn95a79b2a2754",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    // After fetching the data, setLoadingImages to false
    setLoadingImages(false);
    setPopular(result || []);
  };

  // Group games by genre
  const gamesByGenre = popular.reduce((acc, game) => {
    if (!acc[game.genre]) {
      acc[game.genre] = [];
    }
    acc[game.genre].push(game);
    return acc;
  }, {});

  const handleImageLoad = () => {
    // Function to handle image loaded event
    setLoadingImages(false);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <GlobalStyle darkMode={isDarkMode} />
      <Wrapper darkMode={isDarkMode}>
        <DarkModeButton darkMode={isDarkMode} onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </DarkModeButton>
        {/* Render carousels for each genre */}
        {Object.entries(gamesByGenre).map(([genre, games]) => {
          const hasArrows = games.length >= 4; // Check if the genre has 4 or more games
          return (
            <GenreCarousel key={genre} darkMode={isDarkMode}>
              <h4>{genre}</h4>
              <Splide
                options={{
                  perPage: itemsPerPage,
                  drag: "free",
                  gap: "0.1rem",
                  arrows: hasArrows, // Set arrows based on the condition
                }}
              >
                {games.map((result) => (
                  <SplideSlide key={result.id}>
                    <Card darkMode={isDarkMode}>
                      {/* Display placeholder or actual image based on the loading state */}
                      {loadingImages ? (
                        // Placeholder image while loading
                        <PlaceholderImage />
                      ) : (
                        // Actual image
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          onLoad={handleImageLoad}
                        />
                      )}
                    </Card>
                  </SplideSlide>
                ))}
              </Splide>
            </GenreCarousel>
          );
        })}
      </Wrapper>
      <FilterSideNavWrapper>
        <FilterSideNav />
      </FilterSideNavWrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    
    background: ${(props) =>
      props.darkMode
        ? "linear-gradient(to top, rgba(14,15,26,1) 0%, black 100%, black 1%)"
        : "linear-gradient(to right, #f0f5f9 0%, #e34Fg7 50%, #f0f5f9 100%)"};
    font-family: 'Roboto', sans-serif;
  }
`;
const FilterSideNavWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0; /* Adjust the distance from the main content */
  /* Add more styles as needed */
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: 63%;

  @media screen and (max-width: 1700px) {
    width: 70%;
  }

  @media screen and (max-width: 1500px) {
    width: 80%;
  }
  @media screen and (max-width: 1300px) {
    width: 90%;
  }
  @media screen and (max-width: 1200px) {
    width: 95%;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const GenreCarousel = styled.div`
  position: relative; /* Set relative position to the carousel container */
  margin-bottom: 40px;
  padding: 0 45px;
  border-radius: 0.2rem;
  overflow: hidden; /* Hide overflowing elements */

  h4 {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    color: ${(props) => (props.darkMode ? "white" : "#333333")};
  }

  .splide__pagination {
    /* Pagination styles */
    position: absolute;
    bottom: 8px; /* Adjust the distance from the bottom */
    z-index: 1;
    color: black;
    display: flex;
  }

  .splide__arrow {
    /* Arrows container styles */
    position: absolute;
    height: 100px;
    width: 45px;

    border-radius: 0;
    top: 18%; /* Center the arrows vertically */
    transform: translateX(-140%);
    z-index: 1;
    display: flex;
    @media screen and (max-width: 1200px) {
      width: 30px;
      height: 70px;
      top: 25%; /* Center the arrows vertically */
    }
  }

  .splide__arrow--prev {
    /* Previous arrow style */
    left: 18px; /* Adjust distance from the left */
    background: ${(props) =>
      props.darkMode
        ? "linear-gradient(to right, white 0%, black 100%);"
        : "linear-gradient(to right, transparent 0%, lightgrey 100%);"};
        @media screen and (max-width: 1200px) {
          left: 12px;
        }
  }

  .splide__arrow--next {
    /* Next arrow style */
    right: -6rem; /* Adjust distance from the right */
    background: ${(props) =>
      props.darkMode
        ? "linear-gradient(to left, white 0%, black 100%);"
        : "linear-gradient(to left, transparent 0%, lightgrey 100%);"};
        @media screen and (max-width: 1850px) {
          right: -7rem;
        }
        @media screen and (max-width: 1600px) {
          right: -6.5rem;
        }
        @media screen and (max-width: 1400px) {
          right: -6rem;
        }
        @media screen and (max-width: 1200px) {
          right: -4rem;
        }
        @media screen and (max-width: 1000px) {
          right: -3rem;
        }
        @media screen and (max-width: 900px) {
          right: -4rem;
        }
        @media screen and (max-width: 800px) {
          right: -4.3rem;
        }
        @media screen and (max-width: 650px) {
          right: -4.6rem;
        }
        @media screen and (max-width: 700px) {
          right: -4.7rem;
        }
        @media screen and (max-width: 600px) {
          right: -4.5rem;
        }
        @media screen and (max-width: 620px) {
          right: -4.7rem;
        }
  }

  .splide__arrow svg {
    /* Adjust arrow icon size */
    width: 38px; /* Set the width */
    height: 38px; /* Set the height */
    fill: ${(props) => (props.darkMode ? "white" : "black")};

    @media screen and (max-width: 1200px) {
      width: 25px;
      height: 25px;
    }
  }
`;
// Styled component for the placeholder
const CardPlaceholder = styled.div`
  /* Customize placeholder styles */
  .placeholder {
    background-color: #e0e0e0;
    height: 200px; /* Set the height of the placeholder */
    width: 100%;
    /* Add other styling as needed */
  }
`;
const Card = styled.div`
  overflow: hidden;
  background-color: none;
  position: relative;
  margin: 1px;
  border-radius: 3px;
  &:hover {
    transition: ease-in 0.1s;
    margin: 0.2px;
    box-shadow: 7px 4px 6px 0
      ${(props) =>
        props.darkMode
          ? "#ffffffrgba(215, 203, 221, 0.02)"
          : "rgba(0, 0, 0, 0.06)"};
  }
  img {
    object-fit: cover;
    width: 260px;
    height: 148px;

    @media screen and (max-width: 1300px) {
      width: 315px;
      height: 162px;
    }
    @media screen and (max-width: 1150px) {
      width: 300px;
      height: 150px;
    }
    @media screen and (max-width: 900px) {
      width: 340px;
      height: 180px;
    }
    @media screen and (max-width: 800px) {
      width: 290px;
      height: 150px;
    }
    @media screen and (max-width: 700px) {
      width: 260px;
      height: 135px;
    }
    @media screen and (max-width: 650px) {
      width: 230px;
      height: 116px;
    }
    @media screen and (max-width: 600px) {
      width: 210px;
      height: 110px;
    }
    @media screen and (max-width: 550px) {
      width: 185px;
      height: 100px;
    }
  }
  h3 {
    font-weight: 600;
    color: ${(props) => (props.darkMode ? "white" : "#333333")};
  }
`;

const DarkModeButton = styled.button`
  background-color: ${(props) =>
    props.darkMode ? "#ffffff" : "rgba(0, 0, 11, 0.9)"};
  color: ${(props) => (props.darkMode ? "rgba(0, 0, 11, 0.9)" : "#ffffff")};
  border: none;
  font-size: 25px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: -25px auto 5px auto;
  display: flex;

  &:hover {
    background-color: ${(props) =>
      props.darkMode ? "#ffffff" : "rgba(0, 0, 11, 0.9)"};
  }
`;

export default Popular;
