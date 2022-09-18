package com.sunnymix.graphviews.api;

import com.sunnymix.graphviews.common.io.Out;
import com.sunnymix.graphviews.dao.GraphDao;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * @author sunnymix
 */
@RestController
public class GraphController {

    @Autowired
    private GraphDao graphDao;

    @GetMapping("/graph/query")
    public Out<List<Graph>> query(@RequestParam("keyword") String keyword) {
        List<Graph> graphs = graphDao.query(keyword);
        return Out.ok(graphs);
    }

    @GetMapping("/graph/get")
    public Out<Graph> get(@RequestParam("id") String id) {
        Optional<Graph> graph = graphDao.get(id);
        return Out.ok(graph);
    }

}
