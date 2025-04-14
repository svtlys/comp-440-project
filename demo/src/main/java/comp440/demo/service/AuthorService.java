package comp440.demo.service;

import comp440.demo.model.Author;
import comp440.demo.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    // GET all authors
    public List<Author> getAllAuthors() {
        return authorRepository.getAllAuthors();
    }

    // GET author by ID
    public Author getAuthor(Long id) {
        return authorRepository.findById(id).orElse(null);
    }

    // FILTER by institution
    public List<Author> getByInstitution(String institution) {
        return authorRepository.findByInstitution(institution);
    }

    // FILTER by department
    public List<Author> getByDepartment(String department) {
        return authorRepository.findByDepartment(department);
    }

    // ADD author (embedded SQL)
    public void createAuthor(Author author) {
        authorRepository.insertAuthor(
            author.getName(),
            author.getInstitution(),
            author.getDepartment(),
            author.getEmail(),
            author.getAddress(),
            author.getHomepage()
        );
    }

    // UPDATE author (embedded SQL)
    public void updateAuthor(Long id, Author author) {
        authorRepository.updateAuthor(
            id,
            author.getName(),
            author.getInstitution(),
            author.getDepartment(),
            author.getEmail(),
            author.getAddress(),
            author.getHomepage()
        );
    }

    // DELETE author (embedded SQL)
    public void deleteAuthor(Long id) {
        authorRepository.deleteAuthorById(id);
    }
}
