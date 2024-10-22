package com.academia.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {
    @Size(min = 5, message = "O username deve ter pelo menos 5 caracteres")
    @NotBlank(message = "O username é obrigatório")
    private String username;

    @Size(min = 8, message = "A password deve ter pelo menos 8 caracteres")
    @NotBlank(message = "A password é obrigatória")
    private String password;

    @NotBlank(message = "O name é obrigatório")
    private String name;

    private int id;

    public UserDTO(String username, String password, String name, int id){
        this.username = username;
        this.password = password;
        this.name = name;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

