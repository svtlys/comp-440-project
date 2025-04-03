package comp440.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comp440.demo.model.Author;
import comp440.demo.repository.AuthorRepository;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepo;

    public List<Author> getAllAuthors() {
        return authorRepo.findAll();
    }

    public Author getAuthor(Long id) {
        return authorRepo.findById(id).orElse(null);
    }

    public List<Author> getByInstitution(String institution) {
        return authorRepo.findByInstitution(institution);
    }

    public Author createAuthor(Author author) {
        return authorRepo.save(author);
    }
}

