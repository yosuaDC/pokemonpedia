// import getpokemonsfromlocal from "../utils/getpokemon";

const getpokemonsfromlocal = require("../utils/getpokemon");
describe("Fetching data from localstorage", () => {
  test("should return pokemon list from localstorage", () => {
    localStorage.setItem(
      "mypokemons",
      JSON.stringify([
        {
          nickname: "ipong",
          __typename: "PokemonItem",
          name: "ivysaur",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
        {
          nickname: "yuds",
          __typename: "PokemonItem",
          name: "charmander",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        },
      ])
    );

    expect(getpokemonsfromlocal()).toEqual(
      [
        {
          __typename: "PokemonItem",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          name: "ivysaur",
          nickname: "ipong",
        },
        {
          __typename: "PokemonItem",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          name: "charmander",
          nickname: "yuds",
        },
      ]
    );
    localStorage.setItem("mypokemons", "[]");
  });
});
