package gg.sf.renting.service;

import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;
import gg.sf.renting.model.Info;

/**
 * Created by veryyoung on 2015/10/24.
 */
public interface InfoService {

    String addLandInfo(LandlordInfo info);

    Info getLandInfo(String id);

    LandlordInfo getLandInfoByUserId(String userId);

    RenterInfo getRentInfoByUserId(String userId);

    Info getRentInfo(String id);

    String addRenterInfo(RenterInfo renterInfo);


}
