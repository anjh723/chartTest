package com.lg.dx.app.menu.monitoring.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lg.dx.app.menu.monitoring.mapper.MonitoringMapper;
import com.lg.dx.app.menu.monitoring.service.MonitoringService;
import com.lg.dx.app.menu.monitoring.vo.NVT3;

@Service
public class MonitoringServiceImpl implements MonitoringService {

    @Autowired
    private MonitoringMapper monitoringMapper;

    @Override
    public List<NVT3> monitoring(int page) {
        return monitoringMapper.monitoring(page);
    }

    @Override
    public HashMap<String, Object> outMonitoring(int page) {
        return monitoringMapper.outMonitoring(page);
    }

    @Override
    public HashMap<String, Object> inMonitoring(int page) {
        return monitoringMapper.inMonitoring(page);
    }

}