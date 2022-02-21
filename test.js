
const express =require("express");
const moviesJson =require("./Movie Data/movies.json");
const app =express();


function moviesDTO(title ,poster_path,overview){
this.title =title;
this.poster_path =poster_path;
this.overview = overview;
}



function favoriteHandler( request ,response){

const listMovies = [];
moviesJson.mov.forEach(element => {
    var catchMovie = new moviesDTO(element.title ,element.poster_path ,element.overview)
    listMovies.push(catchMovie)

});

return response.json(listMovies);

};

 function mainPageHandler( request ,response){
     console.log(moviesJson);
 response.send("hi shelh");

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

console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii")

});