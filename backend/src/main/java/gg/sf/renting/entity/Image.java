package gg.sf.renting.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(length = 32)
    private String id;

    private String infoId;

    public Image(String infoId) {
        this.infoId = infoId;
    }

}
