package gg.sf.renting.service.impl;

import gg.sf.renting.dao.ImageDao;
import gg.sf.renting.dao.LandInfoDao;
import gg.sf.renting.dao.RenterInfoDao;
import gg.sf.renting.entity.Image;
import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;
import gg.sf.renting.model.Info;
import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.InfoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Service
public class InfoServiceImpl extends BaseService implements InfoService {

    @Autowired
    private LandInfoDao landInfoDao;

    @Autowired
    private RenterInfoDao renterInfoDao;

    @Autowired
    private ImageDao imageDao;


    @Override
    public String addLandInfo(LandlordInfo info) {
        String infoId = landInfoDao.create(info);
        List<String> base64Images = info.getBase64Images();
        if(!CollectionUtils.isEmpty(base64Images)){
            imageDao.create(new Image(infoId));
        }
        return infoId;
    }

    @Override
    public LandlordInfo getLandInfo(String id) {
        LandlordInfo landlordInfo = landInfoDao.find(id);
        landlordInfo.setImages(imageDao.findByInfoId(id));
        return landlordInfo;
    }

    @Override
    public Info getRentInfo(String id) {
        return renterInfoDao.find(id);
    }

    @Override
    public String addRenterInfo(RenterInfo renterInfo) {
        return renterInfoDao.create(renterInfo);
    }
}
