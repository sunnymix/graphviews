package com.sunnymix.graphviews.api;

import com.sunnymix.graphviews.common.io.Out;
import com.sunnymix.graphviews.data.GraphUpdateForm;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import com.sunnymix.graphviews.service.graph.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * FIXME：存储加密
 * FIXME：查询解密
 *
 * @author sunnymix
 */
@RestController
public class GraphController {

    @Autowired
    private GraphQueryService graphQueryService;

    @Autowired
    private GraphUpdateService graphUpdateService;

    @Autowired
    private GraphCreateService graphCreateService;

    @Autowired
    private GraphDeleteService graphDeleteService;

    @Autowired
    private GraphCopyService graphCopyService;

    @GetMapping("/graph/query")
    public Out<List<Graph>> query(@RequestParam(name = "keyword", required = false) String keyword) {
        List<Graph> graphs = graphQueryService.query(keyword);
        return Out.ok(graphs);
    }

    @GetMapping("/graph/get/{id}")
    public Out<Graph> get(@PathVariable("id") String id) {
        Optional<Graph> graph = graphQueryService.get(id);
        return Out.ok(graph);
    }

    @PostMapping("/graph/update/{id}")
    public Out<Void> update(@PathVariable("id") String id,
                            @RequestBody GraphUpdateForm form) {
        Boolean updateSuccess = graphUpdateService.update(id, form);
        return Out.of(updateSuccess);
    }

    @PostMapping("/graph/create")
    public Out<String> create() {
        String id = graphCreateService.create();
        return Out.ok(id);
    }

    @PostMapping("/graph/delete/{id}")
    public Out<Void> delete(@PathVariable("id") String id) {
        Boolean deleteSuccess = graphDeleteService.delete(id);
        return Out.of(deleteSuccess);
    }

    @PostMapping("/graph/copy/{id}")
    public Out<String> copy(@PathVariable("id") String id) {
        Optional<String> newId = graphCopyService.copy(id);
        return newId.map(Out::ok).orElse(Out.error());
    }

}
