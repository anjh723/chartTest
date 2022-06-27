package com.lg.dx.app.menu.monitoring.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.lg.dx.app.menu.monitoring.vo.NVT3;

@Repository
@Mapper
public interface MonitoringMapper {
    List<NVT3> monitoring(int page);

    HashMap<String, Object> outMonitoring(int page);

    HashMap<String, Object> inMonitoring(int page);
}