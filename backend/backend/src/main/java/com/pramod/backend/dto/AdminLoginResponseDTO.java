package com.pramod.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminLoginResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String token;
}