package com.sunnymix.graphviews.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

/**
 * @author sunnymix
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GraphUpdateForm {

    @Builder.Default
    private Optional<String> name = Optional.empty();

    @Builder.Default
    private Optional<String> source = Optional.empty();

}
