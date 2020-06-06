
var movieDataList;
function getMovie(str) {
    var apikey= "f813d777";


    if (str.length ==0) {
        document.getElementById("output").style.background="black";
        document.getElementById("movieTitle").innerHTML="";
        document.getElementById("releasedContent").innerHTML ="";
        document.getElementById("genreContent").innerHTML ="";
        document.getElementById("plotContent").innerHTML ="";
        document.getElementById("imgPoster").innerHTML="";
        document.getElementById("listButton").innerHTML="";
        return;
    }
    $.get("http://www.omdbapi.com/?apikey="+apikey+"&t="+str,function(rawdata) {
        var data = JSON.parse(JSON.stringify(rawdata));
        movieDataList = data;
        var title = data.Title;
        var released = data.Released;
        var genre = data.Genre;
        var meta = data.Ratings;
        var plot = data.Plot;
        var poster = data.Poster;
        document.getElementById("output").style.background="#343434";
        document.getElementById("movieTitle").innerHTML =title;
        document.getElementById("releasedContent").innerHTML =released;
        document.getElementById("genreContent").innerHTML =genre;
        document.getElementById("plotContent").innerHTML =plot+"<br><br>" +
            "<div id='moreInfo' onmouseover='mouseOver()' onmouseout='mouseOut()' onclick='showMoreInfo()'>" +
            "Click to see more...</div>";
        document.getElementById("imgPoster").innerHTML = "<img src='"+poster+"'/>";
        document.getElementById("imgPoster").style.marginRight ="5%";
        document.getElementById("listButton").innerHTML = "<button style='background-color: #c83349;\n" +
            "    width:160px;\n" +
            "    height:50px;border:none;' onclick='addMovieToList()'>+ Add to my list</button>";

    })
}

function mouseOver(){
    document.getElementById('moreInfo').style.color = "red";
}

function mouseOut(){
    document.getElementById('moreInfo').style.color = "white";
}

function showMoreInfo(){
    var apikey= "f813d777";
    $.get("http://www.omdbapi.com/?apikey="+apikey+"&t="+movieDataList.Title+"&plot=full",function(rawdata){
        var data = JSON.parse(JSON.stringify(rawdata));
        document.getElementById('moreInfo').innerHTML= data.Plot;
        document.getElementById('moreInfo').style.padding ="5%";
        document.getElementById('moreInfo').onmouseover = "none";
    })
}


function SignUpValidation(){
    var usernameSign = document.getElementById("usernameSign");
    var passwordSign = document.getElementById("passwordSign");
    var passwordConfirm = document.getElementById("passwordConfirm");

    if(username_validation(usernameSign,6,25)){
        if(password_validation(passwordSign,passwordConfirm,4,16)){

            var data = {"username":usernameSign.value,"password":passwordSign.value};
            $.ajax({
                type: "POST",
                url: "/customers",
                data: JSON.stringify(data),
                success : console.log(data),
                contentType: "application/json; charset=utf-8",
                datatype: "json"
            });
            alert("User registered! Now you can log in to your account!");

        }else{
            alert("Passwords dont match or are not in the appropriate range");
        }
    }else{
        alert("Small username!")
    }
}




function username_validation(username,min,max){
    var username_length = username.value.length;
    if(username_length>=min && username_length<=max){
        return true;
    }else{
        alert("Username must be between 4 - 12 characters");
        return false;
    }

}

function password_validation(password,passwordConfirm,min,max){
    var password_length = password.value.length;
    if(password_length>=min && password_length<=max){
        if(password.value == passwordConfirm.value ){
            return true;
        }else{
            alert("Passwords dont match");
            return false;
        }
    } else{
        alert("Password must be between 4 - 12 characters");
        return false;
    }
}

function loginVal(){

    var usernameLog = document.getElementById("usernameLog").value;
    var passwordLog = document.getElementById("passwordLog").value;

    $.get("/customers/",function(data, status){
        var arr = JSON.parse(JSON.stringify(data));
        var i;
        var found;
        for(i=0; i<arr.length;i++){
            if((arr[i].username == usernameLog) && (arr[i].password == passwordLog)){
                alert("Welcome "+usernameLog);
                var custId = arr[i].id;
                found = true;
                document.cookie = "userId="+custId+"; expires=Thu, 18 Dec 2022 12:00:00 UTC";
                window.location.replace("/HomeUser");
                break;
            }
        }
        if(!found){
            alert("Wrong username or password");
        }
    });
}




function movieExistsToList(){
    var custId = getCookieValue();

    console.log("/customers/"+custId+"/"+movieDataList.Title)
    $.get("/customers/"+custId+"/"+movieDataList.Title,function(data, status){
       var movieExists = data;
       if(!movieExists){
           postMovieToList(movieExists);
       }else{
           alert("Movie is already existing to your MovieList!");
       }
    })
}

function postMovieToList(movieExists){
    var custId = getCookieValue();
    var movieSend = {"title":movieDataList.Title};
    console.log(document.cookie);
    if(custId !="" && !movieExists){
        $.ajax({
            type: "POST",
            url: "/customers/"+custId+"/movies",
            data: JSON.stringify(movieSend),
            success : alert("Movie Saved!"),
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        });
    }else{
        alert("You must be logged in to add movies in your list!");
    }
}


function addMovieToList(){
 movieExistsToList();
}

function logout(){
    console.log("prin to log out = "+document.cookie);
    document.cookie="userId=; expires=Thu, 18 Dec 1997 00:00:00 UTC;";
    window.location.replace("/Home");
    console.log("meta to log out = "+document.cookie);
}


function getCookieValue() {
    var cookie = document.cookie.split(";");
    for(var i = 0;i<cookie.length; i++){
        var value = cookie[i].split('=')[1];
    }
    console.log(value);
    return value;
}


function getBookmarkMovies(){
    var apikey= "f813d777";

    var custId = getCookieValue();
    console.log("/customers/"+custId+"/movies");
    $.get("/customers/"+custId+"/movies",function(data, status){
        var MoviesArray = JSON.parse(JSON.stringify(data));
        for(var i=0; i<MoviesArray.length; i++){
            var movieTitle= MoviesArray[i].title;
            console.log(movieTitle);
            $.get("http://www.omdbapi.com/?apikey="+apikey+"&t="+movieTitle,function(rawdata){
                var movieData = JSON.parse(JSON.stringify(rawdata));

                var movieDiv = document.createElement("div");
                movieDiv.setAttribute("id","movieContainer"+i);
                movieDiv.style.textAlign = "center";
                movieDiv.style.background = "#343434"
                movieDiv.style.width = "60%";
                

                document.getElementById("moviesListContainer").appendChild(movieDiv);
                var movieDivTitle = document.createElement("div");
                movieDivTitle.innerHTML = "<div>"+movieData.Title+"</div>"
                movieDivTitle.style.color = "white";
                movieDivTitle.style.fontSize ="xx-large";
                movieDivTitle.style.paddingTop = "5%";
                movieDivTitle.style.paddingBottom = "2%";
                document.getElementById("movieContainer"+i).appendChild(movieDivTitle);

                var movieDivPlot = document.createElement("div");
                movieDivPlot.innerHTML = "<div>"+movieData.Plot+"</div>"
                movieDivPlot.style.color = "white";
                movieDivPlot.style.paddingTop = "2%";
                movieDivPlot.style.paddingBottom = "2%";
                document.getElementById("movieContainer"+i).appendChild(movieDivPlot);

                var movieDivPoster = document.createElement("div");
                movieDivPoster.innerHTML="<div><img src='"+movieData.Poster+"'></div>";
                movieDivPoster.style.borderBottom = "1px solid white";
                movieDivPoster.style.paddingBottom = "2%";
                document.getElementById("movieContainer"+i).appendChild(movieDivPoster);
            })
        }
    })
}


