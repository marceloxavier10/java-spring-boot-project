package com.academia.backend.controllers;

import com.academia.backend.models.UserDTO;
import com.academia.backend.models.UserOutput;
import com.academia.backend.services.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class Login {

    @Autowired
    private UserService userService;

    @PostMapping (value = "/its-backoffice/login")
    public ResponseEntity<UserOutput> login(@RequestBody UserDTO userDTO) {
        // Procura o user pelo username e password
        UserOutput userOutput = userService.userLogin(userDTO.getUsername(), userDTO.getPassword());

        // Verifica se o user existe
        if (userOutput == null) {
            // Retorna uma resposta com o status 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(userOutput);
    }

}
