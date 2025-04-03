package comp440.demo.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String institution;
    private String department;
    private String email;
    private String address;
    private String homepage;

    @ManyToMany(mappedBy = "authors")
    private Set<Publication> publications = new HashSet<>();

    // Getters and setters
}
