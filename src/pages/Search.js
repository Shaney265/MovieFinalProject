import React, { useState, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { FBDbContext } from '../contexts/FBDbContext';
import { firebaseConfig } from "../config/Config.js";

// Initialize Firebase app
initializeApp(firebaseConfig);

export function Search(props) {
    const [movies, setFilms] = useState([]);
    const [searchType, setSearchType] = useState("title");
    const [searchValue, setSearchValue] = useState("");

    const FBDb = useContext(FBDbContext);
  
    const handleSearchTypeChange = (event) => {
      setSearchType(event.target.value);
    };
  
    const handleSearchValueChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchFilms();
    };
  
    const fetchFilms = async () => {
      const db = getFirestore();
      const filmsCollection = collection(FBDb, "movies");
      let q;
  
      switch (searchType) {
        case "title":
          q = query(filmsCollection, where("title", "==", searchValue));
          break;
        case "year":
          q = query(filmsCollection, where("year", "==", parseInt(searchValue)));
          break;
        case "director":
          q = query(filmsCollection, where("director", "==", searchValue));
          break;
        case "genre":
          q = query(filmsCollection, where("genre", "==", searchValue));
          break;
        default:
          q = filmsCollection;
      }
  
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFilms(data);
    };
  
    useEffect(() => {
      fetchFilms();
    }, []);
  
    return (
    <Container >
        <Col>
      <div>
        <h2>Search Films</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="title"
                checked={searchType === "title"}
                onChange={handleSearchTypeChange}
              />
              Search by Title 
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="year"
                checked={searchType === "year"}
                onChange={handleSearchTypeChange}
              />
              Search by Year
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="director"
                checked={searchType === "director"}
                onChange={handleSearchTypeChange}
              />
              Search by Director
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="genre"
                checked={searchType === "genre"}
                onChange={handleSearchTypeChange}
              />
              Search by Genre
            </label>
          </div>
          <div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchValueChange}
              placeholder={`Enter ${searchType}...`}
            />
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
        {/* Render movies data */}
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.searchname}</h3>
            <p>Year: {movie.year}</p>
            <p>Time: {movie.genre}</p>
            <p>Director: {movie.directors}</p>
            
          </div>
        ))}
         </div>
        </Col>
    </Container >
    );
  }