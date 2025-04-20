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


    // Connects this service to the publication repository
    @Autowired
    private PublicationRepository publicationRepository;


    // Connects to the join table between author and publication
    @Autowired
    private AuthorPublicationRepository authorPublicationRepository;


    // Connects to the author repository to get author info
    @Autowired
    private AuthorRepository authorRepository;


    // GET all publications from the database
    public List<Publication> getAllPublications() {
        return publicationRepository.getAllPublications();
    }

    // GET all publications by a specific author using their ID
    public List<Publication> getByAuthor(Long authorId) {
        return publicationRepository.findByAuthor(authorId);
    }

    // CREATE a new publication and link it with its authors
    @Transactional
    public Publication createPublication(Publication pub, List<Long> authorIds) {
        if (pub == null) {
            throw new IllegalArgumentException("Publication cannot be null");
        }

        // Build a string of author names from their IDs
        String authorsString = authorIds.stream()
            .map(id -> authorRepository.findById(id).map(a -> a.getName()).orElse("Unknown"))
            .collect(Collectors.joining(", "));

        // Save the publication (with author string for display)
        publicationRepository.insertPublication(
            pub.getTitle(),
            authorsString,
            pub.getYear(),
            pub.getPages(),
            pub.getInstitution(),
            pub.getDepartment()
        );

        // Get ID of the new publication (for linking)
        Long newId = publicationRepository.getLastInsertedId();

        // Link each author to the publication in the join table
        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, newId);
        }

        // Set fields on the publication object for completeness
        pub.setIdPublication(newId);
        pub.setAuthors(authorsString);
        return pub;
    }


    // UPDATE an existing publication and its author links
    @Transactional
    public void updatePublication(Long id, Publication pub, List<Long> authorIds) {
        // Build updated author name string
        String authorsString = authorIds.stream()
            .map(id2 -> authorRepository.findById(id2).map(a -> a.getName()).orElse("Unknown"))
            .collect(Collectors.joining(", "));

        // Update the publication info in the database
        publicationRepository.updatePublication(
            id,
            pub.getTitle(),
            authorsString,
            pub.getYear(),
            pub.getPages(),
            pub.getInstitution(),
            pub.getDepartment()
        );

        // Remove old author links for this publication
        authorPublicationRepository.deleteLinksByPublication(id);

        // Add new author links
        for (Long authorId : authorIds) {
            authorPublicationRepository.linkAuthorToPublication(authorId, id);
        }
    }

    // DELETE a publication and all its author links
    @Transactional
    public void deletePublication(Long id) {
        // Delete links from the join table first
        authorPublicationRepository.deleteLinksByPublication(id);

        // Then delete the publication itself
        publicationRepository.deletePublicationById(id);
    }
}
