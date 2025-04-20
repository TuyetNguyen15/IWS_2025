package hanu.fit.iws_final_project.config;

import hanu.fit.iws_final_project.model.User;
import hanu.fit.iws_final_project.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Kiểm tra xem admin đã tồn tại chưa
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEmail("admin@example.com");
                admin.setFullName("Administrator");
                admin.setRoles(List.of("ROLE_ADMIN"));
                userRepository.save(admin);
            }

            // Kiểm tra xem user thường đã tồn tại chưa
            if (userRepository.findByUsername("user").isEmpty()) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setEmail("user@example.com");
                user.setFullName("User");
                user.setRoles(List.of("ROLE_USER"));
                userRepository.save(user);
            }
        };
    }
}