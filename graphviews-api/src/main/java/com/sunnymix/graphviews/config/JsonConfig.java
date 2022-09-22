package com.sunnymix.graphviews.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author sunnymix
 */
@Configuration
public class JsonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new JsonObjectMapper();
    }

}
