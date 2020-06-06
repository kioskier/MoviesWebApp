package com.projectistos.movieapp.Service;


import com.projectistos.movieapp.Model.Customer;
import com.projectistos.movieapp.Model.Movie;
import com.projectistos.movieapp.dao.CustomerDAO;
import com.projectistos.movieapp.exception.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class CustomerService {

    @Autowired
    private CustomerDAO customerDAO;

    public Customer addCustomer(Customer customer){
        return customerDAO.save(customer);
    }

    public List<Customer> getCustomers(){
        return customerDAO.findAll();
    }

    public Customer getCustomer(int customerId){
        Optional<Customer> optionalCustomer = customerDAO.findById(customerId);
        if(!optionalCustomer.isPresent())
            throw  new CustomerNotFoundException("Customer record is not available");

        return optionalCustomer.get();
    }

    public void deleteCustomer(int customerId){
        customerDAO.deleteById(customerId);
    }
}
