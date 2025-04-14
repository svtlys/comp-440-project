package comp440.demo.service;

import comp440.demo.model.Publication;
import comp440.demo.repository.AuthorPublicationRepository;
import comp440.demo.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private AuthorPublicationRepository authorPublicationRepository;

    public List<Publication> getAllPublications() {
        return publicationRepository.getAllPublications();
    }

    public List<Publication> getByAuthor(Long authorId) {
        return publicationRepository.findByAuthor(authorId);
    }

    public List<Publication> searchByKeyword(String keyword) {
        return publicationRepository.searchByKeyword(keyword);
    }

    @Transactional
    public Publication createPublication(Publication pub, List<Long> authorIds) {
        publicationRepository.insertPublication(
            pub.getTitle(),
            pub.getAuthors(),
            String.valueOf(pub.getYear()),  // Convert int to String
            pub.getPages(),
            pub.getInstitution(),
            pub.getDepartment(),
            pub.getKeywords()
        );

        Long newId = publicationRepository.getLastInsertedId();

        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, newId);
        }

        pub.setIdPublication(newId); // Set the generated ID
        return pub;
    }

    @Transactional
    public void updatePublication(Long id, Publication pub, List<Long> authorIds) {
        publicationRepository.updatePublication(
            id,
            pub.getTitle(),
            pub.getAuthors(),
            String.valueOf(pub.getYear()),
            pub.getPages(), // leave as-is if it's already a String
            pub.getInstitution(),
            pub.getDepartment(),
            pub.getKeywords()
        );
        
        // Delete old author links
        authorPublicationRepository.deleteLinksByPublication(id);
    
        // Insert new author links
        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, id);
        }
    }
    
    @Transactional
    public void deletePublication(Long id) {
        authorPublicationRepository.deleteLinksByPublication(id);
        publicationRepository.deletePublicationById(id); // ✅ This is the correct method name!
    }
}    