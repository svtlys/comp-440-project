package comp440.demo.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AuthorPublicationRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void linkAuthorToPublication(Long authorId, Long publicationId) {
        entityManager.createNativeQuery("INSERT INTO AuthorPublication (idAuthor, idPublication) VALUES (?, ?)")
            .setParameter(1, authorId)
            .setParameter(2, publicationId)
            .executeUpdate();
    }

    @Transactional
    public void deleteLinksByPublication(Long publicationId) {
        entityManager.createNativeQuery("DELETE FROM AuthorPublication WHERE idPublication = ?")
            .setParameter(1, publicationId)
            .executeUpdate();
    }
}
