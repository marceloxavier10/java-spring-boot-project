package com.academia.backend.services;

import com.academia.backend.models.UserDTO;
import com.academia.backend.models.UserOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Metodo para verificar user pelo username e password no Login
    public UserOutput userLogin (String username, String password) {
        String sql = "SELECT id, name, username, password, createTimestamp, updateTimestamp FROM users WHERE username = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{username, password}, (rs, rowNum) ->
                    new UserOutput(
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getString("username"),
                            rs.getString("password"),
                            rs.getTimestamp("createTimestamp").toLocalDateTime(),
                            rs.getTimestamp("updateTimestamp").toLocalDateTime()
                    )
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    // Metodo para procurar um user pelo name ou username
    public List<UserOutput> findUser(String name, String username) {
        String sql = "SELECT * FROM users WHERE name LIKE ? OR username LIKE ?";
        List<UserOutput> users;

        try {
            users = jdbcTemplate.query(sql, new Object[]{"%" + name + "%", "%" + username + "%"}, new RowMapper<UserOutput>() {
                @Override
                public UserOutput mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return new UserOutput(
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getString("username"),
                            rs.getString("password"),
                            rs.getTimestamp("createTimestamp").toLocalDateTime(),   //creation
                            rs.getTimestamp("updateTimestamp").toLocalDateTime()    //lastUpdated
                    );
                }
            });
        } catch (Exception e) {
            // Log da exceção
            System.err.println("Erro ao encontrar os users: " + e.getMessage());
            return new ArrayList<>(); // Retorna uma lista vazia em caso de erro
        }

        return users;
    }

    // Metodo para listar todos os users
    public List<UserOutput> getAllUsers () {
        String returnSql = "SELECT id, name, username, password, createTimestamp, updateTimestamp FROM users";

        return jdbcTemplate.query(returnSql, new RowMapper<UserOutput>() {
            @Override
            public UserOutput mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new UserOutput(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getTimestamp("createTimestamp").toLocalDateTime(),   //creation
                        rs.getTimestamp("updateTimestamp").toLocalDateTime()    //lastUpdated
                );
            }
        });
    }

    // Metodo para verificar se o user já existe
    public boolean isUserExists(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{username}, Integer.class);
        return count != null && count > 0;
    }

    // Metodo para adicionar um novo user
    public void addUser (UserDTO userDTO){
        String insertSql = "INSERT INTO users (username, password, name) VALUES (?, ?, ?)";
        jdbcTemplate.update(insertSql, userDTO.getUsername(), userDTO.getPassword(), userDTO.getName());
    }

    // Metodo para remover um user
    public void deleteUser(int id) {
        String sql = "DELETE FROM users WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    // Metodo para edit um user
    public UserOutput editUser(int id) {
        String sql = "SELECT id, name, username, password, createTimestamp, updateTimestamp FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) ->
                new UserOutput(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getTimestamp("createTimestamp").toLocalDateTime(),
                        rs.getTimestamp("updateTimestamp").toLocalDateTime()
                )
        );
    }

    // Metodo para atualizar os dados do user
    public UserOutput updateUser(UserDTO userDTO) {
        String sql = "UPDATE users SET name = ?, password = ? , updateTimestamp = CURRENT_TIMESTAMP WHERE id = ?";
        jdbcTemplate.update(sql, userDTO.getName(), userDTO.getPassword(), userDTO.getId());

        // Retornar o user atualizado
        return editUser(userDTO.getId());
    }

}

