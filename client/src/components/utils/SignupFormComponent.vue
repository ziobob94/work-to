<template>
    <div class="auth-from-container">
        <h1>Signup Form</h1>
        <form class="auth-from" accept-charset="UTF-8" @submit="handleSubmit($event)">
    
            <div class="form-fields">
                <label for="email">Email</label>
                <input type="email" 
                        id="email" 
                        name="email" 
                        v-model="signupData.email" 
                        placeholder="Insert your email" 
                        required
                />
            </div>
            
            
            <div class="form-fields">
                <label for="username">Username</label>
                <input type="username" 
                        id="username" 
                        name="username" 
                        v-model="signupData.username" 
                        placeholder="Insert your username" 
                        required
                />
            </div>

            <div class="form-fields">
                <label for="password">Password</label>
                <input type="password" 
                        id="password" 
                        name="password" 
                        v-model="signupData.password" 
                        placeholder="Insert your password"  
                        required
                />
            </div>

            <div class="form-fields">
                <label for="confirm-password">Confirm Password</label>
                <input type="confirm-password" 
                    id="confirm-password" 
                    name="confirm-password" 
                    v-model="signupData.confirm" 
                    placeholder="Confirm your password"  
                    required
                />
            </div>
    
            <button type="submit">Signup</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
//import axios from "axios";
export default {
    name:'SignupFormComponent',
    data(){
        return{
            signupData: {
                email: "",
                username: "",
                password: "",
                confirm: ""
            }
        }
    },
    methods:{
        ...mapActions(["handleLoginAPI"]),
        async handleSubmit(ev){
            const swalOpt = {
                            title: "Fail",
                            text: "Ops some error occurred, please try again",
                            icon: "error",
                            showConfirtButton: true,
                            confirmButtonText: "Ok"
            }
            try{ 
                ev.preventDefault();
                // eslint-disable-next-line no-debugger
                // debugger;

                // console.log("[SignupFormComponent] DATA: ", this.signupData);
                const logged = await this.$http.post("/api/register",this.signupData );
                // eslint-disable-next-line no-debugger
                //debugger;
                this.logged = !!logged;
                // console.log("[SignupFormComponent] LOGGED: ", logged);
                const userInserted = (logged?.data);
                let userLogged = false;
                if(userInserted){
                        swalOpt.title = (userInserted.result) ? "User Created" : "Creation Fails";
                        swalOpt.text = userInserted.message;
                        swalOpt.icon = (userInserted.result) ? "success" : "error";
                        userLogged = await this.handleLoginAPI({email: this.signupData.email, password: this.signupData.password});
                        swalOpt.text = userLogged.message;
                       
                }

                await this.$swal.fire(swalOpt);

                if(userLogged.result) this.$router.push({path: "/home"})

            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                // debugger;
                this.$swal.fire(swalOpt)

            }
        }
        
    }
}
</script>

<style lang="scss">

</style>