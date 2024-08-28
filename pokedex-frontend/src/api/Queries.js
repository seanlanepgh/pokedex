import { useQuery } from '@tanstack/react-query';
import * as api from "./Pokemon";

const fetchPokemon = async (page, nameString, descriptionString) => {
  try {
    const res = await api.GetPokemon(page, nameString, descriptionString);
    const { data } = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
}

export const usePokemon = (page, nameString, descriptionString) => {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ["getPokemon", page, nameString, descriptionString],
    queryFn: () => fetchPokemon(page, nameString, descriptionString)
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};

const fetchPokemonByType = async (searchString, page) => {
  try {
    const res = await api.GetPokemonByType(searchString, page);
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export const usePokemonByType = (searchString, page) => {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ["getPokemonByType", searchString, page],
    queryFn: () => fetchPokemonByType(searchString, page)
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};

const fetchPokemonByAbitity = async (searchString, page) => {
  try {
    const res = await api.GetPokemonByAbility(searchString, page);
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export const usePokemonByAbility = (searchString, page) => {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ["getPokemonByAbility", searchString, page],
    queryFn: () => fetchPokemonByAbitity(searchString, page)
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};


const fetchSinglePokemon = async (id) => {
  try {
    const res = await api.GetSinglePokemon(id);
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export const useGetSinglePokemon = (id) => {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ["GetSinglePokemon", id],
    queryFn: () => fetchSinglePokemon(id)
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
};

