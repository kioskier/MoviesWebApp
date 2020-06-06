package com.projectistos.movieapp.Model;

import javax.persistence.*;

@Entity
public class Movie{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int movieId;
    private String title;
    @ManyToOne
    private Customer customer;

    public Movie(){}

    public Movie(String title,Customer customer) {
        this.movieId = movieId;
        this.title = title;
        this.customer = customer;
    }


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getTitle() {
        return title;
    }
}
