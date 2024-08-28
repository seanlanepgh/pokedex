import React, { useState, useCallback, useEffect } from "react";
//data fetching resource imports
import {
  usePokemon,
  usePokemonByType,
  usePokemonByAbility,
} from "../../api/Queries";
import { debounce } from "lodash";
import * as Placeholders from "./Placeholders";
import * as queries from "../../utils/queries";
import { useNavigate } from 'react-router-dom';
//style imports
import { Box, Grid, Icon, Input, Select } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { Link } from "../GlobalStyles";
import { ButtonNav } from "./Styles";
import { motion } from "framer-motion";
import { ArrowRightIcon ,ArrowLeftIcon } from '@chakra-ui/icons'
//component imports
import PokemonCard from "./PokemonCard";
import Navbar from "../Navbar/Navbar";


export default function Pokedex({ history, match }) {
  const navigate = useNavigate();
  //set the search by
  const [searchBy, setSearchBy] = useState(
    localStorage.getItem("searchBy") || "name"
  );
  //set the current page from the url using match.params.page
  const [page, setPage] = useState(localStorage.getItem("page") || 1);
  //set the nameString using the same method
  //I use two of each in order to get debounce to work correctly

  const [nameString, setNameString] = useState(
    (localStorage.getItem("searchBy") == "name" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  const [nameString2, setNameString2] = useState(
    (localStorage.getItem("searchBy") == "name" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  //description query strings
  const [descriptionString, setDescriptionString] = useState(
    (localStorage.getItem("searchBy") == "description" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  const [descriptionString2, setDescriptionString2] = useState(
    (localStorage.getItem("searchBy") == "description" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  //type query strings
  const [typeString, setTypeString] = useState(
    (localStorage.getItem("searchBy") == "type" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  const [typeString2, setTypeString2] = useState(
    (localStorage.getItem("searchBy") == "type" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  //ability query strings
  const [abilityString, setAbilityString] = useState(
    (localStorage.getItem("searchBy") == "ability" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  const [abilityString2, setAbilityString2] = useState(
    (localStorage.getItem("searchBy") == "ability" &&
      localStorage.getItem("searchBar")) ||
      ""
  );
  //use debounce to make one request a maximum of every .7 seconds.
  const debouncedNameString = useCallback(
    debounce(() => handleChange2(), 700),
    []
  );

  //Gather all of my data with react-query's useQuery.
  //I can use this multiple times because the data is named differently for each one.
  //the key is the "name of the method" with the querystring2
  const pokemonQuery = usePokemon(page, nameString2, descriptionString2);
  const pokemonQueryByType = usePokemonByType(typeString2, page);
  const pokemonQueryByAbility = usePokemonByAbility(abilityString2, page);;

  const pokemonData = pokemonQuery.data;
  const pokemonDataByType = pokemonQueryByType.data;
  const pokemonDataByAbility = pokemonQueryByAbility.data;


  /**get the value in the input box and puts it into the nameString state, while pushing to the page with that nameString
   * It refetches the data after a change.
   */
  const handleChange = (e) => {
    localStorage.removeItem("searchBar");
    localStorage.setItem("searchBar", e.target.value);
    setNameString("");
    setDescriptionString("");
    setTypeString("");
    setAbilityString("");
    if (searchBy === "name") {
      setNameString(e.target.value);
    } else if (searchBy === "description") {
      setDescriptionString(e.target.value);
    } else if (searchBy === "type") {
      setTypeString(e.target.value);
    } else if (searchBy === "ability") {
      setAbilityString(e.target.value);
    }
    setPage(1);
    
    //this is where I name the debounce request.
    //I pass in searchBy so that handleChange2 knows what is selected in the Select box.
    debouncedNameString();
    navigate(`/pokedex/page/1`);
  };
  /** Once the query strings change, react-query automatically refetches all of the data using the querystring specified. */
  const handleChange2 = () => {
    const searchOf = localStorage.getItem("searchBy");
    const searchBar = localStorage.getItem("searchBar");
    setNameString2("");
    setDescriptionString2("");
    setTypeString2("");
    setAbilityString2("");
    if (searchOf === "name") {
      setNameString2(searchBar);
    } else if (searchOf === "description") {
      setDescriptionString2(searchBar);
    } else if (searchOf === "type") {
      setTypeString2(searchBar);
    } else if (searchOf === "ability") {
      setAbilityString2(searchBar);
    }
  };

  /**Go back one page, the current page and the url are synced up*/
  const back = () => {
  
    localStorage.setItem("page", pokemonData.meta.current_page - 1);
    setPage(pokemonData.meta.current_page - 1);
    navigate(`/pokedex/page/${parseInt(page) - 1}`);
  };
  /**Go forward one page */
  const forward = () => {
    localStorage.setItem("page", pokemonData.meta.current_page + 1);
    setPage(pokemonData.meta.current_page + 1);
    navigate(`/pokedex/page/${parseInt(page) + 1}`);
  };
  /** This is so that we refetch the correct data once the select box is changed */
  const selectSearch = (e) => {
    setSearchBy(e.target.value);
    localStorage.removeItem("searchBy");
    localStorage.setItem("searchBy", e.target.value);
    const mySearch = localStorage.getItem("searchBy");
    const searchBar = localStorage.getItem("searchBar");
    setNameString2("");
    setDescriptionString2("");
    setTypeString2("");
    setAbilityString2("");
    if (mySearch === "name") {
      setNameString2(searchBar);
    } else if (mySearch === "description") {
      setDescriptionString2(searchBar);
    } else if (mySearch === "type") {
      setTypeString2(searchBar);
    } else if (mySearch === "ability") {
      setAbilityString2(searchBar);
    } 
    localStorage.setItem("page", 1);
    setPage(1);
    navigate(`/pokedex/page/1`);
  };
  /** Gets the current data selected, so that we know what to display. */
  const currentdata = () => {
    switch (searchBy) {
      case "name":
      case "description":
        if (localStorage.getItem("searchBy") != "name") {
          localStorage.setItem("searchBy", "name");
        }
        return pokemonData;

      case "type":
        return pokemonDataByType;

      case "ability":
        return pokemonDataByAbility;

      default:
        return pokemonData;
    }
  };

  //jsx chunk to return
  return (
    <>
      <Navbar />
      {/* Set the bg color to #55A69C which is the same color as on the design */}
      <Box bg="bg" minHeight="95vh">
        <>
          <Grid templateColumns="1fr 3fr 1fr" gap={6} textAlign="center">
            <Box>
              {/* show the back arrow if the current page is greater than 1 */}
              {page > 1 && (
                <ButtonNav onClick={() => back()}>
                  <Icon name="arrow-back"><ArrowLeftIcon /> </Icon>
                </ButtonNav>
              )}
            </Box>
            <Box
              className={css`
                display: flex;
                justify-content: space-between;
                @media only screen and (max-width: 768px) {
                  flex-direction: column;
                }
              `}
            >
              <Box>
                <form autoComplete="off">
                  {/* Use the styled Input field provided by Chakra and change it a little bit. */}
                  <Input
                    className={css`
                      &::placeholder {
                        color: #458980;
                        font-weight: bolder;
                      }
                    `}
                    bg="#519F95"
                    px="10px"
                    py="10px"
                    mt="30px"
                    placeholder="Pok&eacute;dex"
                    border="none"
                    color="white"
                    fontSize="45px"
                    fontWeight="bolder"
                    onChange={handleChange}
                    value={
                      nameString ||
                      descriptionString ||
                      typeString ||
                      abilityString
                    }
                    autoFocus
                  ></Input>
                  {/* If refetch on handle change doesn't work, I can always use a search button */}
                  {/* <button type="submit">search</button> */}
                </form>
              </Box>
              <Box>
                <Select
                  mt="30px"
                  ml="40px"
                  height="60px"
                  width="200px"
                  name="selectSearch"
                  id="selectSearch"
                  value={searchBy}
                  onChange={selectSearch}
                >
                  <option value={"name"}>name</option>
                  <option value={"description"}>description</option>
                  <option value={"type"}>type</option>
                  <option value={"ability"}>ability</option>
                </Select>
              </Box>
            </Box>

            <Box>
              {/* Show the forward button if the current page is not equal to the last page */}

              {currentdata() &&
                localStorage.getItem("page") < currentdata().meta.last_page && (
                  <ButtonNav onClick={() => forward()}>
                    <Icon name="arrow-forward"><ArrowRightIcon/> </Icon>
                  </ButtonNav>
                )}
            </Box>
          </Grid>
          {queries.areAnyLoading(
            pokemonQuery,
            pokemonQueryByAbility,
            pokemonQueryByType,
          ) && <Placeholders.LoadingState />}
          {queries.areAnyFailed(
            pokemonQuery,
            pokemonQueryByAbility,
            pokemonQueryByType,
          ) && <Placeholders.FailedState />}
          {queries.areAllLoaded(
            pokemonQuery,
            pokemonQueryByAbility,
            pokemonQueryByType,
          ) && (
            <>
              {/* Use framer motion for a cool animation */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Box mx="20px" py="20px">
                  {/* Show cards using a grid with auto-fit and minmax for responsiveness*/}
                  <Grid
                    templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                    gap={6}
                  >
                    {/* Map through the pokemon data and show each pokemon on a PokemonCard Component */}
                    {currentdata().data.length === 0 ? (
                      <NoPokemon />
                    ) : (
                      currentdata().data.map((pokemon) => (
                        <Link
                          key={pokemon.id}
                          href={`/pokedex/detail/${pokemon.id}`}
                        >
                          <PokemonCard
                            pokemon={pokemon}
                          />
                        </Link>
                      ))
                    )}
                  </Grid>
                </Box>
              </motion.div>
            </>
          )}
        </>
      </Box>
    </>
  );
}

/**use the idea from Adrian to show a magikarp when nothing is found when searching */
function NoPokemon() {
  return (
    <div>
      <Box textAlign="center" fontSize="40px" color="white" pb="20px">
        We Only Found a Magikarp
      </Box>
      <Link  key={129} href={`/pokedex/detail/${129}`}>
        <PokemonCard
          pokemon={{
            id: 129,
            sprite:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
            name: "Magikarp",
            types: ["water"],
          }}
        />
      </Link>
    </div>
  );
}
