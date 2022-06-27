package com.lg.dx.app.menu.monitoring.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lg.dx.app.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/")
public class MonitoringController {

    @Autowired
    private UserService userService;

    @GetMapping("/monitoring")
    public String monitoring(HttpSession session) {
        return userService.sessionCheck(session, "/menu/monitoring/view");
    }
}