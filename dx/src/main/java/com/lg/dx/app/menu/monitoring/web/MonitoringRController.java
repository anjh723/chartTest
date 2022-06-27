package com.lg.dx.app.menu.monitoring.web;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lg.dx.app.menu.monitoring.service.MonitoringService;
import com.lg.dx.app.menu.monitoring.vo.NVT3;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class MonitoringRController {

    @Autowired
    private MonitoringService monitoringService;

    @GetMapping("/graphData/{page}")
    public List<NVT3> getGraphData(@PathVariable(name = "page") int page) {
        return monitoringService.monitoring(page);
    }

    @GetMapping("/getOutMonitoring/{page}")
    public HashMap<String, Object> getOutMonitoring(@PathVariable(name = "page") int page) {
        return monitoringService.outMonitoring(page);
    }

    @GetMapping("/getInMonitoring/{page}")
    public HashMap<String, Object> getInMonitoring(@PathVariable(name = "page") int page) {
        return monitoringService.inMonitoring(page);
    }

}