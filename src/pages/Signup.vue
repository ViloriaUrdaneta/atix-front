<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="row mt-5">
        <div class="col-md-6 offset-md-3 ">
            <div class="my-5">
                <h3>Registrarse</h3>
            </div>
            <div class="alert alert-danger" v-if="error">
                {{ error }}
            </div>
            <form class="form-group" @submit.prevent="onSignup()">
                <div>
                    <label>Email</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model.trim="email"
                    />
                    <div class="error" v-if="errors.email">
                        {{ errors.email }}
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        v-model.trim="password"
                    />
                    <div class="error" v-if="errors.password">
                        {{ errors.password }}
                    </div>
                </div>
                <label>Rol:</label>
                <div>
                    
                    <input 
                        type="radio" 
                        v-model="selectedRole" 
                        value="patient"
                    />
                    <span> Paciente</span>
                </div>
                <div>
                    <input 
                        type="radio" 
                        v-model="selectedRole" 
                        value="admin"
                    />
                    <span> Administrador</span>
                </div>
                <div class="my-3">
                    <button type="submit" class="btn btn-primary" :disabled="!selectedRole">Signup</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import SignupValidations from '@/services/SignupValidations';
import { mapActions } from 'vuex';
import { SIGNUP_ACTION } from '../store/storeconstants';

export default {
    data(){
        return {
            email: '',
            password: '',
            selectedRole: '',
            errors: [],
            error: ''
        }
    },
    methods: {
        ...mapActions('auth', {
            signup: SIGNUP_ACTION
        }),
        async onSignup(){
            let validations = new SignupValidations(this.email, this.password);

            this.errors =  validations.checkValidations();
            if ('email' in this.errors || 'password' in this.errors){
                return false
            }
            try {
                await this.signup({email: this.email, password: this.password, role: this.selectedRole});
                this.$router.push('/onboard');
            } catch (error) {
                this.error = error;
            }
        }
    }
}
</script>