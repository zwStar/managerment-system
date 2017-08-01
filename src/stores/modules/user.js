/**
 * Created by 郭泽伟 on 2017/7/31.
 */
import Cookies from 'js-cookie';

const user = {
    state:{
        token: Cookies.get('Admin-Token')
    },
    mutations:{
        SET_TOKEN:(state,token)=>{
            state.token = token;
        }
    },
    actions:{
        "LoginSuccess":({commit},data)=>{
            commit("SET_TOKEN",data.token);
            Cookies.set('Admin-Token', data.token);

        },
        "Logout":({commit})=>{
            Cookies.remove("Admin-Token");
            localStorage.clear("name");
        },
        "ChangeInfo":({commit})=>{
            Cookies.remove("Admin-Token");
        }
    }
}
export default user;