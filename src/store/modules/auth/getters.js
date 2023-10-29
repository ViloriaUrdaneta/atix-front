import { 
    GET_USER_TOKEN_GETTER, 
    GET_USER_ID_GETTER, 
    IS_AUTHENTICATED_GETTER,
    GET_USER_ROLE_GETTER 
} from "@/store/storeconstants";

export default {
    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.token;
    },

    [GET_USER_ID_GETTER]: (state) => {
        return state.userId;
    },

    [GET_USER_ROLE_GETTER]: (state) => {
        return state.role;
    },

    [IS_AUTHENTICATED_GETTER](state){
        return state.token
    }
}