package gg.sf.renting.controller;

import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;
import gg.sf.renting.rest.RestData;
import gg.sf.renting.service.InfoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by veryyoung on 2015/10/24.
 */
@RestController
@RequestMapping("info")
public class InfoController {

    @Autowired
    private InfoService infoService;

    @RequestMapping("publish/renter")
         public RestData publish(RenterInfo renterInfo) {
        RestData restData = new RestData();
        String infoId = infoService.addRenterInfo(renterInfo);
        if(StringUtils.isNoneEmpty(infoId)){
            restData.setSuccess(1);
            restData.setComment("信息发布成功");
        }else {
            restData.setComment("发布失败，请校验数据格式");
        }
        return restData;
    }

    @RequestMapping("publish/landlord")
    public RestData publishLand(LandlordInfo landlordInfo) {
        RestData restData = new RestData();
        String infoId = infoService.addLandInfo(landlordInfo);
        if(StringUtils.isNoneEmpty(infoId)){
            restData.setSuccess(1);
            restData.setComment("信息发布成功");
        }else {
            restData.setComment("发布失败，请校验数据格式");
        }
        return restData;
    }


}
