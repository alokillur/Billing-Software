package com.alokillur.billingsoftware.controller;

import com.alokillur.billingsoftware.io.UserRequest;
import com.alokillur.billingsoftware.io.UserResponse;
import com.alokillur.billingsoftware.repository.UserRepository;
import com.alokillur.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest userRequest) {
        return userService.createUser(userRequest);
    }


    @RequestMapping("/users")
    public List<UserResponse> readUser() {
        return userService.readUsers();
    }

    @RequestMapping("/user/{id}")
    public void deleteUser(@PathVariable String id) {
        try {
            userService.deleteUSer(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }
    }
 }
