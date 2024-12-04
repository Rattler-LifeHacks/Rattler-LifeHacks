package edu.famu.rattlerlifehacks.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import edu.famu.rattlerlifehacks.model.User;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private static Firestore firestore;

    private static final String USER_COLLECTION = "User";

    public UserService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    public User getUserById(String userId) throws ExecutionException, InterruptedException, ParseException {
        DocumentReference usersRef = firestore.collection(USER_COLLECTION).document(userId);
        DocumentSnapshot userSnap = usersRef.get().get();
        if (!userSnap.exists()) {
            return null; // or throw a custom exception if desired
        }
        return documentToUser(userSnap);
    }

    private User documentToUser(DocumentSnapshot document) throws ParseException {
        User user = null;

        if(document.exists()){
           user = document.toObject(User.class);
        }

        return user;

    }


    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        CollectionReference usersCollection = firestore.collection(USER_COLLECTION);
        ApiFuture<QuerySnapshot> querySnapshot = usersCollection.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        // doing the entire query for Users in firebase, program will not wait for the response from this query

        List<User> users = documents.isEmpty() ? null : new ArrayList<>();
        // variable for the results above, below: if nothing, null, if not, allocated name

        documents.forEach(document -> {
            User user = null;
            try {
                user = documentToUser(document);
            }catch (ParseException e){
                throw new RuntimeException(e);
            }
            users.add(user);
        });
        return users;
    }

    public static boolean deleteUserbyId(String userId) throws ExecutionException, InterruptedException {
        DocumentReference userRef = firestore.collection(USER_COLLECTION).document(userId);

        // Check if the user exists before attempting to delete
        DocumentSnapshot userSnap = userRef.get().get();
        if (!userSnap.exists()) {
            return false; // User not found, nothing to delete
        }

        // Perform the delete operation
        ApiFuture<WriteResult> writeResult = userRef.delete();

        // Check if the delete operation was successful
        WriteResult result = writeResult.get();

        return result != null;
    }

}
