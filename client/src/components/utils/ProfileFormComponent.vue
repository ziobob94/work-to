<template>
    <div class="w-100 h-100 d-flex ">
         
        <v-card
        class="ma-auto flex-1"
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
            hint="Insert a valid email address"
            :rules="[rulesEmail.validate]"
            class="input-group--focused"
            
            ></v-text-field>
            
            <v-text-field
            color="primary"
            label="Password"
            variant="outlined" 
            @click:append-inner="showP = !showP"
            hint='Min 8, 1 upper, 1 lower, 1 number, 1 symbol characters'
            :append-inner-icon="showP ? 'fa-eye' : 'fa-eye-slash'"
            :rules="[rulesPass.required, rulesPass.min, rulesPass.validChars]"
            :type="showP ? 'text' : 'password'"
            v-model="signupData.password"
            
            >
            
        </v-text-field >
        
        <v-text-field
        color="primary"
        label="Confirm"
        variant="outlined" 
        @click:append-inner="showC = !showC"
        hint="The passwords must be equal"
        :append-inner-icon="showC ? 'fa-eye' : 'fa-eye-slash'"
        :rules="[rulesConfirm.validate]"
        :type="showC ? 'text' : 'password'"
        v-model="signupData.confirm"
        
        >
        
    </v-text-field >
    
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
    name:'ProfileFormComponent',
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
            },
            showP: false,
            showC: false,
            rulesPass: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8, 1 upper, 1 lower, 1 number, 1 symbol characters',
                validChars:  v => this.validatePassword(v) || 'Min 8, 1 upper, 1 lower, 1 number, 1 symbol characters',
            },
            rulesEmail:{
                validate: val => this.validateEmail(val) || 'Invaild email address'
            },
            rulesConfirm: {
                validate: val => val === this.signupData.password || 'Passwords doesn\'t match'
            },
        }
    },
    mounted() {
    },
    methods:{
		...mapActions({
			handleUpdateProfileAPI: 'user/handleUpdateProfileAPI'
		}),
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
                const signed = await this.handleUpdateProfileAPI(this.signupData);
                // eslint-disable-next-line no-debugger
                debugger;
                console.log("[SignupFormComponent] SIGNED UP: ", signed);
                
                let userLogged = null;
                if(signed.result){
                    swalOpt.title = (signed.result) ? "User Created" : "Creation Fails";
                    swalOpt.text = signed.message;
                    swalOpt.icon = (signed.result) ? "success" : "error";
                    userLogged = await this.handleLoginAPI({email: this.signupData.email, password: this.signupData.password});
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
        validatePassword(value){
            console.log("VALIDATE PASSWORD: ", value)
            try{            
                const lengthRegex = /^.{8,}$/;
                const uppercaseRegex = /^(?=.*[A-Z])/;
                const lowercaseRegex = /^(?=.*[a-z])/;
                const symbolRegex = /^(?=.*[!@#$%^&*])/;
                const numberRegex = /^(?=.*\d)/;
            
                // Check each rule using the test method
                const isLengthValid = lengthRegex.test(value);
                const hasUppercase = uppercaseRegex.test(value);
                const hasLowercase = lowercaseRegex.test(value);
                const hasSymbol = symbolRegex.test(value);
                const hasNumber = numberRegex.test(value);
            
            // Return true if all rules pass, false otherwise
            return (
                isLengthValid && hasUppercase && hasLowercase && hasSymbol && hasNumber
            );
        }
        catch(err){
            console.error("Invalid password: ERR -> ", err);
            console.error(err)
        }
		},
		validateEmail(email){

			if(!email) {
				console.warn("CAN'T VALIDATE EMAIL: ", email);
				return "Insert email address";
			}
			console.log("VALIDATE EMAIL: ", email);
			try{

				// eslint-disable-next-line no-useless-escape
				const emailRegex = /^[\w\.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
				const test = emailRegex.test(email)
				// eslint-disable-next-line no-debugger
				// debugger
				if (test) {
					return true;
				} 
				else {
					const msg = "Invalid email address " + email;
					console.log(msg);
					return msg;
				}
			}
			catch(err) {
				console.error("Invalid email address: ERR -> ", err);
				const msg = "Error, contact the support please";
				console.log(msg);
				return msg;
			}
		}
		
	}
}
</script>

<style lang="scss">

</style>