package com.sunnymix.graphviews.service;

import com.sunnymix.graphviews.dao.GraphDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author sunny
 */
@Service
public class GraphCreateService {

    @Autowired
    private GraphDao graphDao;

    public String create() {
        String id = graphDao.create();
        return id;
    }

}
