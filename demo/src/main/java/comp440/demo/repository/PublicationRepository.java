package comp440.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import comp440.demo.model.Publication;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByAuthors_Id(Long authorId);
    List<Publication> findByKeywordsContainingIgnoreCase(String keyword);
}
