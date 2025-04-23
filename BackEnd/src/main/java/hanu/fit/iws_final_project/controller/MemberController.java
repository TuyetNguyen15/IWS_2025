package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.MyUserDetail;
import hanu.fit.iws_final_project.model.User;
import hanu.fit.iws_final_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final UserRepository userRepository;

    @Autowired
    public MemberController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // API lấy thông tin trang Profile
    @GetMapping("/home")
    public ResponseEntity<?> memberHome(Authentication authentication) {
        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String avatarUrl = null;
        if (user.getAvatar() != null) {
            avatarUrl = "http://localhost:8080" + user.getAvatar();
        }

        String dob = null;
        if (user.getDateOfBirth() != null) {
            dob = user.getDateOfBirth().toString();
        }

        MemberInfoResponse response = new MemberInfoResponse(
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                avatarUrl,
                user.getGender(),
                dob,
                user.getRoles().stream().collect(Collectors.toList())
        );

        return ResponseEntity.ok().body(response);
    }

    // API Edit Profile
    @PutMapping("/edit-profile")
    @Transactional
    public ResponseEntity<?> editProfile(
            Authentication authentication,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,
            @RequestParam(value = "avatar", required = false) MultipartFile avatarFile
    ) {
        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName);
        }

        if (gender != null && !gender.isBlank()) {
            user.setGender(gender);
        }

        if (dateOfBirth != null && !dateOfBirth.isBlank()) {
            try {
                user.setDateOfBirth(LocalDate.parse(dateOfBirth));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid date format. Expected yyyy-MM-dd");
            }
        }

        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                String originalFilename = avatarFile.getOriginalFilename();
                String extension = (originalFilename != null && originalFilename.contains("."))
                        ? originalFilename.substring(originalFilename.lastIndexOf("."))
                        : ".jpg";

                String filename = System.currentTimeMillis() + extension;
                Path filepath = Paths.get("uploads", filename);
                Files.createDirectories(filepath.getParent());
                Files.write(filepath, avatarFile.getBytes());
                user.setAvatar("/api/user/avatar/" + filename);

            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error uploading avatar");
            }
        }

        userRepository.save(user);

        // Reset Authentication để phản ánh dữ liệu mới cập nhật
        MyUserDetail updatedUserDetail = new MyUserDetail(user);
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(
                updatedUserDetail, authentication.getCredentials(), updatedUserDetail.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return ResponseEntity.ok("Profile updated successfully");
    }

    // DTO trả về frontend
    private static class MemberInfoResponse {
        private String username;
        private String email;
        private String fullName;
        private String avatar;
        private String gender;
        private String dateOfBirth;
        private List<String> roles;

        public MemberInfoResponse(String username, String email, String fullName, String avatar, String gender, String dateOfBirth, List<String> roles) {
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.avatar = avatar;
            this.gender = gender;
            this.dateOfBirth = dateOfBirth;
            this.roles = roles;
        }

        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public String getFullName() { return fullName; }
        public String getAvatar() { return avatar; }
        public String getGender() { return gender; }
        public String getDateOfBirth() { return dateOfBirth; }
        public List<String> getRoles() { return roles; }
    }
}