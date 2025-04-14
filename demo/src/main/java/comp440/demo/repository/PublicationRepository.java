package comp440.demo.repository;

import comp440.demo.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {

    // Get all publications
    @Query(value = "SELECT * FROM Publication", nativeQuery = true)
    List<Publication> getAllPublications();

    // Get publications by author ID using the join table
    @Query(value = "SELECT p.* FROM Publication p " +
                   "JOIN AuthorPublication ap ON p.idPublication = ap.idPublication " +
                   "WHERE ap.idAuthor = :authorId", nativeQuery = true)
    List<Publication> findByAuthor(@Param("authorId") Long authorId);

    // Search by keyword
    @Query(value = "SELECT * FROM Publication WHERE keywords LIKE %:keyword%", nativeQuery = true)
    List<Publication> searchByKeyword(@Param("keyword") String keyword);

    // Insert publication
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Publication (title, authors, year, pages, institution, department, keywords) " +
                   "VALUES (:title, :authors, :year, :pages, :institution, :department, :keywords)", nativeQuery = true)
    void insertPublication(@Param("title") String title,
                           @Param("authors") String authors,
                           @Param("year") String year,
                           @Param("pages") String pages,
                           @Param("institution") String institution,
                           @Param("department") String department,
                           @Param("keywords") String keywords);

    // Update publication
    @Modifying
    @Transactional
    @Query(value = "UPDATE Publication SET title = :title, authors = :authors, year = :year, pages = :pages, " +
                   "institution = :institution, department = :department, keywords = :keywords " +
                   "WHERE idPublication = :id", nativeQuery = true)
    void updatePublication(@Param("id") Long id,
                           @Param("title") String title,
                           @Param("authors") String authors,
                           @Param("year") String year,
                           @Param("pages") String pages,
                           @Param("institution") String institution,
                           @Param("department") String department,
                           @Param("keywords") String keywords);

    // Delete publication
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Publication WHERE idPublication = :id", nativeQuery = true)
    void deletePublicationById(@Param("id") Long id);

    // Get last inserted publication ID (for linking)
    @Query(value = "SELECT LAST_INSERT_ID()", nativeQuery = true)
    Long getLastInsertedId();
}
