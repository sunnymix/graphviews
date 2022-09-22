package com.sunnymix.graphviews.service.graph;

import com.sunnymix.graphviews.dao.GraphDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author sunnymix
 */
@Service
public class GraphCopyService {

    @Autowired
    private GraphDao graphDao;

    public Optional<String> copy(String id) {
        return graphDao.copy(id);
    }

}
