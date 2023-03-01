import React, { useEffect, useState } from "react";
import Carusel from "../carusel/Carusel";
import s from "./home.module.css";
import Properties from "../properties/Properties";
import Recommendat from "../category/Category";
import Item from "../item/Item";

import axios from "../../api";
import { useSelector } from "react-redux";

const Home = () => {
  const [base, setBase] = useState([]);
  const [loading, setLoading] = useState(false);
  const reload = useSelector((s) => s.reload);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/products")
      .then((res) => {
        setBase(res.data.data || []);
        if (res.data.state) {
          setLoading(false);
        }
      })
      .catch((err) => console.log("err>>", err));
  }, [reload]);

  return (
    <div className="container">
      <Carusel />
      <Recommendat />
      {!loading ? <Properties base={base} /> : ""}
      {!loading ? <Item base={base} /> : ""}
    </div>
  );
};

export default Home;
