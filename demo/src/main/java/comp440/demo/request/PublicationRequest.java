package comp440.demo.request;

import comp440.demo.model.Publication;
import java.util.List;

/**
 * This is just a wrapper so we can send both the Publication info
 * and the list of author IDs together in one request.
 * Spring only lets you use one @RequestBody in the controller, so this fixes that.
 */

public class PublicationRequest {

    private Publication publication;

    // list of author IDs selected for that publication
    private List<Long> authorIds;

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public List<Long> getAuthorIds() {
        return authorIds;
    }
    public void setAuthorIds(List<Long> authorIds) {
        this.authorIds = authorIds;
    }
}
