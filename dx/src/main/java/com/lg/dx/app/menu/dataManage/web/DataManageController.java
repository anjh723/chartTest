package com.lg.dx.app.menu.dataManage.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lg.dx.app.user.service.UserService;

@Controller
public class DataManageController {

    @Autowired
    private UserService userService;

    @GetMapping("/dataManage")
    public String intro(HttpSession session) {
        return userService.sessionCheck(session, "/menu/dataManage/view");
    }
}