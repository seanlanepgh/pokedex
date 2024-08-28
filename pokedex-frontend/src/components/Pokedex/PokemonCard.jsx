import React, { memo } from "react";

//styled component imports
import { Line, Types } from "../GlobalStyles";
import { PokeCard } from "./Styles";
import { Box, Icon } from "@chakra-ui/react";

/**
 * The PokemonCard functional Component to be rendered inside the PokemonList Component.
 * @param - the pokemon object
 */
const PokemonCard = ({ pokemon}) => {

  return (
    //styled component PokeCard
    <PokeCard color={pokemon.types[0]}>
      <Box d="flex" justifyContent="space-between">
        <Box py="15px" textAlign="left" pl="15px">
          {pokemon.name}
        </Box>
      </Box>

      <Line></Line>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        width="200px"
        height="200px"
      />

      <Box pr="15px" d="flex" justifyContent="flex-end">
        {/* Map through the types and show them */}
        {pokemon.types.map((type) => (
          <Types key={type} bg={type + "background"} color={type}>
            {type}
          </Types>
        ))}
      </Box>
    </PokeCard>
  );
};

//memo this component to prevent some re-renders
export default memo(PokemonCard);
