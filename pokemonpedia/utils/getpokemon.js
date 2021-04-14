const getpokemonsfromlocal = ()=> {
    console.log(JSON.parse(localStorage.getItem("mypokemons")))
    return (JSON.parse(localStorage.getItem("mypokemons")))
  }

module.exports = getpokemonsfromlocal