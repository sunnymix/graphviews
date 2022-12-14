/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.graphviews.orm.jooq.tables.pojos;


import java.io.Serializable;
import java.time.OffsetDateTime;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Graph implements Serializable {

    private static final long serialVersionUID = 1L;

    private final String         id;
    private final String         name;
    private final String         source;
    private final OffsetDateTime created;

    public Graph(Graph value) {
        this.id = value.id;
        this.name = value.name;
        this.source = value.source;
        this.created = value.created;
    }

    public Graph(
        String         id,
        String         name,
        String         source,
        OffsetDateTime created
    ) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.created = created;
    }

    /**
     * Getter for <code>graphviews.graph.id</code>. ID
     */
    public String getId() {
        return this.id;
    }

    /**
     * Getter for <code>graphviews.graph.name</code>. 名称
     */
    public String getName() {
        return this.name;
    }

    /**
     * Getter for <code>graphviews.graph.source</code>. 源码
     */
    public String getSource() {
        return this.source;
    }

    /**
     * Getter for <code>graphviews.graph.created</code>. 创建时间
     */
    public OffsetDateTime getCreated() {
        return this.created;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Graph (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(source);
        sb.append(", ").append(created);

        sb.append(")");
        return sb.toString();
    }
}
