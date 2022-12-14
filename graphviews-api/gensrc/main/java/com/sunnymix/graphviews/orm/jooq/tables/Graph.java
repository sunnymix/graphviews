/*
 * This file is generated by jOOQ.
 */
package com.sunnymix.graphviews.orm.jooq.tables;


import com.sunnymix.graphviews.common.jooq.converter.LocalDateTimeToOffsetDateTimeConverter;
import com.sunnymix.graphviews.orm.jooq.Graphviews;
import com.sunnymix.graphviews.orm.jooq.Keys;
import com.sunnymix.graphviews.orm.jooq.tables.records.GraphRecord;

import java.time.OffsetDateTime;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row4;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Graph extends TableImpl<GraphRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>graphviews.graph</code>
     */
    public static final Graph GRAPH = new Graph();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<GraphRecord> getRecordType() {
        return GraphRecord.class;
    }

    /**
     * The column <code>graphviews.graph.id</code>. ID
     */
    public final TableField<GraphRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(50).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "ID");

    /**
     * The column <code>graphviews.graph.name</code>. 名称
     */
    public final TableField<GraphRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(100).nullable(false).defaultValue(DSL.inline("", SQLDataType.VARCHAR)), this, "名称");

    /**
     * The column <code>graphviews.graph.source</code>. 源码
     */
    public final TableField<GraphRecord, String> SOURCE = createField(DSL.name("source"), SQLDataType.CLOB.nullable(false), this, "源码");

    /**
     * The column <code>graphviews.graph.created</code>. 创建时间
     */
    public final TableField<GraphRecord, OffsetDateTime> CREATED = createField(DSL.name("created"), SQLDataType.LOCALDATETIME(0).nullable(false).defaultValue(DSL.field("CURRENT_TIMESTAMP", SQLDataType.LOCALDATETIME)), this, "创建时间", new LocalDateTimeToOffsetDateTimeConverter());

    private Graph(Name alias, Table<GraphRecord> aliased) {
        this(alias, aliased, null);
    }

    private Graph(Name alias, Table<GraphRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>graphviews.graph</code> table reference
     */
    public Graph(String alias) {
        this(DSL.name(alias), GRAPH);
    }

    /**
     * Create an aliased <code>graphviews.graph</code> table reference
     */
    public Graph(Name alias) {
        this(alias, GRAPH);
    }

    /**
     * Create a <code>graphviews.graph</code> table reference
     */
    public Graph() {
        this(DSL.name("graph"), null);
    }

    public <O extends Record> Graph(Table<O> child, ForeignKey<O, GraphRecord> key) {
        super(child, key, GRAPH);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Graphviews.GRAPHVIEWS;
    }

    @Override
    public UniqueKey<GraphRecord> getPrimaryKey() {
        return Keys.KEY_GRAPH_PRIMARY;
    }

    @Override
    public Graph as(String alias) {
        return new Graph(DSL.name(alias), this);
    }

    @Override
    public Graph as(Name alias) {
        return new Graph(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Graph rename(String name) {
        return new Graph(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Graph rename(Name name) {
        return new Graph(name, null);
    }

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, String, OffsetDateTime> fieldsRow() {
        return (Row4) super.fieldsRow();
    }
}
