import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5500/api/poke/"
});

export const APIPoke = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/"
});
