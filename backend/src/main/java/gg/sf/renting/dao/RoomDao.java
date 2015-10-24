package gg.sf.renting.dao;

import gg.sf.renting.entity.Room;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class RoomDao  extends BaseDao<Room>{

    public RoomDao() {
        super(Room.class);
    }

    public List<Room> findByInfoId(String infoId) {
        Query query = getCurrentSession().createQuery("from Room as room where room.infoId = :infoId");
        query.setString("infoId", infoId);
        return query.list();
    }





}
