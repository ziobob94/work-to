<template>
    <div class="auth-from-container">
        
        <v-card
        class="mx-auto"
        max-width="344"
        title="User Registration"
        >
        <v-container>
            <v-text-field
                v-model="signupData.first"
                color="primary"
                label="First name"
                variant="outlined" 
            ></v-text-field>
            
            <v-text-field
                v-model="signupData.last"
                color="primary"
                label="Last name"
                variant="outlined" 
            ></v-text-field>
            
            
            <v-text-field
                v-model="signupData.username"
                color="primary"
                label="Username"
                variant="outlined" 
            ></v-text-field>
            
            <v-text-field
                v-model="signupData.email"
                color="primary"
                label="Email"
                variant="outlined" 
                :rules="[() => validateRule('email')]"
            ></v-text-field>
            
            <v-text-field
                v-model="signupData.password"
                color="primary"
                label="Password"
                variant="outlined" 
                type="password"

            ></v-text-field >
            
            <v-text-field
                v-model="signupData.confirm"
                color="primary"
                label="Confirm your password"
                variant="outlined" 
                type="password"
            ></v-text-field>
            
            <v-checkbox
                v-model="signupData.terms"
                color="secondary"
                label="I agree to site terms and conditions"
            ></v-checkbox>
        </v-container>
        
        <v-divider></v-divider>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn @click="handleSubmit" color="success">
                Complete Registration
                
                <v-icon icon="fa-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

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
                first: "",
                last: "",
                email: "",
                username: "",
                password: "",
                confirm: "",
                terms: ""
            }
        }
    },
    methods:{
        ...mapActions(["handleLoginAPI","handleSignupAPI"]),
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
                const logged = await this.handleSignupAPI(this.signupData);
                // eslint-disable-next-line no-debugger
                //debugger;
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
                
                if(userLogged) this.$router.push({path: "/home"})
                
            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                // debugger;
                this.$swal.fire(swalOpt)
                
            }
        },
        validateRule(ruleID){
            if(ruleID === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.signupData[ruleID])) {
                console.log("Valid email address");
                } else {
                console.log("Invalid email address");
                }
            }
        }
        
    }
}
</script>

<style lang="scss">

</style>