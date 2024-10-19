import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://qhpezdlwwttucouzzkmy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-10-19T18%3A45%3A31.888Z"
        alt=""
      />
    </Row>
  );
}

export default Cabins;
