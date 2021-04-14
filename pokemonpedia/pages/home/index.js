import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Card, Container, Button, Form, Modal, Row } from "react-bootstrap";

import { GET_POKEMONS } from "../../schema";

const HomeIndex = () => {
  const router = useRouter();

  const [pokemons, setPokemons] = useState([]);

  const [page, setPage] = useState(1);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleShowSuccess = () => {
    setShowSuccess(true);
    setPokemonNickname("");
    setErrorSameName(false);
  };
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setPokemonNickname("");
    setErrorSameName(false);
  };

  const [showFailed, setShowFailed] = useState(false);
  const handleShowFailed = () => setShowFailed(true);
  const handleCloseFailed = () => setShowFailed(false);

  const [catchedPokemon, setCatchedPokemon] = useState({});
  const [pokemonNickname, setPokemonNickname] = useState("");

  const [errorSameName, setErrorSameName] = useState(false);

  const saveToMyPokemon = () => {
    let checkPokemon = localStorage.getItem("mypokemons");

    if (!checkPokemon) {
      localStorage.setItem("mypokemons", "[]");
    }

    let myPokemon = localStorage.getItem("mypokemons");
    let arrMyPokemon = JSON.parse(myPokemon);

    let getNicknames = arrMyPokemon.filter(function (item) {
      return item.nickname === pokemonNickname;
    });
    if (getNicknames.length > 0) {
      console.log("ada nama yang sama");
      setErrorSameName(true);
    } else {
      console.log("ga ada nama yang sama");
      setErrorSameName(false);
      arrMyPokemon.push({ nickname: pokemonNickname, ...catchedPokemon });
      localStorage.setItem("mypokemons", JSON.stringify(arrMyPokemon));
      handleCloseSuccess();
    }
  };
  function handleChange(e) {
    console.log(e.target.value);
    setPokemonNickname(e.target.value);
  }

  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    variables: { limit: 6, offset: page },
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemons.results);
    }
  }, [data]);

  const catchPokemon = (pokemon) => {
    let catched;
    
    if (Math.floor(Math.random() * 2) === 1) {
      catched = true;
      setCatchedPokemon(pokemon);
    } else {
      catched = false;
    }

    if (!catched) {
      handleShowFailed();
    } else {
      handleShowSuccess();
    }
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Failed fetching pokemons</p>;

  return (
    <>
      <div class="navbar">
        <h1>Pokemon List</h1>
        <Button variant="info" onClick={() => router.push(`/mylistpokemon`)}>
          Go To My Pokemon
        </Button>
      </div>

      <Container>
        <Row>
          <div class="d-flex flex-wrap justify-content-center">
            {pokemons.map((item, index) => {
              return (
                <Card
                  style={{
                    width: "18rem",
                    marginRight: "10pt",
                    marginBottom: "20pt",
                  }}
                >
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => catchPokemon(item)}
                    >
                      Catch
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Row>
        <Row>
          <div class="d-flex w-100 justify-content-center">
            <Button
              variant="info"
              disabled={page === 1}
              onClick={() => setPage(page - 6)}
            >
              Previous
            </Button>
            <div class="ml-4"></div>
            <Button variant="info" onClick={() => setPage(page + 6)}>
              Next
            </Button>
          </div>
        </Row>
      </Container>
      <Modal show={showFailed} onHide={handleCloseFailed}>
        <Modal.Header closeButton>
          <Modal.Title>Failed to catch</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wooooosh, pokemon run away!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFailed}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Success to catch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Nickname</Form.Label>
              <Form.Control
                onChange={handleChange}
                placeholder="give it nickname.."
              />
              {errorSameName && (
                <Form.Text className="alert alert-danger ">
                  Nickname already in use!
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveToMyPokemon}>
            Give nickname
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeIndex;
