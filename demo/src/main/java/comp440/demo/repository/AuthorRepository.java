package comp440.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import comp440.demo.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findByInstitution(String institution);
    List<Author> findByDepartment(String department);
}
