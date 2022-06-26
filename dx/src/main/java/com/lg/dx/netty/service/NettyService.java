package com.lg.dx.netty.service;

import java.util.Map;

public interface NettyService {

    /**
     * saveNettyMsgToRedis
     * 
     * @param msgMap
     * @return boolean
     * 
     * @desc netty에서 받은 TCP 메세지를 Redis서버에 Key, Value 형태로 저장
     */
	public boolean saveNettyMsgToRedis(Map<String, Object> msgMap);
}