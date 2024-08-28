import React, { memo } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//style imports
import { NavbarStyle, NavbarLink } from "./Styles";
import { Box } from "@chakra-ui/react";
//Class import
import Auth from "../../Auth";

/** The Navbar for the site. It either shows routes for Home, Login, and Register. Or if Logged in, routes for Pokedex, Dashboard, and logout. */
const Navbar = () =>  {
  const navigate = useNavigate;
  return (
    <div>
    <MyLinks navigate={navigate} />
  </div>
  );
};

export default withRouter(Navbar);

const MyLinks = memo(function MyLinks({ navigate }) {
  if (localStorage.getItem("token")) {
    return (
      <div>
        <NavbarStyle>
          <Box color="Gray" mx="20px">
            Welcome {localStorage.getItem("name")}
          </Box>
          <NavbarLink href="/pokedex">Pokedex</NavbarLink>
          <NavbarLink
            onClick={() => {
              Auth.logout(() => {
                navigate("/login");
              });
            }}
          >
            Logout
          </NavbarLink>
        </NavbarStyle>
      </div>
    );
  }

  return (
    <div>
      <NavbarStyle>
        <Box color="Gray" mx="20px">
          Pokedex
        </Box>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink data-testid="login" href="/login">
          Login
        </NavbarLink>
        <NavbarLink href="/register">Register</NavbarLink>
      </NavbarStyle>
    </div>
  );
});
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}
