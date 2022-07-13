package com.lg.dx.app.menu.monitoring.vo;

import lombok.Data;

@Data
public class OutterData {
    private long uid;
    private int time;

    private float temperature; // 온도
    private float humidity; // 습도

    private float power1; // 전력
    private float current1; // 전류
    private float f1_1;
    private float f1_2;
    private float f1_3;
    private float f1_4;
    private float r1_1;
    private float r1_2;
    private float r1_3;
    private float r1_4;
    private float frontTop1;
    private float frontMid1;
    private float frontBottom1;
    private float doorTop1;
    private float doorMid1;
    private float doorBottom1;

    private float power2; // 전력
    private float current2; // 전류
    private float f2_1;
    private float f2_2;
    private float f2_3;
    private float f2_4;
    private float r2_1;
    private float r2_2;
    private float r2_3;
    private float r2_4;
    private float frontTop2;
    private float frontMid2;
    private float frontBottom2;
    private float doorTop2;
    private float doorMid2;
    private float doorBottom2;
}