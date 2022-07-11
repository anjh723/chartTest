package com.lg.dx.app.menu.monitoring.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.lg.dx.app.menu.monitoring.vo.InnerData;
import com.lg.dx.app.menu.monitoring.vo.NVT;

@Repository
@Mapper
public interface MonitoringMapper {
    List<NVT> monitoring(int page);

    HashMap<String, Object> outMonitoring(int page);

    HashMap<String, Object> inMonitoring(int page);

    List<NVT> getStaticData(Map<String, Object> requests);

    List<NVT> getSoundLiveData(Map<String, Object> requests);

    List<InnerData> getInnerLiveData(Map<String, Object> requests);
}