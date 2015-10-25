package gg.sf.renting.controller;

import gg.sf.renting.entity.LandlordInfo;
import gg.sf.renting.entity.RenterInfo;
import gg.sf.renting.rest.RestData;
import gg.sf.renting.service.InfoService;
import gg.sf.renting.service.TokenService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
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

    @Autowired
    private TokenService tokenService;

    @RequestMapping("publish/renter")
    public RestData publish(RenterInfo renterInfo, @RequestHeader(value = "token", required = false) String token) {
        RestData restData = new RestData();
        if (tokenService.checkToken(token)) {
            String infoId = infoService.addRenterInfo(renterInfo);
            if (StringUtils.isNoneEmpty(infoId)) {
                restData.setSuccess(1);
                restData.setComment("信息发布成功");
            } else {
                restData.setComment("发布失败，请校验数据格式");
            }
        } else {
            restData.setComment("token验证失败");
        }
        return restData;
    }

    @RequestMapping("publish/landlord")
    public RestData publishLand(LandlordInfo landlordInfo, @RequestHeader(value = "token", required = false) String token) {
        RestData restData = new RestData();
        if (tokenService.checkToken(token)) {
            String infoId = infoService.addLandInfo(landlordInfo);
            if (StringUtils.isNoneEmpty(infoId)) {
                restData.setSuccess(1);
                restData.setComment("信息发布成功");
            } else {
                restData.setComment("发布失败，请校验数据格式");
            }
        } else {
            restData.setComment("token验证失败");
        }
        return restData;
    }


}
