import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {signUp} from "../api";

class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: '',
			lname: '',
			email: '',
			password: ''
		}
	}

	render() {
		const {fname,lname, email, password} = this.state;
		return (
			<div className=" min-vh-100 w-100 background-image">
				<main className="gap-bottom h-100 ">
					<div className="red height-20 padding-top white-color">
						<div className="container h-100">
							<div className="row  h-100">
								<div className="col-8 d-flex align-items-center">
									<h3>ثبت نام</h3>
								</div>
								<div className="col-4 d-flex flex-column justify-content-center">
								</div>
							</div>
						</div>
					</div>
					<div className="w-100 d-flex justify-content-center gap-top">
						<div className="border w-75 p-5 rounded-lg bg-white">

							<div className=" d-flex justify-content-center">
								<div className="justify-content-between m-5">
									<label className="w-100" htmlFor="credit">
										<input className="w-100  p-2 padding-vertical rounded border" type="text" id="fname"
										       name="name" placeholder="نام" value={fname}
										       onChange={(event) => this.setState({fname: event.target.value})}/>
									</label>
									<label className="w-100" htmlFor="credit">
										<input className="w-100  p-2 padding-vertical rounded border" type="text" id="lname"
										       name="name" placeholder="نام خانوادگی" value={lname}
										       onChange={(event) => this.setState({lname: event.target.value})}/>
									</label>
									<label className="w-100" htmlFor="credit">
										<input className="w-100  p-2 padding-vertical rounded border" type="text" id="email"
										       name="email" placeholder="پست الکترونیک" value={email}
										       onChange={(event) => this.setState({email: event.target.value})}/>
									</label>
									<label className="w-100" htmlFor="credit">
										<input className="w-100  p-2 padding-vertical rounded border" type="password"
										       id="password"
										       name="password" placeholder="رمز عبور" value={password}
										       onChange={(event) => this.setState({password: event.target.value})}/>
									</label>
									<div className="bg-white d-flex justify-content-center p-0 margin-top">
										<button type="button" className="btn btn-info p-1 bg-cyan rounded w-100 border"
										        onClick={() =>
											        {
												        signUp(this.state, (status, token) => {
													        if (status === 200) {
														        localStorage.setItem('isAuthenticated', 'true');
														        localStorage.setItem('token', token);
													        }
												        });
												        setTimeout(()=>{
													        this.props.history.push("/");
												        },2000)
											        }}>ثبت نام
										</button>
										<button type="button" className="btn btn-outline-info p-1 bg-cyan rounded w-100 border margin-right"
										        onClick={() => {
											        this.props.history.push("/login")
										        }}>ورود
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}
SignUpPage.defaultProps={
	history:{}
};
SignUpPage.propTypes={
	history:PropTypes.object.isRequired
};

export default withRouter(SignUpPage)
