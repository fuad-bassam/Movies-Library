
const express = require("express");
const moviesJson = require("./Movie Data/movies.json");
const cors = require("cors");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");


app.use(cors());
dotenv.config();
const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const pg = require("pg");
const { disable } = require("express/lib/application");

// connection in local 
// const client = new pg.Client(DATABASE_URL);


// connection in heroku
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});



function moviesDTO(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
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

//  use this in the browser http://localhost:3000/trending 

function trendingAPlHandler(request, response) {
    let result = [];
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let movieCard = new moviesDTO(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(movieCard);
            });
            return response.status(200).json(result);
        }).catch(error => {
           errorHandler(error,request, response );
        });
};

//  use this in the browser  http://localhost:3000/search?query=brad

function searchHandler(request, response) {

    // response.send("Welcome to search Page");
    const search = request.query.query;
    let result = [];
    console.log(search)
    // console.log(request);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let movieCard = new moviesDTO(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(movieCard);
            });
            return response.status(200).json(result);
        }).catch(error => {
           errorHandler(error,request, response );
        });
};


//  use this in the browser     http://localhost:3000/popular

function popularHandler(request, response) {

    let result = [];
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let movieCard = new moviesDTO(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(movieCard);
            });
            return response.status(200).json(result);
        }).catch(error => {
            errorHandler(error,request, response );

        });
};



//  use this in the browser  http://localhost:3000/jobs

function jobsHandler(request, response) {


    // console.log(request);
    axios.get(`https://api.themoviedb.org/3/configuration/jobs?api_key=${APIKEY}`)
        .then(apiResponse => {

            return response.status(200).json(apiResponse.data);
        }).catch(error => {
           errorHandler(error,request, response );
        });
};



function fuadMovieHandler(request, response) {
    const postBody = request.body;
    const sql = `INSERT INTO fuadMovie(title,release_date,poster_path,overview,user_comment) VALUES($1,$2,$3,$4,$5) RETURNING *;`;

    const values = [postBody.title, postBody.release_date, postBody.poster_path, postBody.overview ,postBody.user_comment];


    client.query(sql,values).then((result) => {
        response.status(201).json(result.rows);
    }).catch(error => {
       errorHandler(error,request, response );
    });
};
function getMoviesHandler(request, response) {
    const sql = `SELECT * FROM fuadMovie;`;
    client.query(sql).then((result) => {
        response.status(201).json(result.rows);
    }).catch(error => {
       errorHandler(error,request, response );
    });
}


function errorHandler(error,request, response ,next ) {

    // if (response.status == 404) {



    //      response.status(404).send("page not found error");

    // } else if (response.status == 500) {

    //      response.status(500).send("server error");

    // }


    // return response.status(404).send("page not found error");



    const obj = {

        status: 500,
        error: error.message

    }
    response.status(500).send(obj);

}


function notFoundHandler(request, response) {

    const obj = {

        status: 404,
        error: "not found"

    }
    response.status(404).send(obj);

}

//////////////////////////////////////////////////////
function similarHandler(request, response) {

    const movie_id = request.query.id1
    let result = [];
    console.log(movie_id);
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${APIKEY}&language=en-US&page=1
   `)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let movieCard = new moviesDTO(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
                result.push(movieCard);
            });
            return response.status(200).json(result);
        }).catch(error => {
           errorHandler(error,request, response );
        });
};

///////////////////////////////////////////////////////////

//  use this in the browser http://localhost:3000/updata/8 and add data in the

function updateHandler(request, response) {
    const id = request.params.id;
    const movieUpdate = request.body;
console.log(movieUpdate);
    const sql = `UPDATE fuadMovie SET title=$1, release_date=$2, poster_path=$3, overview=$4  WHERE id=$5 RETURNING *;`;
    const values = [ movieUpdate.title, movieUpdate.release_date, movieUpdate.poster_path, movieUpdate.overview , id];

    client.query(sql, values).then((result) => {
        return response.status(200).json(result.rows);
    }).catch((error) => {
        
        errorHandler(error, request, response);
    })
}

//  use this in the browser http://localhost:3000/delete/8



function deleteHandler(request, response) {
    const id = request.params.id;

    const sql = `DELETE FROM fuadMovie WHERE id=$1 ;`;
    const value = [id];

    client.query(sql, value)
        .then((result) => {
            return response.status(204).json({});
        }).catch((error) => {
            errorHandler(error, request, response);
        })
}

//  use this in the browser http://localhost:3000/getMovie/8


function getMovieByIdHandler(request, response) {
    const id = request.params.id;

    const sql = `SELECT * FROM fuadMovie WHERE id=${id} ;`;

    client.query(sql)
        .then((result) => {
            return response.status(200).json(result.rows);
        }).catch((error) => {
            errorHandler(error, request, response);
        })

}


////////////////////////////////////////
app.use(express.json());
app.get('/trending', trendingAPlHandler);
app.get('/favorite', favoriteHandler);
app.get('/search', searchHandler);
app.get('/jobs', jobsHandler);
app.get('/popular', popularHandler);
app.get('/', mainPageHandler);
app.post('/addMovie', fuadMovieHandler);
app.get('/getMovies', getMoviesHandler);
app.get('/similar', similarHandler);
app.put('/updata/:id', updateHandler);
app.delete('/delete/:id', deleteHandler);
app.get('/getMovie/:id', getMovieByIdHandler);
//not :above each function example how can you use it

app.use( notFoundHandler);
app.use( errorHandler);


client.connect()
.then(()=>{
app.listen(PORT, () => {

    console.log("srever on ,Port " + PORT)

});

});