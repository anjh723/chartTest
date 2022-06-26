package com.lg.dx.netty.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.lg.dx.netty.service.NettyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NettyServiceImpl implements NettyService {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean saveNettyMsgToRedis(Map<String, Object> msgMap) {
        boolean result = false;

        if (msgMap == null) {
            return result;
        }

        try {
            HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
            hashOperations.putAll("key", msgMap);

            String firstName = (String) redisTemplate.opsForHash().get("key", "firstName");
            String lastName = (String) redisTemplate.opsForHash().get("key", "lastName");
            String gender = (String) redisTemplate.opsForHash().get("key", "gender");
            System.out.println(firstName);
            System.out.println(lastName);
            System.out.println(gender);

            result = true;
        } catch (Exception e) {
            result = false;
            e.printStackTrace();
            log.error(e.toString());
        }


        return result;
    }
}