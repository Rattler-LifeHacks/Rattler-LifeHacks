package edu.famu.rattlerlifehacks.controller;

import com.google.cloud.Timestamp;
import com.google.protobuf.util.Timestamps;
import edu.famu.rattlerlifehacks.model.Events;
import edu.famu.rattlerlifehacks.model.WaitTimes;
import edu.famu.rattlerlifehacks.service.WaitTimesService;
import edu.famu.rattlerlifehacks.util.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/waittimes")
public class WaitTimesController {

    private final WaitTimesService service = new WaitTimesService();

//create a wait time

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<WaitTimes>> createWaitTime(@RequestBody WaitTimes waitTime) {
        try {
            WaitTimes createdWaitTime = service.createWaitTime(waitTime);

            if (createdWaitTime != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "Wait Time created successfully", createdWaitTime, null));
            } else {
                return ResponseEntity.status(400).body(new ApiResponse<>(false, "Failed to create event", null, null));
            }

        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));

        }



    }
//use patch on postman to update waitTimes record partially
    @PutMapping ("/update/{locationId}")
    public ResponseEntity<ApiResponse<WaitTimes>> updateWaitTime(
            @PathVariable String locationId,
            @RequestParam Integer currentWaitTime,
            @RequestParam String lastUpdated) {
        try {
            Timestamp updated = Timestamp.fromProto(Timestamps.parse(lastUpdated));
            //WaitTimes updatedWaitTime = WaitTimesService.updateWaitTime(locationId, currentWaitTime, lastUpdated);
            WaitTimes wt = service.updateWaitTime(locationId, currentWaitTime, updated);

            return ResponseEntity.ok(new ApiResponse<>(true, "Wait time updated successfully", wt, null));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));
        } catch (ParseException e) {
            return ResponseEntity.status(400).body(new ApiResponse<>(false, "Invalid date format", null, e));
        }
    }
}

