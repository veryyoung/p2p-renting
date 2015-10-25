package gg.sf.renting.service.impl;

import gg.sf.renting.dao.LandInfoDao;
import gg.sf.renting.dao.RenterInfoDao;
import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;
import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.ReferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/25.
 */
@Service
public class ReferServiceImpl extends BaseService implements ReferService {

    @Autowired
    private LandInfoDao landInfoDao;

    @Autowired
    private RenterInfoDao renterInfoDao;


    @Override
    public List<LandlordInfo> referToLand(LandlordInfo landlordInfo) {
        return null;
    }

    @Override
    public List<RenterInfo> referToRenter(RenterInfo renterInfo) {
        return null;
    }
}
