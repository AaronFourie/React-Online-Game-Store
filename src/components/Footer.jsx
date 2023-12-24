import "@splidejs/react-splide/css";
import styled from "styled-components";
import CookieIcon from "@mui/icons-material/Cookie";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const currentDate = month + "/" + date + "/" + year;
function Footer() {
  return (
    <>
      <footer>
        <FOOTER>
          <ul>
            <h3>QUICK LINKS</h3>
            <li>
              <a href="#">STORE</a>
            </li>
            <li>
              <a href="#">LIBRARY</a>
            </li>
            <li>
              <a href="#">COMMUNITY</a>
            </li>
            <li>
              <a href="#">ACCOUNT</a>
            </li>
          </ul>
          <ul>
            <h3>MEDIA</h3>
            <li>
              <AccountCircleIcon />
            </li>
            <li>
              <FacebookIcon />
            </li>
            <li>
              <a>JOIN OUR DISCORD</a>
            </li>
          </ul>
        </FOOTER>
        <hr></hr>
        <p>@CopyRight of original work by AaronFourie | Updated on {currentDate}</p>
      </footer>
    </>
  );
}
const FOOTER = styled.footer`
  width: 60%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  align-items: center;
  background: none;

  h3 {
    color: white;
    padding-bottom: 1.5rem;
  }
  ul {
    box-sizing: border-boxx;
    margin: 0 7rem 0 0;
    padding: 1rem 2rem 1rem 0;
    list-style: none;
  }
  ul li {
    font-weight: 400;
    color: lightgrey;
    padding: 0.5rem 0;
    cursor: pointer;
    &:hover {
      color: rgba(29, 118, 140, 1);
      transform: translateY(-2px);
      transition: ease-out 0.2s;
    }
  }
  ul li a {
    text-decoration: none;
    color: rgba(200, 200, 230, 0.8);
    &:hover {
      color: rgba(29, 118, 140, 1);
    }
  }
`;

export default Footer;
