package com.lg.dx.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.lg.dx"})
public class DxApplication {

	public static void main(String[] args) {
		SpringApplication.run(DxApplication.class, args);
	}

}
