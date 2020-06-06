package com.projectistos.movieapp.Service;

import com.projectistos.movieapp.Model.Movie;
import com.projectistos.movieapp.dao.MovieDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MovieService {

    @Autowired
    private MovieDAO movieDA0;

    public Movie addMovie(Movie movie){
        return movieDA0.save(movie);
    }

    public List<Movie> getMovies(int customerId){
        List<Movie> movies = new ArrayList<>();
        movieDA0.findByCustomerId(customerId)
                .forEach(movies::add);
        return movies;
    }

    public boolean movieExistsToList(String title,int customerId){
        List<Movie> movies = new ArrayList<>();
        movieDA0.findByTitle(title)
                .forEach(movies::add);

        for(int i=0; i<movies.size();i++){
            if(movies.get(i).getCustomer().getId()==customerId){
                return true;
            }
        }
        return false;
    }
}
