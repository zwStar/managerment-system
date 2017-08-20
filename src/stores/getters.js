/**
 * Created by 郭泽伟 on 2017/7/31.
 */

const getters = {
    token: state => state.user.token,   //token
    rules: state => state.rules.rules,  //规则
    adminItems:state=>state.user.adminItems     //列表

};
export default getters