import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class DashboardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 1200000,
			start: Date.now() + 1200000,
			isModalVisible: false,
			isErrorModalVisible: false,
			foodCount: 1,
			notEnough: false
		}
	}

	componentDidMount() {
		this.timer = setInterval(() => this.setState({
			time: this.state.start - Date.now()
		}), 1);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (Math.floor(this.state.time / 1000) === 0) {
			this.setState({
				time: 1200000,
				start: Date.now() + 1200000
			})
		}
		if (this.state.foodCount < 1) {
			this.setState({foodCount: prevState.foodCount})
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		const {foodParty, restaurants, history, currentOrder, setCurrentOrder} = this.props;
		const minuets = Math.floor(Math.floor(this.state.time / 1000) / 60);
		const second = Math.floor(this.state.time / 1000) % 60;
		return (
			<div className="d-flex flex-column align-items-center w-100">
				<div className="top-image w-100">
					<div className="top-image-container red">
						<div className="z-index d-flex flex-column align-items-center w-100 opacity-100 gap-top">
							<img src={require("../assets/icon.png")} alt="loghme" className="logo-big gap-top"/>
							<h3 className="white-color margin-top">
								اولین و بزرگترین وب سایت سفارش آنلاین غذا در دانشگاه تهران
							</h3>
						</div>
					</div>
				</div>
				<div
					className="d-flex justify-content-around bg-white align-items-center p-2 rounded margin-top-minus shadow">
					<input type="text"
					       id="credit" name="credit" placeholder=" نام غذا"
					       className="h-100 p-1 padding-vertical rounded border text-center m-1 btn-disabled"/>
					<input type="text"
					       id="credit" name="credit" placeholder=" نام رستوران"
					       className="h-100 p-1 padding-vertical rounded border text-center m-1 btn-disabled"/>
					<button className="btn btn-warning green-color"> جست‌وجو</button>
				</div>
				<div className="col-8 d-flex flex-column align-items-center margin-top">
					<h3 className="green-color">جشن غذا!</h3>
					<hr className="m-0 line"/>
				</div>
				<div className="border-green margin-top p-2">
					زمان باقیمانده:{' ' + minuets + ':' + second}
				</div>
				<div className="margin-top d-flex flex-row horizontal-scroll w-100">
					{foodParty && foodParty.map((food, index) =>
						<div
							key={index}
							className="card bg-white food p-2 d-flex flex-column justify-content-around align-items-center m-3 min-width-200">
							<div className="d-flex align-items-start">
								<img className="food-icon" alt="food icon" src={food.image}/>
								<div className="d-flex flex-column margin-right">
									<h6 className="m-0 text-right">{food.name}</h6>
									<div className="d-flex">
										<div className="small">{food.popularity * 5}</div>
										&nbsp;
										<img className="star-icon" alt="star" src={require("../assets/star-icon.svg")}/>
									</div>
								</div>
							</div>

							<div className="d-flex justify-content-around w-100">
								<div className="text-line-through">{food.oldPrice}</div>
								&nbsp;
								<div>{food.price}</div>
								&nbsp;
							</div>
							<div className="d-flex w-100 justify-content-around">
								<div className="border rounded align-items-center small-font p-1">موجودی: {food.count}</div>
								<button onClick={() => {
									this.selectedFood = food;
									if (currentOrder.length === 0 || (currentOrder[0] && currentOrder[0].restaurantName === food.restaurantName)) {
										this.setState({isModalVisible: true})
									} else {
										this.setState({isErrorModalVisible: true})
									}
								}} type="button" className="btn btn-info rounded no-vertical-padding small-font"> خرید
								</button>
							</div>
							<hr className="m-0 line-3"/>
							{food.restaurantName}
						</div>
					)}
				</div>
				<div className="col-8 d-flex flex-column align-items-center margin-top">
					<h3 className="green-color">رستوران ها</h3>
					<hr className="m-0 line"/>
				</div>
				<div className="col-6  col-lg-8 d-flex flex-column p-5 align-items-center no-vertical-padding">
					<div className="d-flex flex-row justify-content-between flex-wrap w-100 p-1">
						{restaurants.map((restaurant) =>
							<div
								key={restaurant.id}
								className="card bg-white food p-2 d-flex flex-column justify-content-around align-items-center ">
								<img className="food-icon" alt="food icon" src={restaurant.logo}/>
								<div className="text-center">
									{restaurant.name}
								</div>
								<button type="button" className="btn btn-gold p-1"
								        onClick={() => history.push(`/restaurant/${restaurant.id}`)}>نمایش منو
								</button>
							</div>
						)}
					</div>
				</div>
				{this.state.isModalVisible &&
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
									<div className="big-font">{this.selectedFood.restaurantName}</div>
									<div className="row border-bottom margin-top">
										<div className="col-4">
											<img className="food-icon-lg" alt="food icon" src={this.selectedFood.image}/>
										</div>
										<div className="col-8">
											<div className="d-flex ">
												<h6 className="m-0 big-font">{this.selectedFood.name}></h6>
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
												<div className="big-font text-line-through">{this.selectedFood.oldPrice}</div>
												&nbsp;
												&nbsp;
												&nbsp;
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
												<i onClick={() => {
													if (this.state.foodCount < this.selectedFood.count) {
														this.setState(prevState => ({foodCount: prevState.foodCount + 1}))
													} else {
														this.setState({notEnough: true})
													}
												}}
												   className="flaticon-plus green-color icon">
												</i>
												<div className="margin-right big-font">
													{this.state.foodCount}
												</div>
												<i onClick={() => this.setState(prevState => ({foodCount: prevState.foodCount - 1}))}
												   className="flaticon-minus red-color icon margin-right">
												</i>
											</div>
										</div>
										<div className="col-6 col-xl-5 p-0 d-flex justify-content-end">
											<button
												onClick={() => {
													setCurrentOrder([{...this.selectedFood, foodCount: this.state.foodCount}]);
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
				{this.state.isErrorModalVisible &&
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
												setCurrentOrder([{...this.selectedFood, foodCount: this.state.foodCount}]);
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
			</div>
		)
	}
}

DashboardPage.defaultProps = {
	foodParty: [],
	restaurants: [],
	history: {}
};
DashboardPage.propTypes = {
	foodParty: PropTypes.array,
	restaurants: PropTypes.array,
	history: PropTypes.object.isRequired
};

export default withRouter(DashboardPage)
