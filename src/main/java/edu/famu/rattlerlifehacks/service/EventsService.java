package edu.famu.rattlerlifehacks.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
        import com.google.firebase.cloud.FirestoreClient;
import edu.famu.rattlerlifehacks.model.Events;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@Service
public class EventsService {
    private static Firestore firestore;
    private static final String EVENTS_COLLECTION = "Events";
    public EventsService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    // Method to create a new event
    public Events createEvent(Events event) throws ExecutionException, InterruptedException {
        DocumentReference eventRef = firestore.collection(EVENTS_COLLECTION).document();
        event.setEventId(eventRef.getId());  // Set the auto-generated ID as the eventId

        // Asynchronously save the event to Firestore
        ApiFuture<WriteResult> writeResult = eventRef.set(event);
        writeResult.get(); // Wait for the write operation to complete
        return event;  // Return the saved event object
    }




    public List<Events> getAllEvents() throws ExecutionException, InterruptedException {
        CollectionReference eventsCollection = firestore.collection(EVENTS_COLLECTION);

        // Fetch all documents in the "Events" collection
        ApiFuture<QuerySnapshot> querySnapshot = eventsCollection.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        // Initialize the events list
        List<Events> events = new ArrayList<>();

        // Iterate over each document and map to Events object
        for (QueryDocumentSnapshot document : documents) {
            try {
                Events event = document.toObject(Events.class);
                event.setEventId(document.getId()); // Assign the Firestore document ID
                events.add(event); // Add the event to the list
            } catch (Exception e) {
                throw new RuntimeException("Error parsing event document: " + document.getId(), e);
            }
        }

        return events;
    }



    // Helper method to convert a DocumentSnapshot to an Event object
    private Events documentToEvent(DocumentSnapshot document) throws ParseException {
        return document.exists() ? document.toObject(Events.class) : null;
    }

    public  Events updateEventTime(String eventId, String title, String date) throws ExecutionException, InterruptedException, ParseException {
        DocumentReference eventRef = firestore.collection(EVENTS_COLLECTION).document(eventId);
        Map<String, Object> updates = new HashMap<>();
        updates.put("date", date);
        updates.put("title", title);



        ApiFuture<WriteResult> writeResult = eventRef.update(updates);
        writeResult.get();  // Ensures the update completes before returning

        Events updatedEvent = new Events();
        updatedEvent.setLocation(title);
        updatedEvent.setDate(date);
        updatedEvent.setId(eventId);
        return updatedEvent;

    }

    public static boolean deleteEventbyId(String eventId) throws ExecutionException, InterruptedException {
        DocumentReference eventRef = firestore.collection(EVENTS_COLLECTION).document(eventId);

        // Check if the user exists before attempting to delete
        DocumentSnapshot eventSnap = eventRef.get().get();
        if (!eventSnap.exists()) {
            return false; // User not found, nothing to delete
        }

        // Perform the delete operation
        ApiFuture<WriteResult> writeResult = eventRef.delete();

        // Check if the delete operation was successful
        WriteResult result = writeResult.get();

        return result != null;
    }
}
