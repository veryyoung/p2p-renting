package gg.sf.renting.service.impl;

import gg.sf.renting.dao.LandInfoDao;
import gg.sf.renting.dao.RenterInfoDao;
import gg.sf.renting.dao.RoomDao;
import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.Room;
import gg.sf.renting.model.Info;
import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.InfoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Service
public class InfoServiceImpl extends BaseService implements InfoService{

    @Autowired
    private LandInfoDao landInfoDao;

    @Autowired
    private RenterInfoDao renterInfoDao;

    @Autowired
    private RoomDao roomDao;

    @Override
    public String addLandInfo(LandlordInfo info) {
        String infoId = landInfoDao.create(info);
        if(StringUtils.isNoneEmpty(infoId)){
            for(Room room:info.getRooms()){
                roomDao.create(room);
            }
        }
        return infoId;
    }

    @Override
    public LandlordInfo getLandInfo(String id) {
        LandlordInfo info = landInfoDao.find(id);
        List<Room> rooms = roomDao.findAll() ;
        info.setRooms(rooms);
        return info;
    }

    @Override
    public Info getRentInfo(String id) {
        return renterInfoDao.find(id);
    }
}
