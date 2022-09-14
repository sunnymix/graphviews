package com.sunnymix.graphviews.common.io;

import lombok.*;

/**
 * @author sunnymix
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Out<T> {

    @NonNull
    private Boolean success;

    @NonNull
    private Page page;

    private T data;

    private String code;

    private String msg;

    public static <T> Out<T> of(Boolean success, Page page, T data, String code, String msg) {
        Out<T> out;
        out = new Out<>();
        out.setSuccess(success);
        out.setPage(page);
        out.setData(data);
        out.setCode(code);
        out.setMsg(msg);
        return out;
    }

    public static <T> Out<T> ok() {
        return of(true, Page.empty(), null, null, null);
    }

    public static <T> Out<T> ok(T data) {
        return of(true, Page.all(), data, null, null);
    }

    public static <T> Out<T> ok(Page page, T data) {
        return of(true, page, data, null, null);
    }

    public static <T> Out<T> error() {
        return of(false, Page.empty(), null, "1", "server error");
    }

    public static <T> Out<T> error(String code, String msg) {
        return of(false, Page.empty(), null, code, msg);
    }

}
