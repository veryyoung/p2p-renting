package gg.sf.renting.model;

import gg.sf.renting.entity.Room;
import gg.sf.renting.enums.SexLimit;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */

@Data
public class Info {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(length = 32)
    private String id;

    private Location location;

    private boolean jointRent;

    /**
     * 对租客来说，是租住人的个数；
     * 对房东来说，是限住认识
     */
    private int peopleNumber;

    private SexLimit sexLimit;

    private double acreage;



}
