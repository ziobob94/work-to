/* eslint-disable no-debugger */
import AboutPageComponent from "../components/views/AboutPageComponent.vue";
import HomePageComponent from "@/components/views/HomePageComponent.vue";
import LifePageComponent from "@/components/views/LifePageComponent.vue";
import SkillsComponent from "@/components/views/SkillsPageComponent.vue";
import LoginComponent from "@/components/views/LoginPageComponent.vue";
import SignupComponent from "@/components/views/SignupPageComponent.vue";
import * as Router from 'vue-router';
import configs from '@/assets/configs.json';
import { instance } from "../main";
import Cookies from 'js-cookie';

    
    const verifyToken = async () => {
        let isValid = false
        try {
            const cookieToken = Cookies.get("auth");
            instance.defaults.headers.common.Authorization = 'Bearer ' + cookieToken;
            isValid = await instance.get("/api/validate-token");
        }
        catch(err){
            isValid = false;
        }
        return isValid;
    }

    const checkAuthentHandler = async (to) => {
        const isAuthenticated = await verifyToken();
        if ( !isAuthenticated && to.name !== 'Login' ) {
                // redirect the user to the login page
                return false
        }
        return true;
        
    }

    const routes = [    
        {
            path: '/',
            redirect: '/home',
            name: 'index',
            children: [
                {
                    name: 'home',
                    hash: '#home',
                    path: '/home',
                    component: HomePageComponent,
                    meta: { transitionName: '' },
                    props: {
                        socialButtons: configs.socialButtons
                    }
                },
                {
                    name: 'about',
                    hash: '#about',
                    path: '/about',
                    component: AboutPageComponent,
                    meta: { transitionName: '' },
                },
                {
                    name: 'life',
                    hash: '#life',
                    path: '/life',
                    component:LifePageComponent,
                    meta: { transitionName: '' },
                },
                {
                    name: 'skills',
                    hash: '#skills',
                    path: '/skills',
                    component:SkillsComponent,
                    meta: { transitionName: '' },
                    props: {
                        logosList: configs.logosList
                    }
                },
            ]
        },
        {
            name: 'login',
            hash: '#login',
            path: '/login',
            component: LoginComponent,
            meta: { transitionName: '' }
        },
        {
            name: 'signup',
            hash: '#signup',
            path: '/signup',
            component: SignupComponent,
            meta: { transitionName: '' }
        }
    ]
    
    routes[0].children.forEach((element) => {
                    // eslint-disable-next-line no-unused-vars
        element.beforeEnter = async (to, from, next) => {

            console.log("CHEKC AUTH to", to);

            console.log("CHEKC AUTH from", from);

            //debugger;
            
            let isAuth = false;

            try{
                isAuth = await checkAuthentHandler(to, next);
            }
            catch(err){
                console.log("CHEKC AUTH from", isAuth);
                isAuth = false;

            }


            //store.mutations

            console.log("CHECK ROUTER", router.store);

            router.store.commit("setAuthenticated", isAuth);


            if(isAuth)  next();
            else {
                window.alert("PLEASE LOG IN TO ACCESS")
                //debugger
                next({name: "login"});
            }


        }
    });
    
    
    export const router = Router.createRouter({
        // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
        history: Router.createWebHistory(),
        routes,
        mode: "hash"
    })
    
    // eslint-disable-next-line no-unused-vars
    /*router.afterEach((to, from) => {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        to.meta.transition = toDepth < fromDepth ? 'moveUp' : 'moveUp'
    })*/
 
    
    export default router;