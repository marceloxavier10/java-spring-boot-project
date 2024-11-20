package com.academia.backend.controllers;

import com.academia.backend.models.UserDTO;
import com.academia.backend.models.UserOutput;
import com.academia.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", methods = {
        RequestMethod.GET,
        RequestMethod.DELETE,
        RequestMethod.PUT,
        RequestMethod.POST,
        RequestMethod.OPTIONS})
@RestController
@RequestMapping ("/its-backoffice")
public class UserController {

    @Autowired
    private UserService userService;

    // Lista todos os users
    @GetMapping("/users")
    public ResponseEntity<List<UserOutput>> listAllUsers(@RequestParam(required = false) String name,
                                                         @RequestParam(required = false) String username) {
        List<UserOutput> users;

        if (name != null || username != null) {  // Verifica se o nome ou username foi passado
            users = userService.findUser(name, username); // Busca vários users
        } else {
            users = userService.getAllUsers(); // Metodo para listar todos os users
        }

        if (users == null || users.isEmpty()) {
            return ResponseEntity.noContent().build(); // Se a lista estiver vazia
        }

        return ResponseEntity.ok(users); // Retorna a lista de users
    }

    @PostMapping("/users")
    public ResponseEntity<Void> addUser(@Valid @RequestBody UserDTO userDTO) {
        // Validação de campos
        if (userDTO.getUsername() == null || userDTO.getUsername().isEmpty() ||
                userDTO.getPassword() == null || userDTO.getPassword().isEmpty() ||
                userDTO.getName() == null || userDTO.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Verifica se o user já existe
        if (userService.isUserExists(userDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Adiciona o user
        userService.addUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Apaga um user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);

        return ResponseEntity.ok().build();
    }

    // Acede à página edit user
    @GetMapping("/users/{id}")
    public ResponseEntity<UserOutput> editUser(@PathVariable int id) {
        try {
            UserOutput user = userService.editUser(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Edita um user
    @PutMapping("/users")
    public ResponseEntity<UserOutput> updateUser(@RequestBody UserDTO userDTO) {
        try {
            UserOutput updatedUser = userService.updateUser(userDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
