import { SET_USER_TOKEN_DATA_MUTATION } from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload){
        state.email = payload.email;
        state.token = payload.token;
        state.role = payload.role;
        state.userId = payload.userId
    }
}