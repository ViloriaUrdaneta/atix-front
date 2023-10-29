<template>
    <div>
        <h2>Questions Page</h2>
        <table class="table">
            <thead>
            <tr>
                <th>Pregunta</th>
                <th>Respuestas</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="question in questions" :key="question.id">
                <td>
                    <p><strong>{{ question.question }}</strong></p>
                </td>
                <td>
                    <div class="form-check">
                        <input
                            type="radio"
                            :name="'answer_' + question.id"
                            v-model="question.selectedAnswer"
                            :value="1"
                            @change="calculateTotal"
                            class="form-check-input"
                        />
                        <label class="form-check-label">{{ question.answer1 }}</label>
                    </div>
                    <div class="form-check">
                        <input
                            type="radio"
                            :name="'answer_' + question.id"
                            v-model="question.selectedAnswer"
                            :value="2"
                            @change="calculateTotal"
                            class="form-check-input"
                        />
                        <label class="form-check-label">{{ question.answer2 }}</label>
                    </div>
                    <div class="form-check">
                        <input
                            type="radio"
                            :name="'answer_' + question.id"
                            v-model="question.selectedAnswer"
                            :value="3"
                            @change="calculateTotal"
                            class="form-check-input"
                        />
                        <label class="form-check-label">{{ question.answer3 }}</label>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <button @click="sendAnswers" class="btn btn-primary">Mandar preguntas</button>
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
            questions: [],
            totalPoints: 0,
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
        axiosInstance.get('/fiveQuestions').then((response) => {
            this.fotmatQuestions(response.data.body)
        })
    },
    methods: {
        fotmatQuestions(questions){
            for (let key in questions){
                this.questions.push({...questions[key], id: key})
            }
        },
        calculateTotal() {
            let sum = 0;
            this.questions.forEach((question) => {
                sum += question.selectedAnswer || 0;
            });
            this.totalPoints = sum;
        },
        sendAnswers(){
            const user = verifyJWT(localStorage.getItem('token'));
            let dateData = {
                result: this.totalPoints,
                patient: user.id
            };
            axiosInstance.post('/dates', dateData).then((res) => {
                if(res.status === 200){
                    this.successMessage = 'Datos guardados';
                    this.$router.push('/dates');
                }
            }).catch((err) => {
                this.errorMessage = err.response.data.errorMessage;
            })

        }
    }
}
</script>