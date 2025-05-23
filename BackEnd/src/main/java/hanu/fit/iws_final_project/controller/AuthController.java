package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.User;
import hanu.fit.iws_final_project.model.UserDto;
import hanu.fit.iws_final_project.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Set default role if not provided
        if (userDto.getRoles() == null || userDto.getRoles().isEmpty()) {
            userDto.setRoles(List.of("ROLE_USER"));
        }

        User user = new User(userDto, passwordEncoder);
        userRepository.save(user);

        return ResponseEntity.ok().body("Registration successful");
    }

    @GetMapping("/login-status")
    public ResponseEntity<?> checkLoginStatus(
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "logout", required = false) String logout,
            @RequestParam(value = "registerSuccess", required = false) String registerSuccess) {

        if (error != null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        if (logout != null) {
            return ResponseEntity.ok().body("You have been logged out successfully");
        }

        if (registerSuccess != null) {
            return ResponseEntity.ok().body("Registration successful! Please login");
        }

        return ResponseEntity.ok().body("Login status checked");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        var userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Your email does not exist!");
        }

        User user = userOpt.get();
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        userRepository.save(user);

        System.out.println("Reset link: http://localhost:3000/reset-password?token=" + resetToken);

        return ResponseEntity.ok(Map.of(
                "message", "Valid email! Redirect to Reset Password Page ...",
                "token", resetToken
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        return userRepository.findByResetToken(token)
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setResetToken(null);
                    userRepository.save(user);
                    return ResponseEntity.ok("Password reset successfully!");
                })
                .orElse(ResponseEntity.badRequest().body("Invalid token"));
    }

}
