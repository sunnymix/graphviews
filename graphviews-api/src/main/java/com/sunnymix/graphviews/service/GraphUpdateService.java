package com.sunnymix.graphviews.service;

import com.sunnymix.graphviews.dao.GraphDao;
import com.sunnymix.graphviews.data.GraphUpdateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author sunnymix
 */
@Service
public class GraphUpdateService {

    @Autowired
    private GraphDao graphDao;

    public Boolean update(String id, GraphUpdateForm form) {
        return graphDao.update(id, form.getName(), form.getSource());
    }

}
