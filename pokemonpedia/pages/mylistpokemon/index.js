import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Container, Button, Row } from "react-bootstrap";
import getpokemonsfromlocal from "../../utils/getpokemon"
const MyListPokemonIndex = () => {
  const router = useRouter();

  const [myPokemons, setMyPokemons] = useState([]);
  
  // const getpokemonsfromlocal = ()=> {
  //   return (JSON.parse(localStorage.getItem("mypokemons")))
  // }

  useEffect(() => {
    let x = getpokemonsfromlocal()
    if (x) {
      setMyPokemons(x)
    }
  }, []);

  if (!myPokemons) {
    return <h2>You have no catched pokemon</h2>;
  }

  if (myPokemons.length === 0) {
    return <h2>You have no catched pokemon</h2>;
  }

  return (
    <>
      <h1>My Pokemon</h1>
      <Container>
        <Row>
          <div class="d-flex flex-wrap">
            {myPokemons.map((item, index) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.nickname}</Card.Title>
                    <Card.Title>{item.name}</Card.Title>

                    <Button
                      variant="primary"
                      onClick={() =>
                        router.push({
                          pathname: `/detailpokemon/${item.name}`,
                          query: {url: item.image, nickname: item.nickname},
                        })
                      }
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MyListPokemonIndex;
