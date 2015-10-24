package gg.sf.renting.service;

import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.model.Info;

/**
 * Created by veryyoung on 2015/10/24.
 */
public interface InfoService {

    String addLandInfo(LandlordInfo info);

    Info getLandInfo(String id);

    Info getRentInfo(String id);



}
