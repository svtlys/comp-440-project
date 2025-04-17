package comp440.demo.service;

import comp440.demo.model.Publication;
import comp440.demo.repository.AuthorPublicationRepository;
import comp440.demo.repository.AuthorRepository;
import comp440.demo.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private AuthorPublicationRepository authorPublicationRepository;

    @Autowired
    private AuthorRepository authorRepository; 


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
        if (pub == null) {
            throw new IllegalArgumentException("Publication cannot be null");
        }
    
        //Manually construct author string from authorIds
        String authorsString = authorIds.stream()
            .map(id -> authorRepository.findById(id).map(a -> a.getName()).orElse("Unknown"))
            .collect(Collectors.joining(", "));
    
        //Insert publication (for legacy display of authors)
        publicationRepository.insertPublication(
            pub.getTitle(),
            authorsString,
            pub.getYear(),
            pub.getPages(),
            pub.getInstitution(),
            pub.getDepartment(),
            pub.getKeywords()
        );
    
        // Get newly inserted ID
        Long newId = publicationRepository.getLastInsertedId();
    
        // Manually insert into join table
        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, newId);
        }
    
        pub.setIdPublication(newId);
        pub.setAuthors(authorsString); // for completeness
        return pub;
    }
    

    @Transactional
    public void updatePublication(Long id, Publication pub, List<Long> authorIds) {
        publicationRepository.updatePublication(
            id,
            pub.getTitle(),
            pub.getAuthors(),
            String.valueOf(pub.getYear()),
            pub.getPages(),
            pub.getInstitution(),
            pub.getDepartment(),
            pub.getKeywords()
        );

        // Remove previous links
        authorPublicationRepository.deleteLinksByPublication(id);

        // Insert new links
        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, id);
        }
    }

    @Transactional
    public void deletePublication(Long id) {
        authorPublicationRepository.deleteLinksByPublication(id);
        publicationRepository.deletePublicationById(id);
    }
}
