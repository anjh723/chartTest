package com.lg.dx.netty.server.handler;

import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class DXMsgParser {

    public Map<String, Object> parseToMap(String msg, String msgSeparator, String kvSeparator) throws Exception {
        if (msg.indexOf(msgSeparator) < 0
            || msg.indexOf(kvSeparator) < 0) {
            return null;
        }
        
        Map<String, Object> parsedMap = new HashMap<String, Object>();

        StringBuffer keyValueStore = new StringBuffer();
        StringBuffer keyStore = new StringBuffer();
        StringBuffer valueStore = new StringBuffer();

        StringTokenizer splitMsg = new StringTokenizer(msg, msgSeparator);

        // 구분자를 기준으로 split
        while (splitMsg.hasMoreTokens()) {
            try {
                keyValueStore.append(splitMsg.nextToken());
                keyStore.append(keyValueStore.toString().split(kvSeparator)[0].trim());
                valueStore.append(keyValueStore.toString().split(kvSeparator)[1].trim());
                
                parsedMap.put(keyStore.toString(), valueStore.toString());
    
                keyValueStore.delete(0, keyValueStore.length());
                keyStore.delete(0, keyStore.length());
                valueStore.delete(0, valueStore.length());
            } catch (Exception e) {
                e.printStackTrace();
                log.error(e.toString());
            }
        }
        
        return parsedMap;
    }
}