package comp440.demo.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comp440.demo.model.Author;
import comp440.demo.model.Publication;
import comp440.demo.repository.AuthorRepository;
import comp440.demo.repository.PublicationRepository;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository pubRepo;

    @Autowired
    private AuthorRepository authorRepo;

    // Get all publications
    public List<Publication> getAllPublications() {
        return pubRepo.findAll();
    }

    // Get publications by author ID
    public List<Publication> getByAuthor(Long authorId) {
        return pubRepo.findByAuthorEntities_IdAuthor(authorId);
    }

    // Search publications by keyword
    public List<Publication> searchByKeyword(String keyword) {
        return pubRepo.findByKeywordsContainingIgnoreCase(keyword);
    }

    // Create new publication with linked authors
    public Publication createPublication(Publication publication, List<Long> authorIds) {
        Set<Author> authors = new HashSet<>(authorRepo.findAllById(authorIds));
        publication.setAuthorEntities(authors);
        return pubRepo.save(publication);
    }

    // Update existing publication
    public Publication updatePublication(Long id, Publication updatedPub, List<Long> authorIds) {
        Publication existing = pubRepo.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setTitle(updatedPub.getTitle());
        existing.setYear(updatedPub.getYear());
        existing.setPages(updatedPub.getPages());
        existing.setInstitution(updatedPub.getInstitution());
        existing.setDepartment(updatedPub.getDepartment());
        existing.setKeywords(updatedPub.getKeywords());
        existing.setAuthors(updatedPub.getAuthors());

        if (authorIds != null) {
            Set<Author> authors = new HashSet<>(authorRepo.findAllById(authorIds));
            existing.setAuthorEntities(authors);
        }

        return pubRepo.save(existing);
    }

    // Delete a publication by ID
    public void deletePublication(Long id) {
        pubRepo.deleteById(id);
    }

    // Utility method to fetch publication by ID
    public Publication getPublicationById(Long id) {
        return pubRepo.findById(id).orElse(null);
    }

    // Optional: save directly if needed by controller
    public Publication savePublication(Publication publication) {
        return pubRepo.save(publication);
    }
}
