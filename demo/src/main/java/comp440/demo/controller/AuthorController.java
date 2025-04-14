package comp440.demo.controller;

import comp440.demo.model.Author;
import comp440.demo.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    // Get all authors
    @GetMapping
    public List<Author> getAll() {
        return authorService.getAllAuthors();
    }

    // Get author by ID
    @GetMapping("/{id}")
    public Author getById(@PathVariable Long id) {
        return authorService.getAuthor(id);
    }

    // Get authors by institution
    @GetMapping("/institution/{institution}")
    public List<Author> getByInstitution(@PathVariable String institution) {
        return authorService.getByInstitution(institution);
    }

    // Create a new author
    @PostMapping
    public void create(@RequestBody Author author) {
        authorService.createAuthor(author);
    }

    // Update author by ID
    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Author updatedAuthor) {
        authorService.updateAuthor(id, updatedAuthor);
    }

    // Delete author by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        authorService.deleteAuthor(id);
    }
}
