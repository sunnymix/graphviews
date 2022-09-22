package com.sunnymix.graphviews.dao;

import com.sunnymix.graphviews.common.Id;
import com.sunnymix.graphviews.orm.jooq.tables.pojos.Graph;
import com.sunnymix.graphviews.orm.jooq.tables.records.GraphRecord;
import lombok.Getter;
import org.jooq.DSLContext;
import org.jooq.UpdateSetFirstStep;
import org.jooq.UpdateSetMoreStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
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

    public Optional<Graph> get(String id) {
        Graph graph;
        graph = dsl
            .selectFrom(GRAPH)
            .where(GRAPH.ID.eq(id))
            .limit(1)
            .fetchOneInto(Graph.class);
        return Optional.of(graph);
    }

    public Boolean update(String id,
                          Optional<String> name,
                          Optional<String> source) {

        UpdateSetFirstStep<GraphRecord> update = getDsl().update(GRAPH);
        UpdateSetMoreStep<GraphRecord> set = null;

        if (name.isPresent()) {
            set = update.set(GRAPH.NAME, name.get());
        }

        if (source.isPresent()) {
            set = update.set(GRAPH.SOURCE, source.get());
        }

        if (set != null) {
            int updateCount = set.where(GRAPH.ID.eq(id)).execute();
        }

        return true;
    }

    public String create() {
        String id = Id.newId();
        GraphRecord graphRecord = new GraphRecord();
        graphRecord.setId(id);
        graphRecord.setName("");
        graphRecord.setSource("");
        graphRecord.setCreated(OffsetDateTime.now());
        dsl.executeInsert(graphRecord);
        return id;
    }

    public Boolean delete(String id) {
        int deleteCount = dsl.deleteFrom(GRAPH).where(GRAPH.ID.eq(id)).execute();
        return true;
    }

}
