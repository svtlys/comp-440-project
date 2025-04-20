package comp440.demo.controller;

import comp440.demo.model.Publication;
import comp440.demo.service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import comp440.demo.request.PublicationRequest;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    // Get all publications
    @GetMapping
    public List<Publication> getAll() {
        return publicationService.getAllPublications();
    }

    // Get all publications by a specific author
    @GetMapping("/author/{authorId}")
    public List<Publication> getByAuthor(@PathVariable Long authorId) {
        return publicationService.getByAuthor(authorId);
    }

    // Create a new publication with associated author IDs
    @PostMapping
    public Publication createPublication(@RequestBody PublicationRequest request) {
        return publicationService.createPublication(request.getPublication(), request.getAuthorIds());
    }

    // Update a publication by ID
    @PutMapping("/{id}")
    public void updatePublication(@PathVariable Long id, @RequestBody PublicationRequest request) {
        publicationService.updatePublication(id, request.getPublication(), request.getAuthorIds());
    }


    // Delete a publication by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        publicationService.deletePublication(id);
    }
}
