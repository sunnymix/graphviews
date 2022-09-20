package com.sunnymix.graphviews.api;

import com.sunnymix.graphviews.common.io.Out;
import com.sunnymix.graphviews.dao.GraphDao;
import com.sunnymix.graphviews.data.GraphUpdateForm;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import com.sunnymix.graphviews.service.GraphUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author sunnymix
 */
@RestController
public class GraphController {

    // FIXME：query和get接口重构为通过queryService访问

    @Autowired
    private GraphDao graphDao;

    @Autowired
    private GraphUpdateService updateService;

    @GetMapping("/graph/query")
    public Out<List<Graph>> query(
        @RequestParam(name = "keyword", required = false) String keyword) {

        List<Graph> graphs = graphDao.query(keyword);
        return Out.ok(graphs);
    }

    @GetMapping("/graph/get/{id}")
    public Out<Graph> get(
        @PathVariable("id") String id) {

        Optional<Graph> graph = graphDao.get(id);
        return Out.ok(graph);
    }

    @PostMapping("/graph/update/{id}")
    public Out<Void> update(
        @PathVariable("id") String id,
        @RequestBody GraphUpdateForm form) {

        Boolean updateSuccess;
        updateSuccess = updateService.update(id, form);
        return Out.of(updateSuccess);
    }

}
