package gg.sf.renting.service;

import gg.sf.renting.entity.User;

import java.util.List;

/**
 * Created by veryyoung on 2015/3/3.
 */
public interface UserService {

    boolean addUser(User user);

    List<User> findAll();

    boolean checkUserName(String userName);

    User findByUserName(String userName);
}
