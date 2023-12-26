import React, { useState } from "react";
import Layout from "./../components/Layout";

import axios from "axios";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
// http://www.omdbapi.com/?i=tt3896198&apikey=8f86dc6c
const HomePage = () => {
  const location = useLocation();
  console.log(location.state);
  const [movie, setMovie] = useState("");
  const [available, setAvailable] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [plot, setPlot] = useState("");

  const searchMovie = async (m) => {
    await axios
      .get(`http://www.omdbapi.com/?t=${m}&apikey=8f86dc6c`)
      .then((res) => {
        if (res.data.Response === "True") {
          setAvailable(true);
          setImdbRating(res.data.imdbRating);
          setTitle(res.data.Title);
          setPoster(res.data.Poster);
          setImdbId(res.data.imdbID);
          setPlot(res.data.Plot);
          console.log(available, imdbRating, title, poster, imdbId);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchMovie(movie);
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter movie name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <Card
        movie={{
          email: location.state,
          available,
          imdbRating,
          title,
          poster,
          imdbId,
          plot,
        }}
      />
    </Layout>
  );
};

export default HomePage;
