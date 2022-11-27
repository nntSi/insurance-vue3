import router from "@/router";
import axios from "axios";
import { response } from "express";
export const auth = {
  namespaced: true,
  state: () => ({
    loginState: {
      account: [],
      state: false,
      stateFail: false
    },
  }),
  mutations: {
    setAccount (state:any, payload:any) {
      state.loginState.account = payload
    },
    setState (state:any, payload:any) {
      state.loginState.stateFail = payload
    },
  },
  getters: {
    myAccount(state: any) {
      return state.loginState;
    },
  },
  actions: {
    login ({commit, state}:any, payload:any) {
      /* commit('setusername', payload.login_state.username) */
      axios.post("http://localhost:3000/api/svh/login", payload.login_state)
      .then(response => {
        /* console.log(response.data.state) */
        if (response.data.state == true){
          router.push('/home')
          commit('setAccount', response.data.userdata[0])
          commit('setState', response.data.state)
        }else{
          console.log(response.data)
          commit('setState', !response.data.state)
        }
      })
    }
  },
};
