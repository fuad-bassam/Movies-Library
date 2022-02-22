
const express = require("express");
const moviesJson = require("./Movie Data/movies.json");
const app = express();

const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const APIKEY = process.env.APIKEY;

function moviesDTO(id ,title, release_date, poster_path,overview) {
  this.id=id;
    this.title = title;
    this.release_date =release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    
}



function favoriteHandler(request, response) {

    console.log(moviesJson);
    response.send("Welcome to Favorite Page");
};


function mainPageHandler(request, response) {

    const listMovies = [];
    moviesJson.mov.forEach(element => {
        var catchMovie = new moviesDTO(element.title, element.poster_path, element.overview)
        listMovies.push(catchMovie)

    })
    return response.json(listMovies);
}

function trendingAPlHandler(request, response) {
    let result = [];
    let res= axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let movieCard = new Movie(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(movieCard);
            });
            return response.status(200).json(result);
        }).catch(error => {
            errorHandler(error, request, response);
        });
};

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

function searchHandler(request, response) {

    response.send("Welcome to search Page");
    const search = req.query.Movie;
    let result = [];
    console.log(request);
    let res = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}&page=2`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let oneMovie = new Movie(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(oneMovie);
            });
            return response.status(200).json(result);
        }).catch(error => {
            errorHandler(error, request, response);
        });
};

function personHandler(request, response) {

    response.send("Welcome to search Page");
    const search = req.query.Movie;
    let result = [];
    console.log(request);
    let res = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}&page=2`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let oneMovie = new Movie(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(oneMovie);
            });
            return response.status(200).json(result);
        }).catch(error => {
            errorHandler(error, request, response);
        });
};

function jobsHandler(request, response) {

    response.send("Welcome to jobs Page");
  
    let result = [];
    // console.log(request);
    let res = axios.get(`https://api.themoviedb.org/3/configuration/jobs?api_key=${APIKEY}`)
        .then(apiResponse => {
            // apiResponse.data.results.map(value => {
            //     let oneMovie = new Movie(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
            //     result.push(oneMovie);
            // });
            console.log(apiResponse.data);
            return response.status(200).json(result);
        }).catch(error => {
            errorHandler(error, request, response);
        });
};

function errorHandler(request, response) {

    if (response.status == 404) {
        return response.status(404).send("page not found error");
    } else if (response.status == 500) {
        return response.status(500).send("server error");

    }
    return response.status(404).send("page not found error");

}
app.get('/trending', trendingAPlHandler);
app.get('/favorite', favoriteHandler);
app.get('/search', searchHandler);
app.get('/person',personHandler);
app.get('/jobs',jobsHandler);
app.get('/', mainPageHandler);
app.use('*', errorHandler);

// GET/configuration/jobs
// //{person_id}
// /movie/{movie_id}/images


app.listen(3000, () => {

    console.log("srever on")

});