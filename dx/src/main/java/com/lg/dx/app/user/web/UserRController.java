package com.lg.dx.app.user.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.lg.dx.app.user.service.UserService;
import com.lg.dx.app.user.vo.UserEntity;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserRController {

    @Autowired
    private UserService userService;

    @SneakyThrows
    @PostMapping("/join")
    public String join(UserEntity user, @RequestParam("profile") MultipartFile multipartFile) {
        userService.join(user, multipartFile);
        return "redirect:/index";
    }

    @PostMapping("/login")
    public String login(@RequestParam("email") String email,
            @RequestParam("password") String password,
            Model model,
            HttpSession session) {
        boolean login = userService.login(email, password, session);
        if (login) {
            return "redirect:/intro";
        } else {
            model.addAttribute("result", "계정을 확인해 주세요.");
            return "redirect:/login";
        }

    }

}