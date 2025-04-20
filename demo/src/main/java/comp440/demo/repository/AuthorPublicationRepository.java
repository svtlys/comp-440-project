package comp440.demo.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository  
public class AuthorPublicationRepository {

    // EntityManager write custom SQL queries directly
    @PersistenceContext
    private EntityManager entityManager;


        //This method inserts a row into the AuthorPublication join table.
        //It links an author to a publication using their respective IDs.

    @Transactional  // Makes sure the operation is completed successfully or rolled back
    public void linkAuthorToPublication(Long authorId, Long publicationId) {
        entityManager.createNativeQuery(
                "INSERT INTO AuthorPublication (idAuthor, idPublication) VALUES (?, ?)"
            )
            .setParameter(1, authorId)
            .setParameter(2, publicationId)
            .executeUpdate();  // Executes the INSERT query
    }

    /* 
     method removes all links for a given publication ID
     from the AuthorPublication join table.
     to updating or deleting a publication to clean up old links. */

    @Transactional
    public void deleteLinksByPublication(Long publicationId) {
        entityManager.createNativeQuery(
                "DELETE FROM AuthorPublication WHERE idPublication = ?"
            )
            .setParameter(1, publicationId)
            .executeUpdate();  // Executes the DELETE query
    }
}
