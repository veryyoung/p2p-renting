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
@Table(name = "land_info")
public class LandlordInfo extends Info {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(length = 32)
    private String id;

    private String doorNumber;

    private double price;

    @Transient
    private List<Image> images;

    @Transient
    private List<String> base64Images;


}
