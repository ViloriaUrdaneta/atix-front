<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="!token && !isAuthenticated">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!token && !isAuthenticated">
                        <router-link class="nav-link" to="/signup">Signup</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/onboard">Onboarding</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/questions">Questions</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/questionsEdit">Edit questions</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/doctors">Doctors</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/dates">Dates</router-link>
                    </li>
                    <li class="nav-item" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/datesEdit">Dates</router-link>
                    </li>
                    <li class="nav-item" v-if="token || isAuthenticated">
                        <a href="#" class="nav-link" @click.prevent="onLogout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { IS_AUTHENTICATED_GETTER, GET_USER_ROLE_GETTER } from '@/store/storeconstants';
import { mapGetters, mapActions } from 'vuex';
import { LOGOUT_ACTION } from '@/store/storeconstants';
import { verifyJWT } from "@/services/jwt";

export default {
    computed: {
        ...mapGetters('auth',{
            isAuthenticated: IS_AUTHENTICATED_GETTER,
            userRole: GET_USER_ROLE_GETTER
        }),
    },
    methods: {
        ...mapActions('auth',{
            logout: LOGOUT_ACTION
        }),
        onLogout(){
            this.logout();
            localStorage.removeItem('token');
            this.$router.replace('/login')
        },
    },
    data(){
        return {
            token: localStorage.getItem('token'),
            role: ''
        }
    },
    mounted(){
        const isToken = localStorage.getItem('token');
        let user;
        if(isToken){
            user = verifyJWT(isToken)
            this.role = user.role
        }
        this.token = isToken;
    },
}
</script>