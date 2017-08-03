import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './routers'
import store from './stores'
Vue.use(Element);

router.beforeEach((to,from,next)=>{
  /*  if(store.getters.token){
       next();
    }else{
        if(to.path === '/login'){
            next();
        }else{
            next({path:"/login"});
        }
    }*/
    next();
})


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
