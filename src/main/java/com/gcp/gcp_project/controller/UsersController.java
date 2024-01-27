package com.gcp.gcp_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.gcp.gcp_project.PubSubConfig;
import com.gcp.gcp_project.model.User;
import com.gcp.gcp_project.repository.UsersRepository;

/**
 * A class responsible for handling HTTP requests connected with TicketType objects. Everyone has access to its methods.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://34.159.233.43:3000")
//@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private PubSubConfig.PubsubOutboundGateway messagingGateway;

    /**
     * Method returning all User objects stored in UsersRepository.
     *
     * @return  ResponseEntity on User list type
     */
    @GetMapping("/list")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(usersRepository.findAll());
    }

    /**
     * Method returning form UsersRepository a User with given id.
     *
     * @param id User's id retrieved as a path variable from front-end
     * @return  ResponseEntity on User type
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id){
        return ResponseEntity.ok(usersRepository.findById(Integer.parseInt(id)));
    }

    /**
     * Method saving a given User object to UsersRepository. Password passed from front-end is encoded by PasswordEncoder.
     *
     * @param user A User object retrieved as a request body from front-end to save in a database.
     * @return  ResponseEntity success or failure status.
     */
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        var password = passwordEncoder.encode(user.getPassword());

        messagingGateway.sendToPubsub( user.getEmail() + "|" + user.getLogin() + "|" + user.getName() + "|" + user.getSurname() + "|" + user.getPhone());
        return ResponseEntity.ok(usersRepository.save(new User(user.getName(), user.getSurname(), user.getEmail(),
                user.getPhone(), user.getLogin(), password, false, "ROLE_USER")));
    }
}
