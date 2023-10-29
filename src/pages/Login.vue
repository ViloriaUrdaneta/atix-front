<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="row mt-5">
        <div class="col-md-6 offset-md-3">
            <div class="my-5">
                <h3>Iniciar sesión</h3>
            </div>
            <div class="alert alert-danger" v-if="error">
                {{ error }}
            </div>
            <form @submit.prevent="onLogin()" class="form-group">
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
                <div class="my-3">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
            <router-link to="/signup">
                <button class="btn btn-secondary">Registrarse</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import SignupValidations from '@/services/SignupValidations';
import { mapActions } from 'vuex';
import { LOGIN_ACTION } from '@/store/storeconstants';

export default {
    data(){
        return {
            email: '',
            password: '',
            errors: [],
            error: ''
        }
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        async onLogin(){
            let validations = new SignupValidations(this.email, this.password);
            this.errors =  validations.checkValidations();
            if ('email' in this.errors || 'password' in this.errors){
                return false
            }
            try {
                await this.login({email: this.email, password: this.password});
                this.$router.push('/onboard');
            } catch (error) {
                this.error = error;
            }
        }
    }
}
</script>