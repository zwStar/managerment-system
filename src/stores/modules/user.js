/**
 * Created by 郭泽伟 on 2017/7/31.
 */
import Cookies from 'js-cookie';

const user = {
    state:{
        token: Cookies.get('Admin-Token')
    },
    mutations:{

    },
    actions:{
        "LoginSuccess":({commit},data)=>{
            Cookies.set('Admin-Token', data.token);
        },
        "Logout":({commit})=>{
            Cookies.remove("Admin-Token");
        }
    }
}
export default user;