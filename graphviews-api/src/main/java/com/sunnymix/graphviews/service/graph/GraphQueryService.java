package com.sunnymix.graphviews.service.graph;

import com.sunnymix.graphviews.dao.GraphDao;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author sunnymix
 */
@Service
public class GraphQueryService {

    @Autowired
    private GraphDao graphDao;

    public Optional<Graph> get(String id) {
        return graphDao.get(id);
    }

    // FIXME：重构query接口

}
