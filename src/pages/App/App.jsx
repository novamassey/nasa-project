import "./App.css";
import Axios from "axios";
import { useCallback, useState } from "react";

import Nav from "../../components/Nav/Nav";

function App() {
  const [info, setInfo] = useState([]);
  const [requestError, setRequestError] = useState();

  const apiURL =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=";
  const key = process.env.REACT_APP_API_KEY;

  const fetchData = useCallback(async () => {
    try {
      const result = await Axios.get(`${apiURL}${key}`);
      console.log(result.data);
      setInfo(result.data);
    } catch (err) {
      setRequestError(err.message);
    }
  });

  // const DEMO_KEY = process.env.DEMO_KEY;

  // const getNasa = () => {
  //   Axios.get(
  //     "https://api.nasa.gov/planetary/apod?api_key=DFSit2HVwoqIrhoVuDnWR9WnLbUzteB2S9njk58v"
  //   ).then((response) => {
  //     console.log(response);
  //     setInfo(
  //       response.data.title + response.data.explanation + response.data.url
  //     );
  //   });
  // };

  // const getNasa = async () => {
  //   await fetch(
  //     "https://api.nasa.gov/EPIC/api/natural/images?api_key=DFSit2HVwoqIrhoVuDnWR9WnLbUzteB2S9njk58v"
  //   ).then((response) =>
  //     response.json().then((data) => {
  //       console.log(data);
  //       setInfo([data]);
  //       console.log(info);
  //     })
  //   );
  // };

  // const nasaData = info.map((i) => {
  //   return i;
  // });

  return (
    <div className="App">
      <Nav />
      <button onClick={fetchData}>Get NASA DATA</button>

      <div></div>
    </div>
  );
}

export default App;
