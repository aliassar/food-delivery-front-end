import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

class RestaurantPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			isErrorModalVisible: false,
			foodCount: 1
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.foodCount < 1) {
			this.setState({foodCount: prevState.foodCount})
		}
	}

	selectedFood = {};

	render() {
		const restaurant = this.props.restaurants.find((restaurant) => restaurant.id === this.props.location.pathname.substr(12));
		const {setCurrentOrder, currentOrder, finalize, isLoadingCart} = this.props;
		const {isModalVisible, isErrorModalVisible, foodCount} = this.state;
		return (
			<div>
				{restaurant ? <main className="background">
						<div className="red height-30"/>
						<div className="d-flex flex-row justify-content-center align-items-center ">
							<div className="d-flex flex-column justify-content-center align-items-center ">
								<img className="restaurant-icon" alt="restaurant icon" src={restaurant.logo}/>
								<h2 className="margin-top">{restaurant.name}</h2>
							</div>
						</div>
						<div className="container mw-100 gap-top">
							<div className="row">
								<div className="col-4">
								</div>
								<div className="col-8 d-flex flex-column align-items-center">
									<h3 className="green-color">منوی غذا</h3>
									<hr className="m-0 line"/>
								</div>
							</div>
							<div className="row">
								<div className="col-6 col-lg-4 center left-border p-5 no-vertical-padding">
									<div className="card bg-white d-flex flex-column align-items-center w-100 p-3">
										<h5> سبد خرید</h5>
										<hr className="m-0 line-2"/>
										<div className="border-dashed w-100 p-4 margin-bottom">
											{currentOrder.length > 0 &&
											currentOrder[0].restaurantName === restaurant.name &&
											currentOrder.map((food) => (<div key={food.name}>
												<div key={food.name} className="d-flex justify-content-between m-1 ">
													<div className="big-font">{food.name}</div>
													<div className="d-flex flex-column align-items-end">
														<div className="d-flex align-items-center margin-bottom">
															<i onClick={() => {
																const sameFoodIndex = currentOrder.findIndex((order) => {
																	return order.name === food.name
																});
																if (sameFoodIndex !== -1) {
																	currentOrder[sameFoodIndex].foodCount += 1;
																	setCurrentOrder(currentOrder);
																}
															}} className="flaticon-plus green-color icon">
															</i>
															<div className="margin-right big-font">
																{food.foodCount}
															</div>
															<i onClick={() => {
																const sameFoodIndex = currentOrder.findIndex((order) => {
																	return order.name === food.name
																});
																if (sameFoodIndex !== -1) {
																	if (currentOrder[sameFoodIndex].foodCount > 1) {
																		currentOrder[sameFoodIndex].foodCount -= 1;
																		setCurrentOrder(currentOrder);
																	} else {
																		currentOrder.splice(sameFoodIndex, 1);
																		setCurrentOrder(currentOrder);
																	}
																}
															}} className="flaticon-minus red-color icon margin-right">
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
											{currentOrder.length > 0 &&
											currentOrder[0].restaurantName !== restaurant.name && 'شما در حال حاضر یک سفارش تکمیل نشده دارید'}
										</div>
										<div className="d-flex margin-bottom">
											<div className="big-font">جمع کل :</div>
											&nbsp;
											<div
												className="big-font">{currentOrder.length > 0 ? currentOrder.reduce((a, b) => a + (b.price || 0), 0) : 0}</div>
											&nbsp;
											<div className="big-font">تومان</div>
										</div>
										<button
											onClick={finalize} type="button"
											className="btn btn-info p-1 big-font white-color padding-vertical">{isLoadingCart ?
											<>
												<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
												<span className="sr-only">درحال بارگذاری...</span></>
											: 'تایید نهایی'}
										</button>
									</div>
								</div>
								<div className="col-6  col-lg-8 d-flex flex-column p-5 align-items-center no-vertical-padding">
									<div className="d-flex flex-row justify-content-between flex-wrap w-100 p-1">
										{restaurant.menu.map((food) =>
											<div
												key={food.name}
												className="card bg-white food p-2 d-flex flex-column justify-content-around align-items-center ">
												<img className="food-icon" alt="food icon" src={food.image}/>
												<div className="d-flex">
													<h6 className="m-0">{food.name}</h6>
													&nbsp;
													&nbsp;
													<div className="d-flex">
														<img className="star-icon" alt="star" src={require("../assets/star-icon.svg")}/>
														<div className="small">{food.popularity * 5}</div>
													</div>
												</div>
												<div className="d-flex align-items-center">
													<div>{food.price}</div>
													&nbsp;
													<div>تومان</div>
												</div>
												<button type="button" className="btn btn-gold p-1"
												        onClick={() => {
													        this.selectedFood = {...food, restaurantName: restaurant.name};
													        if (currentOrder.length === 0 || (currentOrder[0] && currentOrder[0].restaurantName === restaurant.name)) {
														        this.setState({isModalVisible: true})
													        } else {
														        this.setState({isErrorModalVisible: true})
													        }
												        }}>افزودن به سبد خرید
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						{isModalVisible &&
						<>
							<div className="modal d-flex bg-dark opacity-50"
							     onClick={() => this.setState({isModalVisible: false, foodCount: 1})}/>
							<div className="modal d-flex" id="myModal" role="dialog">
								<div className="modal-dialog min-width">
									<div className="modal-content">
										<button type="button" className="close position-absolute m-2"
										        data-dismiss="modal"
										        onClick={() => this.setState({isModalVisible: false, foodCount: 1})}>&times;</button>
										<div className="modal-body d-flex flex-column align-items-center margin-top">
											<div className="big-font">{restaurant.name}</div>
											<div className="row border-bottom margin-top">
												<div className="col-4">
													<img className="food-icon-lg" alt="food icon" src={this.selectedFood.image}/>
												</div>
												<div className="col-8">
													<div className="d-flex ">
														<h6 className="m-0 big-font">{this.selectedFood.name}</h6>
														&nbsp;
														&nbsp;
														<div className="d-flex">
															<img className="star-icon-lg" alt="star"
															     src={require("../assets/star-icon.svg")}/>
															<div className="big-font">{this.selectedFood.popularity * 5}</div>
														</div>
													</div>
													<div className="grey-color margin-top">
														{this.selectedFood.description}
													</div>
													<div className="d-flex align-items-center margin-top">
														<div className="big-font">{this.selectedFood.price}</div>
														&nbsp;
														<div className="big-font">تومان</div>
													</div>
												</div>
											</div>
											<div
												className="row margin-top w-100 justify-content-end align-items-center margin-bottom">
												<div className="col-3 d-flex ">
													<div className="d-flex align-items-center ">
														<i onClick={() => this.setState(prevState => ({foodCount: prevState.foodCount + 1}))}
														   className="flaticon-plus green-color icon">
														</i>
														<div className="margin-right big-font">
															{foodCount}
														</div>
														<i onClick={() => this.setState(prevState => ({foodCount: prevState.foodCount - 1}))}
														   className="flaticon-minus red-color icon margin-right">
														</i>
													</div>
												</div>
												<div className="col-6 col-xl-5 p-0 d-flex justify-content-end">
													<button
														onClick={() => {
															const sameFoodIndex = currentOrder.findIndex((order) => {
																return order.name === this.selectedFood.name
															});
															if (sameFoodIndex !== -1) {
																currentOrder[sameFoodIndex].foodCount += foodCount;
																setCurrentOrder(currentOrder);
															} else {
																setCurrentOrder([...currentOrder, {...this.selectedFood, foodCount}]);
															}
															this.setState({isModalVisible: false, foodCount: 1})
														}} type="button" className="btn btn-info bg-cyan p-1">افزودن به سبد
														خرید
													</button>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</>
						}
						{isErrorModalVisible &&
						<>
							<div className="modal d-flex bg-dark opacity-50"
							     onClick={() => this.setState({isErrorModalVisible: false, foodCount: 1})}/>
							<div className="modal d-flex" id="myModal" role="dialog">
								<div className="modal-dialog min-width">
									<div className="modal-content">
										<button type="button" className="close position-absolute m-2"
										        data-dismiss="modal"
										        onClick={() => this.setState({
											        isErrorModalVisible: false,
											        foodCount: 1
										        })}>&times;</button>
										<div className="modal-body d-flex flex-column align-items-center margin-top">
											<div>شما در حال حاضر یک سفارش تکمیل نشده دارید</div>
											<div className="d-flex flex-row justify-content-around w-100 margin-top">
												<button
													onClick={() => this.setState({isErrorModalVisible: false, foodCount: 1})}
													type="button"
													className="btn btn-info bg-cyan p-1">تکمیل سفارش قبلی
												</button>
												<button
													onClick={() => {
														setCurrentOrder([{...this.selectedFood, foodCount}]);
														this.setState({isErrorModalVisible: false, foodCount: 1});
													}} type="button" className="btn btn-info bg-cyan p-1">ثبت سفارش جدید
												</button>
											</div>
										</div>

									</div>
								</div>
							</div>
						</>
						}
					</main> :
					<main className="d-flex justify-content-center align-items-center vh-100">
						<div>رستوران مورد نظر وجود ندارد</div>
					</main>
				}
			</div>
		)
	}
}

RestaurantPage.defaultProps = {
	setCurrentOrder: null,
	currentOrder: []
};
RestaurantPage.propTypes = {
	setCurrentOrder: PropTypes.func.isRequired,
	currentOrder: PropTypes.array
};

export default withRouter(RestaurantPage)
