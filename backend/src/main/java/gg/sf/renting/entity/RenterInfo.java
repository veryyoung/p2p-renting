package gg.sf.renting.entity;

import gg.sf.renting.model.Info;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;


/**
 * Created by veryyoung on 2015/10/24.
 */
@Data
@Entity
@Table(name = "renter_info")
public class RenterInfo extends Info {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(length = 32)
    private String id;

    private int minPrice;

    private int maxPrice;

    // 区域范围
    private Double areaRange;


}
