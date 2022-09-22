package com.sunnymix.graphviews.service.graph;

import com.sunnymix.graphviews.dao.GraphDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author sunnymix
 */
@Service
public class GraphDeleteService {

    @Autowired
    private GraphDao graphDao;

    public Boolean delete(String id) {
        return graphDao.delete(id);
    }

}
