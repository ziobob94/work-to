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
            :rules="[(v => v.length > 0)]"
            ></v-text-field>
            
            <v-text-field
                color="primary"
                label="Password"
                variant="outlined" 
                @click:append-inner="show = !show"
                hint='Insert your password'
                :append-inner-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                :rules="[(v => v.length > 0)]"
                :type="show ? 'text' : 'password'"
                v-model="loginData.password"

            >
        </v-text-field>
            
            <v-checkbox
                v-model="loginData.remember"
                color="secondary"
                label="Remeber Me"
            ></v-checkbox>

        </v-container>
        
        <v-divider></v-divider>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn @click="handleSubmit" color="success">
                Login
                <v-icon icon="fa-chevron-right" end></v-icon>
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
            logged: false,
            show: false
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
                                
                // // console.log("[LoginFormComponent] LOGGED: ", logged);
                // eslint-disable-next-line no-debugger
                // debugger;
                
                if(logged.result){
                    swalOpt.title = (logged.result) ? "User Logged" : "Login Fails";
                    swalOpt.text = logged.message;
                    swalOpt.icon = (logged.result) ? "success" : "error";
                }

                await this.$swal.fire(swalOpt);


                if(logged.result) {
                    this.$router.push({ name: "home" });
                }

                return logged.data;
                
            
            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                //debugger;
                this.$swal.fire(swalOpt)
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>