//import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import React, { useEffect, useState } from 'react';
import { fetchGenre, fetchMovies, fetchMovieByGenre, fetchPersons, fetchTopRatedMovie } from '../../service';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";





export function Home () {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () =>{
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons());
            setTopRated(await fetchTopRatedMovie());
        };

        fetchAPI();
    },[]);

    const handleGenreClick = async (genre_id) =>{
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    };

    const movies = nowPlaying.slice(0, 10).map((item, index) =>{
        //Muestra el carrousel con sus botones a sus costados 
        return(
            <div style= {{ height: 500, width: "100%" }} key= {index}>
                <div className= "carousel-center">
                    <img style= {{height: 500, width: 900 }} src= {item.backPoster} alt= {item.title} />

                </div>
                 <div className= "carousel-center">
                    {/* <i className= "far fa-play-circle" style={{fontSize: 95, color: "#0f9ee8"}} ></i> */}
                </div> 
                <div className= "carousel-caption"
                     style={{textAlign: "center", fontSize: 35}} 
                     >
                        {item.title}
                    </div>
                    
            </div>
        );
    });

    //Genero una lista variada de géneros clickleables
    const genreList = genres.map((item, index) =>{
        return(
            <li className= "list-inline-item" key={index}>
                <button 
                    type= "button"
                    className= "btn btn-outline-info" 
                    onClick={() => {
                      handleGenreClick(item.id);
                    }}>
                    {item.name}

                </button>

            </li>
        );
    });

    const movieList = movieByGenre.slice(0, 4).map((item, index)=>{
        return(
            <div className= "col-md-3 col-sm-6" key={index}>
                <div className= "card">
                    <Link to ={`/movie/${item.id}`}>
                        <img className= "img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>

                </div>
                <div className= "mt-3">
                    <p style= {{fontWeight: "bolder"}}>{item.title}</p>
                    <p>More Rated: {item.rating}</p>
                    <ReactStars 
                    count={item.rating} 
                    size={20} 
                    color1={"#f4c10f"}
                    ></ReactStars>

                </div>

            </div>
        );
    });

    const trendingPersons = persons.slice(0, 4).map((p, i) =>{
        return(
            <div className= "col-md-3 text-center" key={i}>
                <img className= "img-fluid rounded-circle mx-auto d-block" 
                src={p.profileImg} 
                alt={p.name}
                ></img>
                <p className= "font-weight-bold text-center">{p.name}</p>
                <p className= "font-weight-light text-center" style={{color:"#0f9ee8"}}>
                    Trending for {p.known}
                </p>   

            </div>
        );
    });

    const topRatedList = topRated.slice(0, 4).map((item, index) =>{
        return(
            <div className= "cold-md-3" key={index}>
                <div className= "card">
                    <Link to={`/movie/${item.id}`}>
                        <img className= "img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>

                </div>
                <div className= "mt-3">
                    <p style= {{fontWeight: "bolder"}}>{item.title}</p>
                    <p>More Rated: {item.rating}</p>
                    <ReactStars 
                    count={item.rating} 
                    size={20} 
                    color1={"#f4c10f"}
                    ></ReactStars>

                </div>

            </div>
        );
    });

    return (
        <div className= "container">
            <div className= "row mt-2">
                <div className= "col">
                    <Carousel 
                        autoPlay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4}
                        indicators ={false}
                    >
                        {movies}
                    </Carousel>

                </div>

            </div>

            <div className= "row mt-3">
                <div className= "col">
                    <ul className= "list-inline">{genreList}</ul>

                </div>

            </div>
            
            <div className= "row mt-3">
                <div className= "col">
                    <div className= "float-right">
                        <i className= "far fa-arrow-alt-circle-right"></i>

                    </div>

                </div>

            </div>
            <div className= "row mt-3">{movieList}</div>

            <div className= "row mt-3">
                <div className= "col">
                    <p className= "font-weight-bold" style={{color:"#0f9ee8"}}>
                        TRENDING PERSONS ON THIS WEEK
                    </p>

                </div>
            </div>

            <div className= "row mt-3">
                <div className= "col">
                    <div className= "float-right">
                        <i className= "far fa-arrow-alt-circle-right"></i>

                    </div>

                </div>

            </div>

            <div className= "row mt-3">
                {trendingPersons}
            </div>
            <div className= "row mt-3">
                <div className= "col">
                    <p className= "font-weight-bold" style={{color:"#0f9ee8"}}>
                        TOP RATED MOVIES
                    </p>

                </div>

            </div>
            <div className= "row mt-3">
                <div className= "col">
                    <div className= "float-right">
                        <i className= "far fa-arrow-alt-circle-right"></i>

                    </div>

                </div>

            </div>
            <div className= "row row-cols-1 row-cols-sm-2 row-cols-md-4">{topRatedList}</div>

            <hr className= "mt-5" style={{borderTop: "1px solid #0f9ee8"}}></hr>
            <div className= "row mt-3">
                <div className= "col-md-8 col-sm-6" style={{color:"#0f9ee8"}}>
                    <p>MADE BY KARINA WITH ❤</p>
                </div>

            </div>



        </div>
        
    );
};

export default Home;