package com.academia.backend.models;

import java.time.LocalDateTime;

public class UserOutput {
    private Integer id;
    private String name;
    private String username;
    private String password;
    private LocalDateTime creation;
    private LocalDateTime lastUpdated;


    public UserOutput(Integer id, String name, String username, String password, LocalDateTime creation, LocalDateTime lastUpdated) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.name = name;
        this.creation = creation;
        this.lastUpdated = lastUpdated;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public LocalDateTime getCreation() {
        return creation;
    }

    public void setCreation(LocalDateTime creation) {
        this.creation = creation;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
