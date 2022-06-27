package com.lg.dx.app.user.service;

import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

import com.lg.dx.app.user.vo.UserEntity;

public interface UserService {

    String sessionCheck(HttpSession session, String string);

    boolean join(UserEntity user, MultipartFile multipartFile);

    boolean login(String email, String password, HttpSession session);
	
}