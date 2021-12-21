import { Axios } from "axios";
import { useEffect, useState } from "react";
import { API } from "../../config/Api";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailPoke = () => {
  const [listpoke, setListpoke] = useState([]);

  const params = useParams();
  const { id } = params;

  const handleListPoke = async () => {
    try {
      const response = await API.get(`/detailpoke/${id}`);
      setListpoke(response.data.data.getData);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("data dari response", listpoke);
  useEffect(() => {
    handleListPoke();
  }, []);
  return (
    <div>
      <Card style={{ width: "18rem" }} className="bg-dark text-white">
        {listpoke.sprites ? (
          <Card.Img
            variant="top"
            src={listpoke?.sprites.other.dream_world.front_default}
          />
        ) : null}

        <Card.Body>
          <Card.Title>{listpoke?.name}</Card.Title>
          <Card.Text>Height : {listpoke?.height}</Card.Text>
          <Card.Text>Weight : {listpoke?.weight}</Card.Text>
          {/* {listpoke?.map((listpoke, index) => (
            <div className="col" key={listpoke.types + index}>
              <Card.Text listpoke={listpoke} />
            </div>
          ))} */}
          {/* <Card.Text>Base Stat : {listpoke?.stats[0]}</Card.Text> */}
          <Button variant="danger">Catch Poke</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetailPoke;
