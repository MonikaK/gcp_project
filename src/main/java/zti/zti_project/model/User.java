package zti.zti_project.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * A class representing the app_user PostreSQL entity in the system. It contains fields with information about the user
 * such as: userId, name, surname, email, phone, login, password, is admin and roles.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="app_user")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private String login;

    @Column
    private String password;

    @Column
    private boolean isAdmin;

    @Column
    private String roles;

    /**
     * A constructor with all fields as arguments except from the userId which is a generated value.
     *
     * @param  name User's name
     * @param  surname User's surname
     * @param  email User's email
     * @param  phone User's phone
     * @param  login User's login
     * @param  password User's password that is stored in database after encoding
     * @param  isAdmin Information if user is an admin
     * @param  roles List of user's roles, by default ROLE_USER
     */
    public User (String name, String surname, String email, String phone, String login, String password, boolean isAdmin,
                 String roles) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.login = login;
        this.password = password;
        this.isAdmin = isAdmin;
        this.roles = roles;
    }
}
