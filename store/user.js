export const state = () => ({
    user_info: {
        user_name: null,
        user_pic: null,
        user_email: null
    }
})

export const mutations = {
    Set_User_Info: (state, data) => {
        state.user_info.user_name = data.name;
        state.user_info.user_pic = data.picture;
        state.user_info.user_email = data.email;
    }
}

export const actions = {
    Set_Line_User_Info({commit}, data){

        // you can add some data processing here

        commit('Set_User_Info', data);
    }
}