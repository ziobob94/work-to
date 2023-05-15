<!-- eslint-disable no-debugger -->
<template>
    <div class="auth-from-container">

    <v-card
        class="mx-auto"
        max-width="344"
        min-width="300"
        title="User Login"
        >
        <v-container>
           
            <v-text-field
            v-model="loginData.email"
            label="Email"
            type="email"
            color="primary"
            variant="outlined" 
            required
            ></v-text-field>
            
            <v-text-field
            v-model="loginData.password" 
            label="Password"
            type="password"
            color="primary"
            variant="outlined" 
            required
            ></v-text-field>
            
            <v-checkbox
                v-model="terms"
                color="secondary"
                label="Remeber Me"
            ></v-checkbox>

        </v-container>
        
        <v-divider></v-divider>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn @click="handleSubmit" color="success">
                Login
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
    </div>
</template>

<script>
//import Cookies from 'js-cookie';
import { mapActions, mapMutations } from 'vuex';

export default {
    name:'LoginFormComponent',
    data(){
        return{
            loginData: {
                email: "",
                password: "",
                remember: ""
            },
            logged: false
        }
    },
    methods:{
        ...mapMutations(["setAuthenticated"]),
        ...mapActions(["handleLoginAPI"]),
        async handleSubmit(ev){
            const swalOpt = {
                title: "Fail",
                text: "Wrong email or password",
                icon: "error",
                showConfirtButton: true,
                confirmButtonText: "Ok"
            }
            try{ 
                ev.preventDefault();
                
                // // console.log("[LoginFormComponent] DATA: ", this.loginData, `\n THIS:`, this.$);
                
                const logged = await this.handleLoginAPI( this.loginData );
                
                this.logged = !!logged;
                
                // // console.log("[LoginFormComponent] LOGGED: ", logged);
                
                const loggedUser = (logged?.data);
                
                if(loggedUser){
                    swalOpt.title = (loggedUser.result) ? "User Logged" : "Login Fails";
                    swalOpt.text = loggedUser.message;
                    swalOpt.icon = (loggedUser.result) ? "success" : "error";
                    
                    /*                     if(loggedUser.result){
                        Cookies.set("auth", loggedUser.data, {expires: 1 });
                        this.$http.defaults.headers.common.Authorization = 'Bearer ' + loggedUser.data // Replace with your authorization token
                        this.setAuthenticated(true);
                    } */
                    
                }
                await this.$swal.fire(swalOpt);
                
                // eslint-disable-next-line no-debugger
                // debugger;
                if(loggedUser.data) this.$router.push({ path: "/home" });
                
            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                //debugger;
                this.$swal.fire(swalOpt)
                
            }
        },
        async trySub(){
            try{ 
                // eslint-disable-next-line no-debugger
                // debugger;
                
                // console.log("[LoginFormComponent] DATA: ", this.loginData);
                await this.$http.get("/api/profile-data");
                // console.log("[LoginFormComponent] DATA: ", logged);
            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                //debugger;
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>