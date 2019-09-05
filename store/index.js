import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userLocation: null, //用户的位置信息
		selectCity: null 
	},
	getters:{
		
	},
	mutations: {
		userLocation(state,obj){
			state.userLocation = obj
		},
		selectCity(state,obj){
			state.selectCity = obj
		}
	},
	actions: {
		// getLocation(context){
		// 	context.commit('')
		// }
	}
});

export default store
