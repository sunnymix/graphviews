package com.sunnymix.graphviews.api;

import com.sunnymix.graphviews.common.Constant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/**
 * @author sunnymix
 */
@SpringBootApplication(scanBasePackages = {Constant.BASE_PACKAGE})
@ConfigurationPropertiesScan({Constant.BASE_PACKAGE})
public class GraphviewsApiApp {

    public static void main(String[] args) {
        SpringApplication.run(GraphviewsApiApp.class, args);
    }

}
