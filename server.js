

const pg = require("pg");
const DATABASE_URL = process.env.DATABASE_URL;


const client = new pg.Client(DATABASE_URL);


function favoriteHandler( request ,response){


  
    response.send("Welcome to Favorite Page");
    
};

 function mainPageHandler( request ,response){

const listMovies = [];
moviesJson.mov.forEach(element => {
    var catchMovie = new moviesDTO(element.title ,element.poster_path ,element.overview)
    listMovies.push(catchMovie)

});

return response.json(listMovies);

 };
function errorHandler(request ,response) {

    if (response.status == 404) {
      return  response.status(404).send("page not found error");
    }else if(response.status == 500){
        return  response.status(500).send("server error");
       
    }
    return  response.status(404).send("page not found error");
    
}
 app.get('/favorite',favoriteHandler);
 app.get('/',mainPageHandler);
app.use('*',errorHandler);




app.listen(3000,()=>{

console.log("Server On")
=======
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
            errorHandler(error, request, response);
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
            errorHandler(error, request, response);
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
            errorHandler(error, request, response);
        });
};



//  use this in the browser  http://localhost:3000/jobs

function jobsHandler(request, response) {


    // console.log(request);
    axios.get(`https://api.themoviedb.org/3/configuration/jobs?api_key=${APIKEY}`)
        .then(apiResponse => {

            return response.status(200).json(apiResponse.data);
        }).catch(error => {
            errorHandler(error, request, response);
        });
};



function addMovieHandler(request, response) {
    const postBody = request.body;
    const sql = `INSERT INTO movieL(release_date,title,poster_path,overview,my_comment) VALUES($1,$2,$3,$4,$5) RETURNING *;`;
 
    const values = [postBody.release_date, postBody.title, postBody.poster_path, postBody.overview,postBody.my_comment];
    client.query(sql, values).then((result) => {
        response.status(201).json(result.rows);
    }).catch(error => {
        errorHandler(error, request, response);
    });
};
function getMoviesHandler(request,response) {
    const sql = `SELECT * FROM movieL;`;
    client.query(sql).then((result) => {
        response.status(201).json(result.rows);
    }).catch(error => {
        errorHandler(error, request, response);
    });
}

client.connect()

function errorHandler(request, response) {

    // if (response.status == 404) {
    //     return response.status(404).send("page not found error");
    // } else if (response.status == 500) {
    //     return response.status(500).send("server error");

    // }


    return response.status(404).send("page not found error");

}


//////////////////////////////////////////////////////
// function similarHandler(request, response) {

//     const movie_id =request.data
//     let result = [];
//     console.log(movie_id);
//    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${APIKEY}&language=en-US&page=1
//    `)
//         .then(apiResponse => {
//             apiResponse.data.results.map(value => {
//                 let movieCard = new moviesDTO(value.id || "N/A", value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A", value.overview || "N/A");
//                 result.push(movieCard);
//             });
//             return response.status(200).json(result);
//         }).catch(error => {
//             errorHandler(error, request, response);
//         });
// };

////////////////////////////////////////////////////////////


app.use(express.json());
app.get('/trending', trendingAPlHandler);
app.get('/favorite', favoriteHandler);
app.get('/search', searchHandler);
app.get('/jobs', jobsHandler);
app.get('/popular', popularHandler);
app.get('/', mainPageHandler);
app.post('/addMovie', addMovieHandler);
app.get('/getMovies', getMoviesHandler);
//not :above each function example how can you use it

app.use('*', errorHandler);
// app.get('/person',similarHandler);


app.listen(PORT, () => {

    console.log("srever on ,Port " + PORT)

});

