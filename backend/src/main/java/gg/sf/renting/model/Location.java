package gg.sf.renting.model;

import lombok.Data;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Data
public class Location {

    private String province;

    private String city;

    private String region;

    private List<String> community;

}
