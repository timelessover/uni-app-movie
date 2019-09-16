import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userLocation: null, // 用户的位置信
		selectCity: null,  // 用户选择城市
	},
	getters:{
		
	},
	mutations: {
		userLocation(state,obj){
			state.userLocation = obj
		},
		selectCity(state,obj){
			state.selectCity = obj
		},
	},
	actions: {
		
	}
});

export default store
