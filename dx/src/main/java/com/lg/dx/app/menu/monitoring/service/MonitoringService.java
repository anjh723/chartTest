package com.lg.dx.app.menu.monitoring.service;

import java.util.HashMap;
import java.util.List;

import com.lg.dx.app.menu.monitoring.vo.NVT3;

public interface MonitoringService {

    List<NVT3> monitoring(int page);

    HashMap<String, Object> outMonitoring(int page);

    HashMap<String, Object> inMonitoring(int page);

}