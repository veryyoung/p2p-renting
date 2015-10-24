package gg.sf.renting.entity;

import gg.sf.renting.enums.UserType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by veryyoung on 2015/3/2.
 */

@Data
@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = {"userName","mobile"}))
public class User {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(length = 32)
    private String id;

    @Column(length = 20)
    private String userName;

    @Column(length = 32)
    private String password;

    private Date createTime;

    @Column(length = 20)
    private String mobile;

    private int age;

    private boolean male;

    private UserType userType;


}
