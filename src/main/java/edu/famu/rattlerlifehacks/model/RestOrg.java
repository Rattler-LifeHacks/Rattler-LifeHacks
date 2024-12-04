package edu.famu.rattlerlifehacks.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestOrg extends AOrg{
    public RestOrg(String orgId, String contactNumber, String description, String email, String eventId, String name) {
        super(orgId, contactNumber, description, email, eventId, name);
    }

}

