import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingOrders: false,
			isModalVisible: false,
		}
	}
	componentDidMount() {
		this.props.getUser()
	}

	selectedOrder = {};

	render() {
		const {isShowingOrders, isModalVisible} = this.state;
		const {userOrders, setCredit, credit, isLoadingCredit, user} = this.props;
		console.log(user)
		return (
			<main className="gap-bottom h-100">
				<div className="red height-30 padding-top white-color">
					<div className="container h-100">
						<div className="row  h-100">
							<div className="col-8 d-flex align-items-center">
								<i className="flaticon-account profile-icon"/>
								<h3>{(user && user.fname) +' '+ (user && user.lname)}</h3>
							</div>
							<div className="col-4 d-flex flex-column justify-content-center">
								<div className="d-flex align-items-center">
									<i className="flaticon-phone">
									</i>
									<div>
										{user && user.phoneNumber}
									</div>
								</div>
								<div className="d-flex align-items-center">
									<i className="flaticon-mail">
									</i>
									<div>
										{user && user.email}
									</div>
								</div>
								<div className="d-flex align-items-center">
									<i className="flaticon-smart-cart">
									</i>
									<div>
										{credit}
										&nbsp;
									</div>
									<div>
										تومان
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-100 d-flex justify-content-center gap-top">
					<div className="border w-75 p-5 rounded-lg">
						<div className="d-flex justify-content-center btn-group-custom w-100">
							<div className="card d-flex flex-row w-50">
								<div
									onClick={() => this.setState({isShowingOrders: true})}
									className={"p-3 right-rounded w-50 align-items-center text-center " + (isShowingOrders && "red white-color")}>
									سفارش ها
								</div>
								<div
									onClick={() => this.setState({isShowingOrders: false})}
									className={"p-3 left-rounded w-50 align-items-center text-center " + (!isShowingOrders && "red white-color")}>
									افزایش اعتبار
								</div>
							</div>
						</div>
						{isShowingOrders ?
							<div className="gap-top">
								{userOrders.length > 0 ? userOrders.map((order, index) => (
									<div className="border row rounded margin-top">
										<div className="col-1 p-3 d-flex justify-content-center border-left">{index}</div>
										<div
											className="col-6 p-3 d-flex justify-content-center border-left">{order.restaurantName}</div>
										<div
											onClick={() => {
												this.selectedOrder = order;
												this.setState({isModalVisible: true})
											}}
											className="col-5 p-3 d-flex justify-content-center"><span
											className={"badge p-2 padding-vertical" + order.status === 'done' ? 'badge-danger' :
												order.status === 'in-way' ? 'badge-success' :
													order.status === 'find-deliverer' ? 'badge-info' :
														null}>{
											order.status === 'done' ? '' :
												order.status === 'in-way' ? 'پیک در مسیر' :
													order.status === 'find-deliverer' ? 'در جستجوی پیک' :
														null}</span>
										</div>
									</div>
								)) : <div className="d-flex justify-content-center">سفارشی موجود نیست</div>}
							</div>
							:
							<div className="gap-top d-flex justify-content-center">
								<div className="row justify-content-between w-50">
									<div className="col-8 p-0">
										<label className="w-100 h-100" htmlFor="credit">
											<input ref={(input) => this.input = input}
											       defaultValue="10000"
											       className="w-100 h-100 p-1 padding-vertical rounded border" type="text"
											       id="credit" name="credit" placeholder="میزان افزایش اعتبار"/>
										</label>
									</div>
									<div className="col-3 bg-white d-flex justify-content-center p-0">
										<button onClick={() => setCredit(parseInt(this.input.value))} type="button"
										        className="btn btn-info p-1 bg-cyan rounded w-100 border">{isLoadingCredit ?
											<>
												<span className="spinner-border spinner-border-sm" role="status"
												      aria-hidden="true"/>
												<span className="sr-only">درحال بارگذاری...</span></>
											: 'تایید نهایی'}
										</button>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
				{isModalVisible && <>
					<div
						onClick={() => this.setState({isModalVisible: false})}
						className="modal d-flex bg-dark opacity-50"/>
					<div className="modal d-flex" id="myModal" role="dialog">
						<div className="modal-dialog min-width-lg">
							<div className="modal-content">
								<button
									onClick={() => this.setState({isModalVisible: false})}
									type="button" className="close position-absolute m-2"
									data-dismiss="modal">&times;</button>
								<div className="modal-body m-4 d-flex flex-column align-items-center margin-top">
									<div className="big-font">{this.selectedOrder.restaurantName}</div>
									<hr className="m-0 line-3"/>
									<table className="w-100 text-center">
										<tr>
											<th className="first-row grey-color">ردیف</th>
											<th className="first-row grey-color">نام غذا</th>
											<th className="first-row grey-color">تعداد</th>
											<th className="first-row grey-color">قیمت</th>
										</tr>
										{this.selectedOrder.foods.map((food, index) => (
											<tr>
												<td>{index}</td>
												<td>{food.name}</td>
												<td>{food.count}</td>
												<td>{food.price}</td>
											</tr>
										))}
									</table>
									<div className="w-100 margin-top">
										<div className="d-flex margin-bottom justify-content-end">
											<div className="big-font">جمع کل :</div>
											&nbsp;
											<div className="big-font">107000</div>
											&nbsp;
											<div className="big-font">تومان</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</>}
			</main>
		)
	}
}

ProfilePage.defaultProps = {
	userOrders: [],
	setCredit: null,
	credit: 0
};
ProfilePage.propTypes = {
	userOrders: PropTypes.array,
	setCredit: PropTypes.func.isRequired,
	credit: PropTypes.number
};

export default withRouter(ProfilePage)
