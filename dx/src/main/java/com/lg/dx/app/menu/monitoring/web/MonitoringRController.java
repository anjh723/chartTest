package com.lg.dx.app.menu.monitoring.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lg.dx.app.menu.monitoring.service.MonitoringService;
import com.lg.dx.app.menu.monitoring.vo.InnerData;
import com.lg.dx.app.menu.monitoring.vo.NVT;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class MonitoringRController {

    @Autowired
    private MonitoringService monitoringService;

    @PostMapping("/getTableColumns")
    public List<Map<String, Object>> getTableColumns(@RequestBody Map<String, Object> requests) {
        return monitoringService.getTableColumns(requests);
    }

    @PostMapping("/getStaticData")
    public List<NVT> getStaticData(@RequestBody Map<String, Object> requests) {
        return monitoringService.getStaticData(requests);
    }

    @PostMapping("/getSoundLiveData")
    public List<NVT> getSoundLiveData(@RequestBody Map<String, Object> requests) {
        return monitoringService.getSoundLiveData(requests);
    }

    @PostMapping("/getInnerLiveData")
    public List<InnerData> getInnerLiveData(@RequestBody Map<String, Object> requests) {
        return monitoringService.getInnerLiveData(requests);
    }

    @PostMapping("/getOutterLiveData")
    public List<Map<String, Object>> getOutterLiveData(@RequestBody Map<String, Object> requests) {
        return monitoringService.getOutterLiveData(requests);
    }

}