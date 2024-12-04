package edu.famu.rattlerlifehacks.controller;

import com.google.cloud.Timestamp;
import edu.famu.rattlerlifehacks.model.Events;
import edu.famu.rattlerlifehacks.model.WaitTimes;
import edu.famu.rattlerlifehacks.service.WaitTimesService;
import edu.famu.rattlerlifehacks.util.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/waittimes")
public class WaitTimesController {

    private WaitTimesService service;




//create a wait time
    public WaitTimesController(WaitTimesService service) {
        this.service = service;
    }
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
            @RequestParam Timestamp lastUpdated) {
        try {
            //WaitTimes updatedWaitTime = WaitTimesService.updateWaitTime(locationId, currentWaitTime, lastUpdated);
            WaitTimes wt = service.updateWaitTime(locationId, currentWaitTime, lastUpdated);

            return ResponseEntity.ok(new ApiResponse<>(true, "Wait time updated successfully", wt, null));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Internal Server Error", null, e));
        }
    }
}

