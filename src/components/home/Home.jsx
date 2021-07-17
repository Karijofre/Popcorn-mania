import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../service';


export function Home () {

    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(()=>{
        const fetchAPI = async () =>{
            setNowPlaying(await fetchMovies());
        };

        fetchAPI()
    },[]);

    const movies = nowPlaying.slice(0, 5).map((item, index) =>{
        return(
            <div style= {{width: "500"}} key= {index}>
                <div className= "carousel-center">
                    <img style= {{height: 600}} src= {item.backPoster} alt= {item.title} />

                </div>
            </div>
        );
    });

    return (
        <div className= "container">
            <div className= "row">
                <div className= "col">
                    <Carousel
                    
                        autoplay= {true}
                        pauseOnVisibility= {true}
                        slidesShowSpeed= {5000}
                        version= {4}
                        indicators = {false}

                    >
                        {movies}

                    </Carousel>

                </div>

            </div>

        </div>
    );
};

export default Home;