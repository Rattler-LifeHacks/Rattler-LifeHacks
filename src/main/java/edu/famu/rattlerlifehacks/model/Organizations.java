package edu.famu.rattlerlifehacks.model;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//needs a rest and ab; event and orgid are refs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organizations{
    @DocumentId
    String  orgId;
    String contactNumber;
    String description;
    String email;
    String eventId;
    String name;

}
