<template>
    <div class="mt-5">
        <h2 class="my-5">
            Dates Page
        </h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Doctor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="date in dates" :key="date.id">
                    <td>
                        {{ date.patient.name }} {{ date.patient.lastname }}
                    </td>
                    <td>
                        Dr. {{ date.doctor.name }} {{ date.doctor.lastname }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters} from 'vuex';
import axiosInstance from '../services/axiosInstance';
import { GET_USER_TOKEN_GETTER } from '@/store/storeconstants';
import { verifyJWT } from "@/services/jwt";

export default {
    data(){
        return{
            dates: [],
            succesMessage: '',
            errorMessage: ''
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN_GETTER
        })
    },
    mounted(){
        const user = verifyJWT(localStorage.getItem('token'));
        axiosInstance.get(`/dates/${user.id}`).then((res) => {
            if(res.status === 201){
                this.successMessage = 'Datos guardados';
                console.log(res.data.body)
                this.fotmatDates(res.data.body)
            }
        }).catch((err) => {
            this.errorMessage = err.response.data.errorMessage;
        })
    },
    methods: {
        fotmatDates(dates){
            for (let key in dates){
                this.dates.push({...dates[key], id: key})
            }
        },
    }
}
</script>