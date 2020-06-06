package com.projectistos.movieapp.api;

import com.projectistos.movieapp.Model.Customer;
import com.projectistos.movieapp.Model.Movie;
import com.projectistos.movieapp.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value= "/customers")
public class MovieResource {


    @Autowired
    private MovieService movieService;

    @PostMapping(value= "/{customerId}/movies")
    public Movie addMovie(@RequestBody Movie movie, @PathVariable(value="customerId") int customerId){
        movie.setCustomer(new Customer(customerId,"",""));
        return movieService.addMovie(movie);
    }

    @GetMapping(value="/{customerId}/movies")
    public List<Movie> getMovies(@PathVariable(value ="customerId") int customerId){
        return movieService.getMovies(customerId);
    }

    @GetMapping(value="/{customerId}/{existingMovie}")
    public boolean movieExistsToList(@PathVariable(value ="existingMovie") String existingMovie,@PathVariable(value ="customerId") int customerId){
        return movieService.movieExistsToList(existingMovie,customerId);
    }

}
