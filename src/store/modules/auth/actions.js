import { LOGIN_ACTION, LOGOUT_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION } from "@/store/storeconstants";
import axios from "axios";
import { verifyJWT } from "@/services/jwt";

export default {

    [LOGOUT_ACTION](context){
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            token: null,
            email: null,
            userId: null,
            role: null
        })
        localStorage.removeItem('token')
    },

    async [LOGIN_ACTION](context, payload){
        let postData = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/login`, postData);
            console.log(process.env.BASE_URL)
            if(response.status === 200){
                const user = verifyJWT(response.data.body);
                context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                    token: response.data.body,
                    email: user.email,
                    userId: user.id,
                    role: user.role
                });
                localStorage.setItem('token', response.data.body);
            }
        } catch (error) {
            let errorMessage = error.response.data.errorMessage;
            throw errorMessage;
        }
    },

    async [SIGNUP_ACTION](context, payload){
        let postData = {
            email: payload.email,
            password: payload.password,
            role: payload.role
        };
        try {
            let response = await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/register`, postData);
            if(response.status === 201){
                const user = verifyJWT(response.data.body);
                context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                    token: response.data.body,
                    email: user.email,
                    userId: user.id,
                    role: user.role
                });
                localStorage.setItem('token', response.data.body);
            }
        } catch (error) {
            let errorMessage = error.response.data.errorMessage;
            throw errorMessage;
        }
    }
}