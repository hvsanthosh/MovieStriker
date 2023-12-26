import toast from "react-hot-toast";
import axios from "axios";
import React from "react";

// {
//   /* <Card movie={{ email,available, imdbRating, title, poster, imdbId }} /> */
// }

const Card = ({ movie }) => {
  console.log(movie);
  const handleSubmitPlaylist = async (e) => {
    e.preventDefault();
    try {
      // handle api request
      console.log(movie);
      const { email, imdbId } = movie;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/playlist`,
        { email, movieId: imdbId }
      );
      console.log(res);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  if (movie.available === true) {
    return (
      <>
        <form onSubmit={handleSubmitPlaylist}>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={movie.poster}
              className="card-img-top"
              alt="movie poster not available"
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.plot}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">IMDB ID: {movie.imdbId}</li>
              <li className="list-group-item">
                IMDB RATING: {movie.imdbRating}
              </li>
            </ul>
            <div className="card-body">
              <button type="submit" className="btn btn-primary">
                Add To Playlist
              </button>
            </div>
          </div>
        </form>
      </>
    );
  } else if (movie.available === false) {
    return <h1>movie not found</h1>;
  } else {
    return <h1>search movie</h1>;
  }
};

export default Card;
