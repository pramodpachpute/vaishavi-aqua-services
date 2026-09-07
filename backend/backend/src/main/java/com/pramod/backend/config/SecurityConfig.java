package com.pramod.backend.config;

import com.pramod.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ==========================================
    // CORS CONFIGURATION
    // ==========================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // ==========================================
    // SPRING SECURITY
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // ==========================================
                        // PUBLIC - ADMIN LOGIN
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/admin/login"
                        ).permitAll()

                        // ==========================================
                        // PUBLIC - CUSTOMER BOOKING
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/bookings"
                        ).permitAll()

                        // ==========================================
                        // PUBLIC - PRODUCTS
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products",
                                "/api/products/**"
                        ).permitAll()

                        // ==========================================
                        // PUBLIC - SERVICES
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/services",
                                "/api/services/**"
                        ).permitAll()

                        // ==========================================
                        // PUBLIC - REVIEWS
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/reviews"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/reviews"
                        ).permitAll()

                        // ==========================================
                        // ADMIN - BOOKINGS
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings",
                                "/api/bookings/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/bookings/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/bookings/**"
                        ).hasRole("ADMIN")

                        // ==========================================
                        // ADMIN - PRODUCTS
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/**"
                        ).hasRole("ADMIN")

                        // ==========================================
                        // ADMIN - SERVICES
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/services"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/services/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/services/**"
                        ).hasRole("ADMIN")

                        // ==========================================
                        // ADMIN - REVIEWS
                        // ==========================================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/reviews/**"
                        ).hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}