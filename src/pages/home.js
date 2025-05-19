import React, { useEffect, useState } from "react";
import { API } from "../services/api";

function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/hello")
      .then((res) => setMsg(res.data.message))
      .catch((err) => console.log(err));
  }, []);

  return <h1>{msg}</h1>;
}

export default Home;
