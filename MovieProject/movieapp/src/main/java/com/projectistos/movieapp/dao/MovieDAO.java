package com.projectistos.movieapp.dao;

import com.projectistos.movieapp.Model.Customer;
import com.projectistos.movieapp.Model.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieDAO extends CrudRepository<Movie,Integer> {

    List<Movie> findByCustomerId(int customerId);


    List<Movie> findByTitle(String title);
}

