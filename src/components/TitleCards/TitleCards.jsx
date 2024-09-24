import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  // this is used for horizontal scroll

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTg0NTBiNDhjYjM4ODhjMjgxOTE3MWQ5Mzc0MzVjNiIsIm5iZiI6MTcyNjY4MjMwOC4zMjQ4Nywic3ViIjoiNjZlOWRmZDJiNjY3NDZkZDc5MGFmOGUyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.29sQHO0WwC7YwMpVo0ooJFdErZ1Knd3aQwJgjttUIkw",
    },
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${
          category ? category : "now_playing"
        }?language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => setApiData(response.results))
        .catch((err) => console.error(err));
      cardsRef.current.addEventListener("wheel", handleWheel);
    } catch (error) {
      console.log("the error is ", error);
    }
  }, []);
  // end for horizontal scroll

  return (
    <div className="title-cards">
      <h2>{title ? title : "Polular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
