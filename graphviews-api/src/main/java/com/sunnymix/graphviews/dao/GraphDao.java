package com.sunnymix.graphviews.dao;

import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import lombok.Getter;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.graphviews.orm.jooq.Tables.GRAPH;

/**
 * @author sunnymix
 */
@Repository
public class GraphDao {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public List<Graph> query(String keyword) {
        List<Graph> graphs;
        graphs = dsl
            .selectFrom(GRAPH)
            .where(GRAPH.NAME.contains(keyword))
            .orderBy(GRAPH.CREATED.desc())
            .fetchStreamInto(Graph.class)
            .collect(Collectors.toList());
        return graphs;
    }

}
