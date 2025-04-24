package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.dto.PrivacyUpdateRequest;
import hanu.fit.iws_final_project.model.MyUserDetail;
import hanu.fit.iws_final_project.model.User;
import hanu.fit.iws_final_project.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/member/")
public class PrivacyController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PrivacyController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/privacy")
    public ResponseEntity<?> updatePrivacy(
            Authentication authentication,
            @RequestBody PrivacyUpdateRequest request
    ) {
        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isChanged = false;

        Map<String, String> errors = new HashMap<>();

        // ======= Validate & update password =======
        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            if (request.getCurrentPassword() == null || request.getCurrentPassword().isBlank()) {
                errors.put("currentPassword", "Current password is required.");
            } else if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                errors.put("currentPassword", "Current password is incorrect.");
            } else if (request.getNewPassword().length() < 6) {
                errors.put("newPassword", "New password must be at least 6 characters.");
            } else {
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                isChanged = true;
            }
        }

        // ======= Validate & update username =======
        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()) {
            if (request.getNewUsername().length() < 4 || request.getNewUsername().length() > 20) {
                errors.put("newUsername", "Username must be between 4 and 20 characters.");
            } else if (!request.getNewUsername().equals(user.getUsername())) {
                if (userRepository.findByUsername(request.getNewUsername()).isPresent()) {
                    errors.put("newUsername", "Username already taken.");
                } else {
                    user.setUsername(request.getNewUsername());
                    isChanged = true;
                }
            }
        }

        // ======= Validate & update email =======
        if (request.getNewEmail() != null && !request.getNewEmail().isBlank()) {
            if (!request.getNewEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
                errors.put("newEmail", "Invalid email format.");
            } else if (!request.getNewEmail().equals(user.getEmail())) {
                if (userRepository.findByEmail(request.getNewEmail()).isPresent()) {
                    errors.put("newEmail", "Email already in use.");
                } else {
                    user.setEmail(request.getNewEmail());
                    isChanged = true;
                }
            }
        }

        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        if (!isChanged) {
            errors.put("general", "No changes detected.");
            return ResponseEntity.badRequest().body(errors);
        }

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Privacy updated successfully."));
    }
}

