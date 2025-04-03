package comp440.demo.service;

import comp440.demo.model.Author;
import comp440.demo.model.Publication;
import comp440.demo.repository.AuthorRepository;
import comp440.demo.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PublicationService {
    @Autowired
    private PublicationRepository pubRepo;

    @Autowired
    private AuthorRepository authorRepo;

    public List<Publication> getAllPublications() {
        return pubRepo.findAll();
    }

    public List<Publication> getByAuthor(Long authorId) {
        return pubRepo.findByAuthors_Id(authorId);
    }

    public List<Publication> searchByKeyword(String keyword) {
        return pubRepo.findByKeywordsContainingIgnoreCase(keyword);
    }

    public Publication createPublication(Publication publication, List<Long> authorIds) {
        Set<Author> authors = new HashSet<>(authorRepo.findAllById(authorIds));
        publication.setAuthors(authors);
        return pubRepo.save(publication);
    }
}
