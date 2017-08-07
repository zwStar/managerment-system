/**
 * Created by 郭泽伟 on 2017/7/31.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import user from './modules/user'
import rule from './modules/rule'
Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        user,
        rule
    },
    getters
});

export default store
