package gg.sf.renting.entity;

import gg.sf.renting.model.Info;
import lombok.Data;

import javax.persistence.Entity;
import java.util.List;


/**
 * Created by veryyoung on 2015/10/24.
 */
@Data
@Entity
public class RenterInfo extends Info {

    private String userId;

    private int minPrice;

    private int maxPrice;

    // 区域范围
    private Double areaRange;

    private List<Room> rooms;


}
