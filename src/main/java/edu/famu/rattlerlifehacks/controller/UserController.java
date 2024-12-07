package edu.famu.rattlerlifehacks.controller;

import edu.famu.rattlerlifehacks.model.Events;
import edu.famu.rattlerlifehacks.model.User;
import edu.famu.rattlerlifehacks.service.UserService;
import edu.famu.rattlerlifehacks.util.ApiResponse;
import jakarta.ws.rs.Path;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Get user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable(name = "userId") String userId) {
        try {
            User user = service.getUserById(userId);

            if (user != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "User found", user, null));
            } else {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "User not found", null, null));
            }

        } catch (ExecutionException | ParseException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));

        } catch (InterruptedException e) {
            return ResponseEntity.status(503).body(new ApiResponse<>(false, "Unable to reach Firebase", null, e));
        }
    }

    // Get all users
    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = service.getAllUsers();

            if (users != null && !users.isEmpty()) {
                return ResponseEntity.ok(new ApiResponse<>(true, "Users List", users, null));
            } else {
                return ResponseEntity.status(204).body(new ApiResponse<>(true, "No users found", null, null));
            }

        } catch (ExecutionException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));
        } catch (InterruptedException e) {
            return ResponseEntity.status(503).body(new ApiResponse<>(false, "Unable to reach Firebase", null, e));
        }
    }

    @DeleteMapping ("/delete/{userId}")
    public ResponseEntity<ApiResponse<User>> deleteUserbyId(@PathVariable String userId) {
        try {
            boolean deleted = UserService.deleteUserbyId(userId);

            if (deleted) {
                return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null, null));
            } else {
                return ResponseEntity.status(404).body(new ApiResponse<>(false, "User not found", null, null));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody User users) {
        try {
            User createdUser = service.createUser(users);

            if (createdUser != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "User created successfully", createdUser, null));
            } else {
                return ResponseEntity.status(400).body(new ApiResponse<>(false, "Failed to create user", null, null));
            }

        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));

        }
    }
}

