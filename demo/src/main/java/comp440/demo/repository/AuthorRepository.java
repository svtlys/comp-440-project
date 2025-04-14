package comp440.demo.repository;

import comp440.demo.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    // Custom native query to get all authors
    @Query(value = "SELECT * FROM Author", nativeQuery = true)
    List<Author> getAllAuthors();

    // Filter by institution
    @Query(value = "SELECT * FROM Author WHERE institution = :institution", nativeQuery = true)
    List<Author> findByInstitution(@Param("institution") String institution);

    // Filter by department
    @Query(value = "SELECT * FROM Author WHERE department = :department", nativeQuery = true)
    List<Author> findByDepartment(@Param("department") String department);

    // Insert author
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Author (name, institution, department, email, address, homepage) " +
                   "VALUES (:name, :institution, :department, :email, :address, :homepage)", nativeQuery = true)
    void insertAuthor(@Param("name") String name,
                      @Param("institution") String institution,
                      @Param("department") String department,
                      @Param("email") String email,
                      @Param("address") String address,
                      @Param("homepage") String homepage);

    // Update author
    @Modifying
    @Transactional
    @Query(value = "UPDATE Author SET name = :name, institution = :institution, department = :department, " +
                   "email = :email, address = :address, homepage = :homepage WHERE idAuthor = :id", nativeQuery = true)
    void updateAuthor(@Param("id") Long id,
                      @Param("name") String name,
                      @Param("institution") String institution,
                      @Param("department") String department,
                      @Param("email") String email,
                      @Param("address") String address,
                      @Param("homepage") String homepage);

    // Delete author
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Author WHERE idAuthor = :id", nativeQuery = true)
    void deleteAuthorById(@Param("id") Long id);
}
