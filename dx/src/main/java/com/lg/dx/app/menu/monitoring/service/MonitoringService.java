package com.lg.dx.app.menu.monitoring.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.lg.dx.app.menu.monitoring.vo.NVT;

public interface MonitoringService {

    List<NVT> monitoring(int page);

    HashMap<String, Object> outMonitoring(int page);

    HashMap<String, Object> inMonitoring(int page);

    List<NVT> getStaticData(Map<String, Object> requests);

    List<NVT> getLiveData(Map<String, Object> requests);

}