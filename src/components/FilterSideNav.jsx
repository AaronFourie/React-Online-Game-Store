import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import SearchIcon from "@rsuite/icons/Search";
import TagFilterIcon from "@rsuite/icons/TagFilter";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import React from "react";
import styled from "styled-components";
const StyledSidenav = styled(Sidenav)`
  position: fixed;
  top: ${(props) => (props.expanded ? "0" : "calc(100% - 75%)")};
  left: 0;
  border-top-right-radius: ${(props) => (props.expanded ? "0" : "40px;")};
  border-bottom-right-radius: ${(props) => (props.expanded ? "0" : "40px;")};
  height: ${(props) => (props.expanded ? "100%" : "max-content")};
  z-index: 300;
  overflow-y: ${(props) => (props.expanded ? "auto" : "none")};
  box-shadow: 20px 16px 40px 8px
    ${(props) =>
      props.expanded ? "rgba(0, 0, 0, 0.01)" : "rgba(0, 0, 0, 0.1)"};
  background: ${(props) => (props.expanded ? "#FFFFFF" : "")};
  padding: 2rem 1rem 1rem 1rem;
  margin: 0;
  width: ${(props) => (props.expanded ? "280px" : "100px")};
  transition: 0.4s ease-in-out; /* Transition for width and height change */
`;

const StyledNav = styled(Nav)`
  .rs-nav-item-content {
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${(props) => (props.expanded ? "280" : "110px")};
    overflow: hidden;
    transition: 0.4s ease-in-out; /* Transition for width change */
  }

  .rs-nav-item-text {
    visibility: ${(props) => (props.expanded ? "visible" : "hidden")};
    transition: margin-left 0.2s ease-in-out; /* Transition for margin change and visibility */
  }
  /* Hide text for "Advanced" and "Settings" titles when collapsed */
`;

function FilterSideNav() {
  const [expanded, setExpanded] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState("1");

  return (
    <div>
      <StyledSidenav expanded={expanded}>
        <Toggle
          onChange={setExpanded}
          checked={expanded}
          checkedChildren="Expand"
          unCheckedChildren="Collapse"
        />
        <hr />
        <StyledNav
          expanded={expanded}
          activeKey={activeKey}
          onSelect={setActiveKey}
        >
          <Nav.Item eventKey="1" icon={<DashboardIcon />} title="Dashboard">
            <span className="rs-nav-item-text">Dashboard</span>
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<GroupIcon />} title="User Group">
            <span className="rs-nav-item-text">User Group</span>
          </Nav.Item>
          <Nav.Menu
            placement="rightStart"
            eventKey="3"
            title={expanded ? "Advanced" : null}
            icon={<MagicIcon />}
          >
            <Nav.Item eventKey="3-1">Geo</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
          </Nav.Menu>
          <Nav.Menu
            placement="rightStart"
            eventKey="4"
            title={expanded ? "Settings" : null}
            icon={<GearCircleIcon />}
          >
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
          <Nav.Menu
            placement="rightStart"
            eventKey="4"
            title={expanded ? "Settings" : null}
            icon={<GearCircleIcon />}
          >
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
          <Nav.Item eventKey="5" icon={<SearchIcon />} title="Search">
            <span className="rs-nav-item-text">Search</span>
          </Nav.Item>
          <Nav.Item eventKey="6" icon={<TagFilterIcon />} title="Tag Filter">
            <span className="rs-nav-item-text">Tag Filter</span>
          </Nav.Item>
        </StyledNav>
      </StyledSidenav>
    </div>
  );
}

export default FilterSideNav;
