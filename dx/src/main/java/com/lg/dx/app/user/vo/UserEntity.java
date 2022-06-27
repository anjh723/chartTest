package com.lg.dx.app.user.vo;

import javax.persistence.*;

import org.hibernate.annotations.Nationalized;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_User")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    private Long UID;

    @Nationalized
    private String email;

    @Nationalized
    private String password;

    @Nationalized
    private String name;

    @Nationalized
    private String tel;

    @Nationalized
    @Column(name = "Position")
    private String position;

    @Nationalized
    private String department;

    @Nationalized
    private String profile;
}