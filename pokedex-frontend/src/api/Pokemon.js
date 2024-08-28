import { API_BASE_URL } from "../config";

export async function GetPokemon(page, name, description) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/?page=${page}&name=${name}&description=${description}`,
    {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "access-control-allow-origin" : "*",
        "content-type": "application/json",
        accept: "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    }
  );
  const data = await response.json();
  return data;
}
export async function GetPokemonByType(type, page) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/type/?type=${type}&page=${page}`,
    {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    }
  );
  const data = await response.json();
  return data;
}
export async function GetPokemonByAbility(ability, page) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/ability/?ability=${ability}&page=${page}`,
    {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    }
  );
  const data = await response.json();
  return data;
}
export async function GetSinglePokemon(id) {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
  });
  const data = await response.json();
  console.log(data);
  return data;
}
export async function GetAllPokemon(key) {
  const response = await fetch(`${API_BASE_URL}/allPokemon`, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
  });
  const data = await response.json();
  console.log(data);
  return data;
}
