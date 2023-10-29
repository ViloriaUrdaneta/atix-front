<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold mx-5" href="#">MediApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item fw-bolder mx-3" v-if="!token && !isAuthenticated">
                        <router-link class="nav-link" to="/login">Iniciar sesión</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="!token && !isAuthenticated">
                        <router-link class="nav-link" to="/signup">Registrarse</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/onboard">Datos personales</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/questions">Preguntas</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/questionsEdit">Listado de preguntas</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/doctors">Listado de doctores</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'patient' || userRole === 'patient')">
                        <router-link class="nav-link" to="/dates">Citas</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="(token || isAuthenticated) && (role === 'admin' || userRole === 'admin')">
                        <router-link class="nav-link" to="/datesEdit">Citas</router-link>
                    </li>
                    <li class="nav-item fw-bolder mx-3" v-if="token || isAuthenticated">
                        <a href="#" class="nav-link" @click.prevent="onLogout">Cerrar sesión</a>
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