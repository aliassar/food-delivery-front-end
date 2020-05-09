import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import RestaurantPage from "./pages/RestaurantPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import {
	finalize,
	getCart,
	getFoodParty,
	getOrders,
	getRestaurants, getUser,
	increaseCredit,
	setCart,
	setFoodPartyCart
} from "./api";
import Loading from "./components/Loading";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isLoadingCart: false,
			isLoadingCredit: false,
			userOrders: [],
			currentOrder: [],
			isModalVisible: false,
			foodParty: [],
			restaurants: [],
			user:{}
		}
	}


	render() {
		const {userOrders, restaurants, currentOrder, user, isModalVisible, foodParty, isLoading, isLoadingCart, isLoadingCredit} = this.state;
		const credit = user && user.credit;
		console.log(user)
		return (
			<div className="App">
				{isLoading ? <Loading/> :
					<Router>
						<div>
							<Layout orderCount={currentOrder ? currentOrder.length : 0}
							        showModal={() => this.setState({isModalVisible: true})}>
								<Switch>
									<Route path="/signup">
										<SignUpPage/>
									</Route>
									<Route path="/login">
										<LoginPage/>
									</Route>
									<PrivateRoute path="/profile" title="پروفایل">
										<ProfilePage
											getUser={() => {
												getUser((data) => {
													this.setState({
														user:data
													});
												});
											}}
											userOrders={userOrders}
											isLoadingCredit={isLoadingCredit}
											setCredit={(credit) => {
												this.setState({isLoadingCredit: true});
												increaseCredit(credit, () => {
													getUser((data) => {
														this.setState({
															user:data
														});
													});
													this.setState({isLoadingCredit: false});
												})
											}}
											credit={credit}
											user={user}

										/>
									</PrivateRoute>
									<PrivateRoute path="/restaurant/:restaurantId">
										<RestaurantPage
											isLoadingCart={isLoadingCart}
											restaurants={restaurants}
											userOrders={userOrders}
											currentOrder={currentOrder}
											finalize={() => finalize(currentOrder, () => {
												this.setState({isLoadingCart: true});
												getOrders((data) => {
													this.setState({
														isLoadingCart: false,
														userOrders: data
													});
												});
											})}
											setCurrentOrder={(currentOrder) => {
												this.setState({isLoadingCart: true, isFoodParty: false});
												setCart(currentOrder, () => {
													this.setState({currentOrder})
													this.setState({isLoadingCart: false});
												});
											}}
										/>
									</PrivateRoute>
									<PrivateRoute path="/" title="داشبورد">
										<DashboardPage
											getRestaurant={() => {
												getRestaurants((data) => {
													this.setState({
														isLoading: false,
														restaurants: data
													});
												});
											}}
											getFoodParty={() => {
												getFoodParty((data) => {
													this.setState({
														isLoading: false,
														foodParty: data
													});
												});
											}}
											getUser={() => {
												getUser((data) => {
													this.setState({
														user:data
													});
												});
											}}
											getCart={() => {
												getCart((data) => {
													this.setState({
														currentOrder: data.orders
													});
												});
											}
											}
											setCurrentOrder={(currentOrder) => {
												setFoodPartyCart(currentOrder, () => {
													getCart((data) => {
														this.setState({
															currentOrder: data
														});
													});
												});
											}}
											currentOrder={currentOrder}
											foodParty={foodParty}
											restaurants={restaurants}
										/>
									</PrivateRoute>
								</Switch>
							</Layout>
						</div>
					</Router>}
				{isModalVisible && <>
					<div
						onClick={() => this.setState({isModalVisible: false})}
						className="modal d-flex bg-dark opacity-50"/>
					<div className="modal d-flex" id="myModal" role="dialog">
						<div className="modal-dialog ">
							<div className="modal-content">
								<button
									onClick={() => this.setState({isModalVisible: false})}
									type="button" className="close position-absolute m-2"
									data-dismiss="modal">&times;</button>
								<div className="modal-body m-4 d-flex flex-column align-items-center margin-top">
									<div className=" bg-white d-flex flex-column align-items-center w-100 p-3">
										{currentOrder.length > 0 ? <><h6> سبد خرید</h6>
											<div className="border-dashed w-100 p-4 margin-bottom">
												{currentOrder.map((food) => (<div key={food.name}>
													<div key={food.name} className="d-flex justify-content-between m-1 ">
														<div>{food.name}</div>
														<div className="d-flex flex-column align-items-end">
															<div className="d-flex align-items-center margin-bottom">
																<i className="flaticon-plus green-color icon">
																</i>
																<div className="margin-right">
																	{food.foodCount}
																</div>
																<i className="flaticon-minus red-color icon margin-right">
																</i>
															</div>
															<div className="d-flex">
																<div>
																	{food.price}
																	&nbsp;
																</div>
																<div>
																	تومان
																</div>
															</div>
														</div>
													</div>
													<hr className="m-0 line-2 w-100 margin-bottom"/>
												</div>))}
											</div>
											<div className="d-flex margin-bottom">
												<div>جمع کل :</div>
												&nbsp;
												<div>{currentOrder.length > 0 ? currentOrder.reduce((a, b) => a + (b.price || 0), 0) : 0}</div>
												&nbsp;
												<div>تومان</div>
											</div>
											<button onClick={() => finalize(currentOrder, () => {
												this.setState({isLoadingCart: true});
												getOrders((data) => {
													this.setState({
														isLoadingCart: false,
														userOrders: data
													});
												});
											})} type="button" className="btn btn-info p-1 white-color padding-vertical">
												{isLoadingCart ?
													<>
														<span className="spinner-border spinner-border-sm" role="status"
														      aria-hidden="true"/>
														<span className="sr-only">درحال بارگذاری...</span></>
													: 'تایید نهایی'}
											</button>
										</> : <div className="d-flex    align-items-center">سفارشی موجود نیست</div>}
									</div>
								</div>

							</div>
						</div>
					</div>
				</>}
			</div>
		)
	}
}

