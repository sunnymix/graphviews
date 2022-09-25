package com.sunnymix.graphviews.service.graph;

import com.sunnymix.graphviews.dao.GraphDao;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author sunnymix
 */
@Service
public class GraphQueryService {

    @Autowired
    private GraphDao graphDao;

    public List<Graph> query(String keyword) {
        return graphDao.query(keyword);
    }

    public Optional<Graph> get(String id) {
        return graphDao.get(id);
    }

}
