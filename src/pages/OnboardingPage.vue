<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div>
                <h3>Onboarding</h3>
            </div>
            <div class="text-success" v-if="succesMessage">
                {{ succesMessage }}
            </div>
            <div class="alert alert-danger" v-if="errorMessage">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="onBoardPatient" class="form-group">
                <div>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model.trim="name"
                    />
                </div>
                <div>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model.trim="lastname"
                    />
                </div>
                <div>
                    <label>Ciudad</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model.trim="city"
                    />
                </div>
                <div class="my-3">
                    <button type="submit" class="btn btn-primary">Onboard</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters} from 'vuex';
import axiosInstance from '../services/axiosInstance';
import { GET_USER_ID_GETTER } from '@/store/storeconstants';
import { verifyJWT } from "@/services/jwt";

export default {
    data(){
        return{
            name: '',
            lastname: '',
            city: '',
            succesMessage: '',
            errorMessage: ''
        }
    },
    computed: {
        ...mapGetters('auth', {
            userId: GET_USER_ID_GETTER
        })
    },
    methods: {
        onBoardPatient(){
            let patientData = {
                name: this.name,
                lastname: this.lastname,
                city: this.city
            };
            const user = verifyJWT(localStorage.getItem('token'));
            axiosInstance.put(`/patients/${user.id}`, patientData).then((res) => {
                if (res.status === 200) {
                    this.successMessage = 'Datos guardados';
                    this.$router.push('/questions');
                }
            }).catch((err) => {
                this.errorMessage = err.response.data.errorMessage;
            })
        }
    }
}
</script>