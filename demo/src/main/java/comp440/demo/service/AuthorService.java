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

    // Get all authors
    public List<Author> getAllAuthors() {
        return authorRepo.findAll();
    }

    // Get author by ID
    public Author getAuthor(Long id) {
        return authorRepo.findById(id).orElse(null);
    }

    // Get authors by institution
    public List<Author> getByInstitution(String institution) {
        return authorRepo.findByInstitution(institution);
    }

    // Add new author
    public Author createAuthor(Author author) {
        return authorRepo.save(author);
    }

    // Update existing author
    public Author updateAuthor(Long id, Author updatedAuthor) {
        Author existing = authorRepo.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(updatedAuthor.getName());
        existing.setInstitution(updatedAuthor.getInstitution());
        existing.setDepartment(updatedAuthor.getDepartment());
        existing.setEmail(updatedAuthor.getEmail());
        existing.setAddress(updatedAuthor.getAddress());
        existing.setHomepage(updatedAuthor.getHomepage());

        return authorRepo.save(existing);
    }

    // Delete author by ID
    public void deleteAuthor(Long id) {
        authorRepo.deleteById(id);
    }
}
