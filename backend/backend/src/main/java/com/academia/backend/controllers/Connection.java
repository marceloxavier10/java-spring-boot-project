package com.academia.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Connection {

    @GetMapping ("/connection")
    public String checkConnection(){
        return "Conexão OK";
    }

}
