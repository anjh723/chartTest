package com.lg.dx.app.user.service.impl;

import java.io.File;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lg.dx.app.user.rep.UserRepository;
import com.lg.dx.app.user.service.UserService;
import com.lg.dx.app.user.vo.UserEntity;

import lombok.SneakyThrows;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @SneakyThrows
    @Override
    public boolean join(UserEntity user, MultipartFile multipartFile) {
        String profile;
        String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        File file = new File(System.getProperty("user.dir") + "/src/main/resources/static/images/profile/"
                + UUID.randomUUID().toString() + "." + fileExtension);

        try {

            if (multipartFile.isEmpty()) {
                profile = "/images/profile/empty.jpg";
            } else {
                FileUtils.copyInputStreamToFile(multipartFile.getInputStream(), file);
                profile = "/images/profile/" + file.getName();
            }

            userRepository.save(
                    UserEntity.builder()
                            .email(user.getEmail())
                            .password(user.getPassword())
                            .name(user.getName())
                            .tel(user.getTel())
                            .department(user.getDepartment())
                            .position(user.getPosition())
                            .profile(profile)
                            .build());
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean login(String email, String password, HttpSession session) {
        UserEntity access = userRepository.findByEmailAndPassword(email, password);
        if (access != null) {
            session.setAttribute("user", access);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String sessionCheck(HttpSession session, String href) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            return "/user/login";
        } else {
            return href;
        }
    }

}