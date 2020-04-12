import axios from 'axios';

const API = axios.create({
	baseURL: `http://localhost:3002`
});
export const getRestaurants = (cb) => {
	API.get(`restaurants/`)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const getFoodParty = (cb) => {
	API.get(`foodParty/`)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const setCart = (cart,cb) => {
	API.post(`cart/`,cart)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success:true}
		})
};
export const finalize = (cart,cb) => {
	API.put(`cart/finalize/`,cart)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success:true}
		})
};
export const getOrders = (cb) => {
	API.get(`orders/`)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const increaseCredit = (credit,cb) => {
	API.post(`cart/`,credit)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success:true}
		})
};
export const getCredit = (cb) => {
	API.get(`profile/`)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const getCart = (cb) => {
	API.get(`cart/`)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return res && res.data
		})
};
export const setFoodPartyCart = (cart,cb) => {
	API.post(`cart/foodParty`,cart)
		.catch(err => console.log(err))
		.then(res => {
			cb && cb(res && res.data);
			return {success:true}
		})
};
