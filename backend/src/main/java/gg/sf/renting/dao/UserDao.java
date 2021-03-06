package gg.sf.renting.dao;


import gg.sf.renting.entity.User;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;


/**
 * Created by veryyoung on 2015/3/3.
 */

@Repository
public class UserDao extends BaseDao<User> {

    public UserDao() {
        super(User.class);
    }


    public boolean checkUserName(String userName) {
        Query query = getCurrentSession().createQuery("select count(*) from User as user where user.userName = :userName");
        query.setString("userName", userName);
        return (Long) query.uniqueResult() == 0;
    }

    public User findByUserName(String userName) {
        Query query = getCurrentSession().createQuery("from User as user where user.userName = :userName");
        query.setString("userName", userName);
        return (User) query.uniqueResult();
    }

    public User findByMobile(String mobile) {
        Query query = getCurrentSession().createQuery("from User as user where user.mobile = :mobile");
        query.setString("mobile", mobile);
        return (User) query.uniqueResult();
    }




}
