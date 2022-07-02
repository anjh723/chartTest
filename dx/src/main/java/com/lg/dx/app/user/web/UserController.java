package com.lg.dx.app.user.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.lg.dx.app.user.service.UserService;
import com.lg.dx.app.user.vo.UserEntity;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "login")
    public String main(HttpSession session) {
        return userService.sessionCheck(session, "redirect:/intro");
    }

    @GetMapping(value = "/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.removeAttribute("User");
        session.invalidate();
        return "redirect:/login";
    }

    @GetMapping("/join")
    public String join(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user != null) {
            return "redirect:/";
        } else {
            return "user/join";
        }
    }
}