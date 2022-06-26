package com.lg.dx.netty.web;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.lg.dx.netty.server.NettySocketServer;

@Controller
public class NettyController {

    @Autowired
    private NettySocketServer nettySocketServer;

    @PostConstruct
    private void start() {
        new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    nettySocketServer.run();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }).start();
    }

    @PreDestroy
    private void destory() {
        if (nettySocketServer != null) {
            nettySocketServer = null;
        }
    }
}