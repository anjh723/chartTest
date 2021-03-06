package com.lg.dx.app.main.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(value = { "", "/", "main" })
    public String intro(HttpServletRequest request, HttpServletResponse response, Model model) {
        // chart test view
        return "/main/temp/test2/view";
    }
}