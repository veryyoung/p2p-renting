package gg.sf.renting.service;

import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/25.
 */
public interface ReferService {

    List<LandlordInfo> referToLand(LandlordInfo landlordInfo);

    List<RenterInfo> referToRenter(RenterInfo renterInfo);
}
