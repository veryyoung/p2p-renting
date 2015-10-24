package gg.sf.renting.controller;

import gg.sf.renting.entity.User;
import gg.sf.renting.rest.RestData;
import gg.sf.renting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by veryyoung on 2015/3/2.
 */
@RestController
@RequestMapping("")
public class HomeController extends BaseController {

    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    public RestData register(User user) {
        RestData restData = new RestData();
        userService.addUser(user);
        restData.setSuccess(1);
        restData.setComment("注册成功");
        return  restData;
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

}
