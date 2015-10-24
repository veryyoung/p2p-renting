package gg.sf.renting.controller;

import gg.sf.renting.entity.User;
import gg.sf.renting.rest.RestData;
import gg.sf.renting.service.TokenService;
import gg.sf.renting.service.UserService;
import gg.sf.renting.utils.MobileUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by veryyoung on 2015/3/2.
 */
@RestController
@RequestMapping("")
public class HomeController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @RequestMapping("/register")
    public RestData register(User user) {
        RestData restData = new RestData();
        userService.addUser(user);
        restData.setSuccess(1);
        restData.setComment("注册成功");
        Map<String, Object> data = new HashMap<>();
        data.put("token", tokenService.storeToken(user.getId()));
        data.put("useId", user.getId());
        data.put("useName", user.getUserName());
        data.put("userType", user.getUserType());
        restData.setData(data);
        return restData;
    }

    @RequestMapping("/checkUserName")
    public RestData checkUserName(String userName) {
        RestData restData = new RestData();
        if (userService.checkUserName(userName)) {
            restData.setComment("该用户名已存在");
        } else {
            restData.setSuccess(1);
        }
        return restData;
    }

    @RequestMapping("/login")
    public RestData login(String userName, String password) {
        RestData restData = new RestData();
        if (StringUtils.isEmpty(userName) || StringUtils.isEmpty(password)) {
            restData.setComment("账户名或密码不能为空");
            return restData;
        }
        User user;
        if (MobileUtils.isMobile(userName)) {
            user = userService.findByMobile(userName);
        } else {
            user = userService.findByUserName(userName);
        }
        if (null == user || !user.getPassword().equals(DigestUtils.md5Hex(password))) {
            restData.setComment("账户名或密码错误");
        } else {
            restData.setComment("登陆成功");
            restData.setSuccess(1);
            Map<String, Object> data = new HashMap<>();
            data.put("token", tokenService.storeToken(user.getId()));
            data.put("useId", user.getId());
            data.put("useName", user.getUserName());
            data.put("userType", user.getUserType());
            restData.setData(data);
        }
        return restData;
    }


}
