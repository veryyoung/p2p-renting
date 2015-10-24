package gg.sf.renting.model;

import gg.sf.renting.enums.SexLimit;
import lombok.Data;

import javax.persistence.MappedSuperclass;


/**
 * Created by veryyoung on 2015/10/24.
 */

@Data
@MappedSuperclass
public class Info {

    private Double longitude;

    private Double latitude;

    private String community;

    private boolean jointRent;

    /**
     * 对租客来说，是租住人的个数；
     * 对房东来说，是限住人数
     */
    private int peopleNumber;

    private SexLimit sexLimit;

    private double acreage;

    private String userId;



}
