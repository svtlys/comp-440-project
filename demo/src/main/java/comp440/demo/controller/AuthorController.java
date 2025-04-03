package comp440.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import comp440.demo.model.Author;
import comp440.demo.service.AuthorService;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping
    public List<Author> getAll() {
        return authorService.getAllAuthors();
    }

    @GetMapping("/{id}")
    public Author getById(@PathVariable Long id) {
        return authorService.getAuthor(id);
    }

    @GetMapping("/institution/{institution}")
    public List<Author> getByInstitution(@PathVariable String institution) {
        return authorService.getByInstitution(institution);
    }

    @PostMapping
    public Author create(@RequestBody Author author) {
        return authorService.createAuthor(author);
    }
}
