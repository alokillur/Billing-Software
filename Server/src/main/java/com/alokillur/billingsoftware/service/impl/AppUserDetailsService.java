package com.alokillur.billingsoftware.service.impl;

import com.alokillur.billingsoftware.entity.UserEntity;
import com.alokillur.billingsoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserEntity existingUSer =  userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email:"+email));
        return new User(existingUSer.getEmail(), existingUSer.getPassword(), Collections.singleton(new SimpleGrantedAuthority(existingUSer.getRole())));
    }
}
