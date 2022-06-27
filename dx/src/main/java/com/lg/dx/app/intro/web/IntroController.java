package com.lg.dx.app.intro.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IntroController {

    @GetMapping("/intro")
    public String intro(HttpSession session) {
        return "redirect:/dataManage"; // 현재 인트로 페이지가 없으므로 첫번째 메뉴로 이동
    }
}