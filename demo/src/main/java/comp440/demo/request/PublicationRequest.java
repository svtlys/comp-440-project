package comp440.demo.request;

import comp440.demo.model.Publication;
import java.util.List;

public class PublicationRequest {
    private Publication publication;
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
