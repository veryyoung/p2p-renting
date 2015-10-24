package gg.sf.renting.dao;

import gg.sf.renting.entity.Image;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class ImageDao extends BaseDao<Image> {

    public ImageDao() {
        super(Image.class);
    }

    public List<Image> findByInfoId(String infoId) {
        Query query = getCurrentSession().createQuery("from Image as image where image.infoId = :infoId");
        query.setString("infoId", infoId);
        return query.list();
    }


}
