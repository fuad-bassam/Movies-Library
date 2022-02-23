



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



app.get('/trending', trendingAPlHandler);
app.get('/favorite', favoriteHandler);
app.get('/search', searchHandler);
app.get('/jobs', jobsHandler);
app.get('/popular', popularHandler);
app.get('/', mainPageHandler);
//not :above each function example how can you use it

app.use('*', errorHandler);
// app.get('/person',similarHandler);


app.listen(PORT, () => {

    console.log("srever on ,Port " + PORT)

});