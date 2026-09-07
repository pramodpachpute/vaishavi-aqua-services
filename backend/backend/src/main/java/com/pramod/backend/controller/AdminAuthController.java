package com.pramod.backend.controller;

import com.pramod.backend.dto.AdminLoginRequestDTO;
import com.pramod.backend.dto.AdminLoginResponseDTO;
import com.pramod.backend.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDTO> login(
            @Valid @RequestBody AdminLoginRequestDTO request) {

        return ResponseEntity.ok(adminAuthService.login(request));
    }
}
