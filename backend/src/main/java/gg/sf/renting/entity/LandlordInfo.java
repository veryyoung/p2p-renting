package gg.sf.renting.entity;

import gg.sf.renting.model.Info;
import lombok.Data;

import javax.persistence.Entity;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Data
@Entity
public class LandlordInfo extends Info{

    private String doorNumber;

    private double price;
}
