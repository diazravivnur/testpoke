import { Form, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/Api";

const ListPoke = (poke) => {
  const [Poke, setPoke] = useState("");

  const handleListPoke = async () => {
    try {
      const response = await API.get("/listpoke");
      setPoke(response.data.data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleListPoke();
  }, []);
  return (
    <div>
      <div>
        <p>POKEMON LIST</p>
      </div>
      <Button
        onClick={() => {
          handleListPoke();
        }}
        variant="primary"
      >
        Get List Pokemon
      </Button>
      {Poke &&
        Poke.map((poke, index) => (
          <div key={poke.id + index}>
            <div className="header">
              {/* <p>Poke Name : {poke.name} </p> */}
            </div>
            <Table
              striped
              bordered
              hover
              size="sm"
              variant="dark"
              //   onClick={goToPage}
            >
              {" "}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th> Detail</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr>
                  <td>{poke.id}</td>
                  <td>{poke.name}</td>
                  <td>
                    {" "}
                    <Link
                      to={{
                        pathname: `/detailpoke/${poke.id}`
                      }}
                    >
                      <img src={poke.image} className="img-dono" href></img>
                    </Link>
                  </td>{" "}
                  <td>
                    <Button variant="dark">
                      <Link
                        to={{
                          pathname: `/detailpoke/${poke.id}`
                        }}
                      >
                        Detail
                      </Link>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
      <div className="col-sm 5">
        <br></br>
      </div>
    </div>
  );
};

export default ListPoke;
