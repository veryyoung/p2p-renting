package gg.sf.renting.service.impl;

import gg.sf.renting.dao.UserDao;
import gg.sf.renting.entity.User;
import gg.sf.renting.service.BaseService;
import gg.sf.renting.service.UserService;
import gg.sf.renting.validator.InvalidException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


/**
 * Created by veryyoung on 2015/3/3.
 */
@Service
public class UserServiceImpl extends BaseService implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public boolean addUser(User user) {

        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        user.setCreateTime(new Date());
        try {
            getValidatorWrapper().tryValidate(user);
            userDao.create(user);
            return true;
        } catch (InvalidException ex) {
            logger.error("Invalid User Object: {}", user.toString(), ex);
            return false;
        }

    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public boolean checkUserName(String userName) {
        if (StringUtils.isEmpty(userName)) {
            return false;
        }
        return userDao.checkUserName(userName);
    }

    @Override
    public User findByUserName(String userName) {
        if (StringUtils.isEmpty(userName)) {
            return null;
        }
        return userDao.findByUserName(userName);
    }
}
