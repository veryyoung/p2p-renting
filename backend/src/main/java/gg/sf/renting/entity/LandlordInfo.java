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
public class LandlordInfo extends Info{

    private String doorNumber;

    private double price;

    private String traffic;

    private String around;

    private List<Room> rooms;


}
