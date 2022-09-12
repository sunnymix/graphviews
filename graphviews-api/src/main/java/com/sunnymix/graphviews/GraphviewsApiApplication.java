package com.sunnymix.graphviews;

import com.sunnymix.graphviews.common.Constant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sunnymix
 */
@SpringBootApplication(scanBasePackages = {Constant.BASE_PACKAGE})
@ConfigurationPropertiesScan({Constant.BASE_PACKAGE})
public class GraphviewsApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GraphviewsApiApplication.class, args);
    }

    @RestController
    public static class DefaultController {

        @GetMapping("/")
        public String index() {
            return Constant.APP_NAME;
        }

    }

}
