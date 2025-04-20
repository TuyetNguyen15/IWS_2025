package hanu.fit.iws_final_project.controller;

import hanu.fit.iws_final_project.model.MyUserDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @GetMapping("/home")
    public ResponseEntity<?> memberHome(Authentication authentication) {
        MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();

        MemberInfoResponse response = new MemberInfoResponse(
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        );

        return ResponseEntity.ok().body(response);
    }

    private static class MemberInfoResponse {
        private String username;
        private String email;
        private String fullName;
        private List<String> roles;

        public MemberInfoResponse(String username, String email, String fullName, List<String> roles) {
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.roles = roles;
        }

        // Getters
        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public String getFullName() { return fullName; }
        public List<String> getRoles() { return roles; }
    }
}