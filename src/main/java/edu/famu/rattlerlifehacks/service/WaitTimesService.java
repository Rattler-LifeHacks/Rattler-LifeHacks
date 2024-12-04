package edu.famu.rattlerlifehacks.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import edu.famu.rattlerlifehacks.model.Events;
import edu.famu.rattlerlifehacks.model.WaitTimes;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@Service
public class WaitTimesService {

    private static Firestore firestore;
    private static final String WAITTIMES_COLLECTION = "WaitTimes";

    public WaitTimesService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    public WaitTimes createWaitTime(WaitTimes waitTime) throws ExecutionException, InterruptedException {
        DocumentReference waitTimeRef = firestore.collection(WAITTIMES_COLLECTION).document();

        // Asynchronously save the event to Firestore
        ApiFuture<WriteResult> writeResult = waitTimeRef.set(waitTime);
        writeResult.get();
        return waitTime;
    }


    private WaitTimes documentToWaitTimes(DocumentSnapshot document) throws ParseException {
        return document.exists() ? document.toObject(WaitTimes.class) : null;
    }


    public static WaitTimes updateWaitTime(String locationId, Integer currentWaitTime, Timestamp lastUpdated) throws ExecutionException, InterruptedException {
        DocumentReference waitTimeRef = firestore.collection(WAITTIMES_COLLECTION).document();
        Map<String, Object> updates = new HashMap<>();
        updates.put("currentWaitTime", currentWaitTime);
        updates.put("lastUpdated", lastUpdated);

        ApiFuture<WriteResult> writeResult = waitTimeRef.update(updates);
        writeResult.get();  // Ensures the update completes before returning

        // Return the updated WaitTimes object
        WaitTimes updatedWaitTime = new WaitTimes();
        updatedWaitTime.setLocationId(locationId);
        updatedWaitTime.setCurrentWaitTime(currentWaitTime);
        updatedWaitTime.setLastUpdated(lastUpdated);
        return updatedWaitTime;

    }


}
