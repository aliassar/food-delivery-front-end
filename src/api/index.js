import axios from 'axios';


const API = axios.create({
	baseURL: `http://localhost:8080/Loghme_war_exploded/`,
});
export const login = (data, cb) => {
	API.post(`login/`, data)
		.catch(err => console.log(err))
		.then(res => {
			cb && res && cb(res.status, res.data);
			return res && res.data
		})
};
export const signUp = (data, cb) => {
	API.put(`register/`, data)
		.catch(err => console.log(err))
		.then(res => {
			cb && res && cb(res.status, res.data);
			return res && res.data
		})
};
export const googleLogin = (data, cb) => {
	console.log(data)
	API.post(`googleAuth/`, data)
		.catch(err => console.log(err))
		.then(res => {
			cb && res && cb(res.status, res.data);
			return res && res.data
		})
};
export const getRestaurants = (cb) => {
	API.get(`restaurants/`, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const getFoodParty = (cb) => {
	API.get(`foodparty/`, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const setCart = (cart, cb) => {
	API.post(`cart/`, cart, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success: true}
		})
};
export const finalize = (cart, cb) => {
	API.put(`cart/finalize/`, cart, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success: true}
		})
};
export const getOrders = (cb) => {
	API.get(`orders/`, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const increaseCredit = (credit, cb) => {
	API.post(`cart/`, credit, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success: true}
		})
};
export const getUser = (cb) => {
	API.get(`user/`, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const getCart = (cb) => {
	API.get(`cart/`, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const setFoodPartyCart = (cart, cb) => {
	API.post(`cart/foodparty`, cart, {
		headers: {'token': localStorage.getItem('token').toString()}
	})
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success: true}
		})
};
