package com.example.voyage.controllers;

import com.example.voyage.entities.ERole;
import com.example.voyage.entities.Role;
import com.example.voyage.entities.User;
import com.example.voyage.repositories.RoleRepository;
import com.example.voyage.repositories.UserRepository;
import com.example.voyage.security.services.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/comptes")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public User getUser(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        user.setPassword(encoder.encode(user.getPassword()));
        Set<Role> strRoles = user.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else if ("mod".equals(role)) {
                    Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(modRole);
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        User savedUser = userRepository.save(user);

        return ResponseEntity.created(new URI("/comptes/"+savedUser.getId())).body(savedUser);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody User user) {
        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);
        currentUser.setName(user.getName());
        currentUser.setLastName(user.getLastName());
        currentUser.setEmail(user.getEmail());
        currentUser.setAvatar(user.getAvatar());
        currentUser.setTelephone(user.getTelephone());
        currentUser.setPassword(encoder.encode(user.getPassword()));
        currentUser.setPays(user.getPays());
        currentUser.setRoles(user.getRoles());
        currentUser = userRepository.save(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity deleteUser(@PathVariable Long id){
        refreshTokenService.deleteByUserId(id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
