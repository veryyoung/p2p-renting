package gg.sf.renting.dao;

import gg.sf.renting.entity.RenterInfo;
import org.springframework.stereotype.Repository;



/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class RenterInfoDao extends BaseDao<RenterInfo>{

    public RenterInfoDao() {
        super(RenterInfo.class);
    }

}
