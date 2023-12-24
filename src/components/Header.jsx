import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import "@splidejs/react-splide/css";
import { FaSearch } from "react-icons/fa";
import Video from "../videos/spin2.mp4";
import Modal from "react-modal";
import SignUpLoginForm from "./SignUpLoginForm";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [textRef, { height }] = useMeasure();
  const textWrapperRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingGames, setMatchingGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [noGameFound, setNoGameFound] = useState(false);
  const dropdownRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const openModal = (isLogin) => {
    setModalIsOpen(true);
    setIsLoginForm(isLogin);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Optionally, reset the form state here
  };

  useEffect(() => {
    fetchGamesData();
  }, []);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const fetchGamesData = async () => {
    setIsLoading(true);
    setNoGameFound(false);

    try {
      const response = await fetch(
        "https://free-to-play-games-database.p.rapidapi.com/api/games",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "9dbf77f7b4msh0fbd5c6d905e58ep17b6cbjsn95a79b2a2754",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setGames(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setNoGameFound(false);

    if (!searchQuery) {
      setMatchingGames([]);
      setIsLoading(false);
      return;
    }

    try {
      const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setMatchingGames(filteredGames);
      setIsLoading(false);

      if (filteredGames.length === 0) {
        setNoGameFound(true);
      } else {
        setNoGameFound(false);
      }
    } catch (error) {
      console.error("Error searching games:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (noGameFound && dropdownRef.current) {
      dropdownRef.current.style.display = "none";
    } else if (!noGameFound && dropdownRef.current) {
      dropdownRef.current.style.display = "block";
    }
  }, [noGameFound, dropdownRef]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollPosition = window.scrollY;
      const textWrapperOffset = textWrapperRef.current.offsetTop;

      if (
        scrollPosition >
        textWrapperOffset - window.innerHeight + height / 2
      ) {
        setShowAnimation(true);
      }
    };

    window.addEventListener("scroll", handleScrollAnimation);
    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [height]);

  const textAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(100px)" },
    to: {
      opacity: showAnimation ? 1 : 0,
      transform: showAnimation ? "translateX(0)" : "translateX(100px)",
    },
    config: { duration: 1000 },
  });

  const MobileMenu = styled.div`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    background-color: #111;
    padding: 10px;
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    z-index: 10;
  `;

  const MobileMenuItem = styled.div`
    color: white;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
      background-color: #333;
    }
  `;

  const MobileNav = styled.nav`
    display: none;

    @media screen and (max-width: 1400px) {
      display: block;
      float: right;
      margin-right: 20px;
    }
  `;

  const HamburgerIcon = styled.div`
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
  `;

  const LogoWrapper = styled.div`
    display: block;

    @media screen and (max-width: 1400px) {
      display: block;
      float: left;
      font-size: 50px;
      margin-right: 20px;
      padding-top: 0.3rem;
      color: white;
      cursor: pointer;
      font-family: "Orbitron", sans-serif;
    }
  `;

  const SearchBarWrapper = styled.div`
    display: block;

    @media screen and (max-width: 1400px) {
      display: block;
      float: left;
      padding-top: 1rem;
    }
  `;
  // Inside your Header component
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  return (
    <>
      <Background id="back" isScrolled={isScrolled}>
        <AnimatedTextWrapper ref={textWrapperRef}>
          <p ref={textRef}>
            <div id="header_logo">
              <video autoPlay loop muted>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            GAMEX <br></br>library <br></br>2023
          </p>
        </AnimatedTextWrapper>
      </Background>
      <StyledHeader isScrolled={isScrolled}>
        <div id="NavBarWrapper">
          <LogoWrapper>
            <Logo>
              <div id="logo_img" />
              GAMEX
            </Logo>
          </LogoWrapper>
          <SearchBarWrapper>
            <SearchBar>
              <SearchInput
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <SearchButton onClick={handleSearch}>
                {isLoading ? <LoadingIcon /> : <FaSearch />}
              </SearchButton>
              {noGameFound && <Dropdown ref={dropdownRef}></Dropdown>}
              {matchingGames.length > 0 && (
                <Dropdown ref={dropdownRef}>
                  {matchingGames.map((game) => (
                    <DropdownItem key={game.id}>
                      <h4>{game.title}</h4>
                      <img src={game.thumbnail} alt={game.title} />
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </SearchBar>
          </SearchBarWrapper>
          <Nav>
            <NavItems>
              <NavItem>Store</NavItem>
              <NavItem>Library</NavItem>
              <NavItem>Community</NavItem>
              <NavItem onClick={() => openModal(true)}>Login</NavItem>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Login Modal"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                  },
                  content: {
                    width: isLoginForm ? "420px" : "40%",
                    height: isLoginForm ? "600px" : "75%",
                    margin: "auto",
                    border: "none",
                    borderRadius: "20px",
                    background: "#fff",
                    padding: "20px 0",
                  },
                }}
              >
                {/* Use SignUpLoginForm component */}
                <SignUpLoginForm closeModal={closeModal} />
              </Modal>
            </NavItems>
          </Nav>
        </div>
        <MobileNav>
          <HamburgerIcon
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          >
            &#9776;
          </HamburgerIcon>
          {isMobileMenuVisible && (
            <MobileMenu isOpen={isMobileMenuVisible}>
              <MobileMenuItem>Store</MobileMenuItem>
              <MobileMenuItem>Library</MobileMenuItem>
              <MobileMenuItem>Community</MobileMenuItem>
              <MobileMenuItem onClick={() => openModal(true)}>
                Login
              </MobileMenuItem>
              {/* Other menu items */}
            </MobileMenu>
          )}
        </MobileNav>
      </StyledHeader>
    </>
  );
}
const SearchBar = styled.div`
  float: left;
  display: flex;
  align-items: center;
  padding-top: 1rem;
  @media screen and (max-width: 1400px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px 10px 20px;
  border-radius: 25px;
  background: none;
  outline: none;
  border: 3px solid lightgrey;
  color: white;
  font-size: 14px;
  width: 100px;
  transition: ease-in 0.4s;
  &:hover {
    width: 340px;
    box-shadow: 20px 12px 20px 6px rgba(0, 0, 0, 0.07);
  }
`;

const SearchButton = styled.div`
  position: relative;
  top: 55%;
  cursor: none;
  right: 35px;
  font-size: 20px;
  font-weight: 100;
  color: white;
`;

const Dropdown = styled.div`
  position: relative;
  top: calc(100vh-50%);
  left: 0.4%;
  width: max-content;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;

  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: lightgray transparent; /* For Firefox */

  /* Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Background color of the track */
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray; /* Color of the thumb */
    border-radius: 4px; /* Roundness of the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: darkgray; /* Color of the thumb on hover */
  }
`;

const LoadingIcon = styled.div`
  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DropdownItem = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  max-width: 400px; /* Adjust the maximum width as needed */
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  h4 {
    margin: 0;
    font-weight: 200;
    font-size: 16px;
    margin-left: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: grey; /* Change the text color here */
  }

  img {
    width: 70px;
    height: 40px;
    padding-left: 10px;
    margin-left: auto; /* Align the image to the right */
  }
`;
const Background = styled.div``;

const AnimatedTextWrapper = styled(animated.div)`
  overflow: hidden;
`;
const StyledHeader = styled.header`
  display: block;
  padding: 1rem 0;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  top: 0;
  color: lightgrey;
  z-index: 2;
  background-color: none;

  #NavBarWrapper {
    display: flex;
    max-width: 62%;
    display: block;
    padding: 0;
    margin: 0 auto;
    background: none;
    z-index: 6;
    @media screen and (max-width: 1400px) {
      #NavBarWrapper {
        display: block;
        max-width: 95%;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    #NavBarWrapper {
      display: none;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  float: left;
  font-size: 50px;
  margin-right: 20px;
  padding-top: 0.3rem;
  color: white;
  cursor: pointer;
  font-family: "Orbitron", sans-serif;
`;

const Nav = styled.nav`
  float: right;
  display: flex;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  margin: 0;
`;

const NavItem = styled.a`
  color: rgba(200, 200, 200, 1);
  font-size: 1.1rem;
  padding: 19px 0px;
  margin: 0 0 0 16px;
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: white;

    &::before {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 0;
      height: 3px;
      background-color: white;
      transition: width 5s ease-in-out; /* Transition width over 0.5 seconds */
    }
  }

  &:hover::before {
    width: 100%; /* Expand width to 100% on hover */
  }
`;

export default Header;
