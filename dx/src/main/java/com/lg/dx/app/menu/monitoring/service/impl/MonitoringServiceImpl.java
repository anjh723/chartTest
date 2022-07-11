package com.lg.dx.app.menu.monitoring.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lg.dx.app.menu.monitoring.mapper.MonitoringMapper;
import com.lg.dx.app.menu.monitoring.service.MonitoringService;
import com.lg.dx.app.menu.monitoring.vo.InnerData;
import com.lg.dx.app.menu.monitoring.vo.NVT;

@Service
public class MonitoringServiceImpl implements MonitoringService {

    @Autowired
    private MonitoringMapper monitoringMapper;

    @Override
    public List<NVT> monitoring(int page) {
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

    @Override
    public List<NVT> getStaticData(Map<String, Object> requests) {
        return monitoringMapper.getStaticData(requests);
    }

    @Override
    public List<NVT> getSoundLiveData(Map<String, Object> requests) {
        List<NVT> result = monitoringMapper.getSoundLiveData(requests);

        return result;
    }

    @Override
    public List<InnerData> getInnerLiveData(Map<String, Object> requests) {
        List<InnerData> result = monitoringMapper.getInnerLiveData(requests);

        return result;
    }
}