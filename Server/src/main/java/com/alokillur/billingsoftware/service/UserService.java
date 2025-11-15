package com.alokillur.billingsoftware.service;

import com.alokillur.billingsoftware.io.UserRequest;
import com.alokillur.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    String getUserRole(String email);

    List<UserResponse> readUSeres();

    void deleteUSer(String userId);
}
