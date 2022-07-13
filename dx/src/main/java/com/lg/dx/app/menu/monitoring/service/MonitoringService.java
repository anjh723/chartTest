package com.lg.dx.app.menu.monitoring.service;

import java.util.List;
import java.util.Map;

import com.lg.dx.app.menu.monitoring.vo.InnerData;
import com.lg.dx.app.menu.monitoring.vo.NVT;

public interface MonitoringService {
    List<Map<String, Object>> getTableColumns(Map<String, Object> requests);

    List<NVT> getStaticData(Map<String, Object> requests);

    List<NVT> getSoundLiveData(Map<String, Object> requests);

    List<InnerData> getInnerLiveData(Map<String, Object> requests);

    List<Map<String, Object>> getOutterLiveData(Map<String, Object> requests);

}