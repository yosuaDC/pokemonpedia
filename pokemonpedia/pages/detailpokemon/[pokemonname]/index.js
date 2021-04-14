import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { GET_POKEMON_DETAIL } from "../../../schema";
import { Card, Container, Button, Row, Badge } from "react-bootstrap";

const DetailPokemonIndex = () => {
  const router = useRouter();
  const { pokemonname } = router.query;

  const [pokemonDetail, setPokemonDetail] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: pokemonname },
  });

  useEffect(() => {
    if (pokemonname) {
      refetch();
    }
  }, [pokemonname]);

  useEffect(() => {
    if (data) {
      setPokemonDetail(data.pokemon);
      console.log(router);
    }
  }, [data]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <div class="container-fluid">
        <Card.Title>Pokemon Detail</Card.Title>
        <Card style={{ width: "30rem" }}>
          <div class="container">
            <Card.Img variant="top" src={router.query.url} />
          </div>
          <Card.Body>
            <div class="row">
              <div class="col-3">Name</div>
              <div class="col-9">{pokemonDetail?.name}</div>

              <div class="col-3">Nick name</div>
              <div class="col-9">{router.query.nickname}</div>

              <div class="w-100"></div>
              <div class="col-3">Types</div>
              <div class="col-9">
                {pokemonDetail?.types.map((item, index) => {
                  return <Badge variant="warning">{item.type.name}</Badge>;
                })}
              </div>

              <div class="col-3">Abilities</div>
              <div class="col-9">
                {" "}
                {pokemonDetail?.abilities.map((item, index) => {
                  return <Badge variant="success">{item.ability.name}</Badge>;
                })}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default DetailPokemonIndex;
