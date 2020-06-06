package com.projectistos.movieapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value="/Home")
    public static String welcome(){
        return "Home";
    }

    @RequestMapping(value="/MyBookmarks")
    public static String sendToBookmarks(){
        return "MyBookmarks";
    }

    @RequestMapping(value="/HomeUser")
    public static String sendToHomeUser(){
        return "HomeUser";
    }


}
