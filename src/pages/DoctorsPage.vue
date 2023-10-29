<template>
    <div class="mt-5">
        <h2 class="my-5">
            Administrar Doctores
        </h2>
        <h3 class="my-5">
            Lista de Doctores
        </h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Especialidad</th>
                    <th>Editar/Eliminr</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                    <td>
                        Dr. {{ doctor.name }} {{ doctor.lastname }}
                    </td>
                    <td>
                        {{ doctor.rank }}
                    </td>
                    <td>
                        <button @click="editDoctor(doctor)" class="btn btn-primary mx-2">Editar</button>
                        <button @click="deleteDoctor(doctor.id)" class="btn btn-primary mx-2">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="editingDoctor">
            <h3 class="my-5">Editar Doctor</h3>
            <form @submit.prevent="updateDoctor()" class="form-group">
                <div class="mb-3">
                    <label class="form-label">
                        Nombre:
                    </label>
                    <input 
                        v-model="editingDoctor.name" 
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Apellido:
                    </label>
                    <input 
                        v-model="editingDoctor.lastname" 
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        Especialidad:
                    </label>
                    <select v-model="editingDoctor.rank" class="form-select">
                        <option value="Médico pasante">Médico pasante</option>
                        <option value="Médico residente">Médico residente</option>
                        <option value="Médico adscrito">Médico adscrito</option>
                        <option value="Jefe de Servicio">Jefe de Servicio</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <button @click="cancelEditDoctor" class="btn btn-primary mx-3">Cancelar</button>
            </form>
        </div>
        <h3 class="my-5">
            Agregar Doctor
        </h3>
        <form @submit.prevent="createDoctor()" class="form-group">
            <div class="mb-3">
                <label class="form-label">
                    Nombre:
                </label>
                <input 
                    v-model="newDoctor.name" 
                    class="form-control"
                    required 
                />
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Apellido:
                </label>
                <input 
                    v-model="newDoctor.lastname" 
                    class="form-control"
                    required 
                />
            </div>
            <div class="mb-3">
                <label class="form-label">
                    Especialidad:
                </label>
                <select v-model="newDoctor.rank" class="form-select">
                    <option value="Médico pasante">Médico pasante</option>
                    <option value="Médico residente">Médico residente</option>
                    <option value="Médico adscrito">Médico adscrito</option>
                    <option value="Jefe de Servicio">Jefe de Servicio</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Agregar Doctor</button>
        </form>
    </div>
</template>
    
<script>
import axiosInstance from '../services/axiosInstance';

export default {
    data() {
        return {
            doctors: [],
            newDoctor: {
                name: '',
                lastname: '',
                rank: 'Médico pasante', 
            },
            editingDoctor: null,
        };
    },
    async created() {
        this.loadDoctors();
    },
    methods: {
        async loadDoctors() {
            try {
                const response = await axiosInstance.get('/doctors');
                this.doctors = response.data.body;
            } catch (error) {
                console.error('Error al cargar la lista de doctores', error);
            }
        },
        async createDoctor() {
            try {
                await axiosInstance.post('/doctors', this.newDoctor);
                this.newDoctor = { name: '', lastname: '', rank: 'Médico pasante' };
                this.loadDoctors();
            } catch (error) {
                console.error('Error al crear un doctor', error);
            }
        },
        editDoctor(doctor) {
            this.editingDoctor = { ...doctor };
        },
        async updateDoctor() {
            try {
                await axiosInstance.put(`/doctors/${this.editingDoctor.id}`, this.editingDoctor);
                this.editingDoctor = null;
                this.loadDoctors();
            } catch (error) {
                console.error('Error al actualizar el doctor', error);
            }
        },
        cancelEditDoctor() {
            this.editingDoctor = null;
        },
        async deleteDoctor(doctorId) {
            try {
                await axiosInstance.delete(`/doctors/${doctorId}`);
                this.loadDoctors();
            } catch (error) {
                console.error('Error al eliminar el doctor', error);
            }
        },
    },
};
</script>