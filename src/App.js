import Pages from "./pages/Pages";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterSideNav from "./components/FilterSideNav";

function App() {
  return (
    <div className="App">
      <Header />
      <BODY>
        <Pages />
      </BODY>
      <Footer />
    </div>
  );
}
const BODY = styled.div`
  padding: 1rem;
`;
export default App;
