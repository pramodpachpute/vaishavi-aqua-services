package com.pramod.backend.service;

import com.pramod.backend.dto.AdminLoginRequestDTO;
import com.pramod.backend.dto.AdminLoginResponseDTO;
import com.pramod.backend.entity.Admin;
import com.pramod.backend.repository.AdminRepository;
import com.pramod.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminLoginResponseDTO login(AdminLoginRequestDTO request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(admin.getEmail());

        return new AdminLoginResponseDTO(
                admin.getId(),
                admin.getFullName(),
                admin.getEmail(),
                token
        );
    }
}