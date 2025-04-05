package comp440.demo.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Publication") // important: match SQL table name exactly (uppercase P)
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // match SQL column name
    private Long id;
    private String title;
    private String authors;
    private int year;
    private String pages;
    private String institution;
    private String department;

    private String keywords;

    // OPTIONAL: if you're using the join table in addition to the `authors` string
    // You can keep this if needed later
// Tell Jackson to ignore the "publications" field inside Author objects
@JsonIgnoreProperties("publications")
@ManyToMany
@JoinTable(
    name = "AuthorPublication",
    joinColumns = @JoinColumn(name = "idPublication"),
    inverseJoinColumns = @JoinColumn(name = "idAuthor")
)
private Set<Author> authorEntities = new HashSet<>();


    // === Getters and Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getPages() {
        return pages;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Set<Author> getAuthorEntities() {
        return authorEntities;
    }

    public void setAuthorEntities(Set<Author> authorEntities) {
        this.authorEntities = authorEntities;
    }
    

    public String getKeywords() {
        return keywords;
    }
    
    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
