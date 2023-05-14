<!-- eslint-disable no-debugger -->
<template>
    <div class="auth-from-container">
        <h1>Login Form</h1>
        <form class="auth-from" accept-charset="UTF-8" @submit="handleSubmit($event)">
            
            <div class="form-fields">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" v-model="loginData.email" placeholder="Insert your email" required>
            </div>
            
            <div class="form-fields">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" v-model="loginData.password" placeholder="Insert your password"  required>
            </div>
            
            <button type="submit">Login</button>
        </form>
        <button @click="trySub">TRY</button>

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
                password: ""
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
                
                const logged = await this.handleLoginAPI( {email: this.loginData.email, password: this.loginData.password} );

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