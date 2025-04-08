package comp440.demo.controller;

import comp440.demo.model.Publication;
import comp440.demo.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    @GetMapping
    public List<Publication> getAll() {
        return publicationService.getAllPublications();
    }

    @GetMapping("/author/{authorId}")
    public List<Publication> getByAuthor(@PathVariable Long authorId) {
        return publicationService.getByAuthor(authorId);
    }

    @GetMapping("/search")
    public List<Publication> search(@RequestParam String keyword) {
        return publicationService.searchByKeyword(keyword);
    }

    @PostMapping
    public Publication create(@RequestBody Publication publication,
                              @RequestParam List<Long> authorIds) {
        return publicationService.createPublication(publication, authorIds);
    }

    @PutMapping("/{id}")
    public Publication updatePublication(@PathVariable Long id,
                              @RequestBody Publication updatedPub,
                              @RequestParam(required = false) List<Long> authorIds) {
        return publicationService.updatePublication(id, updatedPub, authorIds);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
    publicationService.deletePublication(id);
    }
}
