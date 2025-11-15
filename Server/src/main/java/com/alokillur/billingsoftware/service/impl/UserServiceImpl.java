package com.alokillur.billingsoftware.service.impl;

import com.alokillur.billingsoftware.entity.UserEntity;
import com.alokillur.billingsoftware.io.UserRequest;
import com.alokillur.billingsoftware.io.UserResponse;
import com.alokillur.billingsoftware.repository.UserRepository;
import com.alokillur.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserEntity newUser = convertToEntity(userRequest);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRequest.getRole().toUpperCase())
                .name(userRequest.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity newUSer) {
        return UserResponse.builder()
                .name(newUSer.getName())
                .email(newUSer.getEmail())
                .userId(newUSer.getUserId())
                .createdAt(newUSer.getCreatedAt())
                .updatedAt(newUSer.getUpdatedAt())
                .role(newUSer.getRole())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: "+email));
        return userEntity.getRole();
    }

    @Override
    public List<UserResponse> readUSeres() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUSer(String userId) {
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(user);
    }
}
