package gg.sf.renting.dao;

import gg.sf.renting.entity.Image;
import org.springframework.stereotype.Repository;

/**
 * Created by veryyoung on 2015/10/24.
 */
@Repository
public class ImageDao extends BaseDao<Image> {

    public ImageDao(){
        super(Image.class);
    }


}
