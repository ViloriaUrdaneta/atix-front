<template>
    <div>
        <h2>Administrar Preguntas</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Pregunta</th>
                    <th>Respuesta 1</th>
                    <th>Respuesta 2</th>
                    <th>Respuesta 3</th>
                    <th>Editar/Eliminr</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions" :key="question.id">
                    <td>
                        {{ question.question }}
                    </td>
                    <td>
                        {{ question.answer1 }}
                    </td>
                    <td>
                        {{ question.answer2 }}
                    </td>
                    <td>
                        {{ question.answer3 }}
                    </td>
                    <td>
                        <button @click="editDoctor(doctor)" class="btn btn-primary mx-2">Editar</button>
                        <button @click="deleteDoctor(doctor.id)" class="btn btn-primary mx-2">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="editingQuestion">
            <h3>Editar Pregunta</h3>
            <form @submit.prevent="updateQuestion"  class="form-group">
                <div class="mb-3">
                    <label class="form-label">
                        Pregunta:
                    </label>
                    <input 
                        v-model="editingQuestion.question" 
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Respuesta 1:
                    </label>
                    <input 
                        v-model="editingQuestion.answer1" 
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Respuesta 2:
                    </label>
                    <input 
                        v-model="editingQuestion.answer2" 
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Respuesta 3:
                    </label>
                    <input 
                        v-model="editingQuestion.answer3" 
                        class="form-control"
                        required 
                    />
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <button @click="cancelEditQuestion" class="btn btn-primary mx-3">Cancelar</button>
            </form>
        </div>

        <h3>
            Agregar Pregunta
        </h3>
        <form @submit.prevent="createQuestion()" class="form-group">
            <div class="mb-3">
                <label class="form-label">
                    Pregunta:
                </label>
                <input 
                    v-model="newQuestion.question" 
                    class="form-control"
                    required 
                />
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Respuesta 1:
                </label>
                <input 
                    v-model="newQuestion.answer1" 
                    class="form-control"
                    required 
                />
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Respuesta 2:
                </label>
                <input 
                    v-model="newQuestion.answer2" 
                    class="form-control"
                    required 
                />
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Respuesta 3:
                </label>
                <input 
                    v-model="newQuestion.answer3" 
                    class="form-control"
                    required 
                />
            </div>
            <button type="submit" class="btn btn-primary">Agregar pregunta</button>
        </form>
    </div>
</template>


<script>
import axiosInstance from '../services/axiosInstance';

export default {
    data() {
        return {
            questions: [],
            newQuestion: {
                question: '',
                answer1: '',
                answer2: '',
                answer3: '',
            },
            editingQuestion: null,
        };
    },
    async created() {
        this.loadQuestions();
    },
    methods: {
        async loadQuestions() {
            try {
                const response = await axiosInstance.get('/questions');
                this.questions = response.data.body;
            } catch (error) {
                console.error('Error al cargar la lista de preguntas', error);
            }
        },
        async createQuestion() {
            try {
                await axiosInstance.post('/questions', this.newQuestion);
                this.newQuestion = {
                    question: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                };
            this.loadQuestions();
            } catch (error) {
                console.error('Error al crear una pregunta', error);
            }
        },
        editQuestion(question) {
            this.editingQuestion = { ...question };
        },
        async updateQuestion() {
            try {
                await axiosInstance.put(`/questions/${this.editingQuestion.id}`, this.editingQuestion);
                this.editingQuestion = null;
                this.loadQuestions();
            } catch (error) {
                console.error('Error al actualizar la pregunta', error);
            }
        },
        cancelEditQuestion() {
            this.editingQuestion = null;
        },
        async deleteQuestion(questionId) {
            try {
                await axiosInstance.delete(`/questions/${questionId}`);
                this.loadQuestions();
            } catch (error) {
                console.error('Error al eliminar la pregunta', error);
            }
        },
    },
};
</script>
