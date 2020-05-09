import React, {Component} from 'react';
import {
	withRouter
} from "react-router-dom";
import PropTypes from "prop-types";

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		}
	}

	componentDidMount() {
		if (this.props.title) {
			document.title = this.props.title
		}
	}

	render() {
		const {orderCount, location, history, showModal} = this.props;
		const noHeader = location.pathname === '/login' || location.pathname === '/signup'
		const noIcon = location.pathname === '/';

		return (
			<div>
				{!noHeader && <header
					className={"header d-flex flex-row align-items-center position-fixed w-100 bg-white margin-bottom-50" + (noIcon ? " justify-content-end" : " justify-content-between")}>
					{!noIcon && <a href="/">
						<img src={require("../assets/icon.png")} alt="loghme" className="logo"/>
					</a>}
					<div className="d-flex flex-row justify-content-between align-items-center">
						{orderCount !== 0 ?
							<i onClick={() => showModal()} className="flaticon-smart-cart icon-with-badge"><span
								className="badge badge-pill badge-info badge-notification">{orderCount}</span></i> :
							<i onClick={() => showModal()} className="flaticon-smart-cart icon-with-badge m-0"/>}
						{location.pathname !== '/profile' && <a className="margin-left" href="/profile">حساب کاربری</a>}
						<button onClick={() => {
							localStorage.removeItem('isAuthenticated');
							localStorage.removeItem('token');
							history.push('/')
						}} className="btn red-color">خروج
						</button>
					</div>
				</header>}
				{this.props.children}
				<footer className="bg-green d-flex justify-content-center white-color p-2 w-100 ">
					&copy; تمامی حقوق متعلق به لقمه است.
				</footer>
			</div>
		)
	}
}

Layout.defaultProps = {
	orderCount: 0,
	location: {},
	history: {},
	showModal: null
};
Layout.propTypes = {
	orderCount: PropTypes.number,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	showModal: PropTypes.func.isRequired
};

export default withRouter(Layout)
