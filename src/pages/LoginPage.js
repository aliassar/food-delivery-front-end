import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {googleLogin, login} from "../api";
import {GoogleLogin} from 'react-google-login';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	render() {
		const {email, password} = this.state;
		return (
			<div className=" min-vh-100 w-100 background-image">
				<main className="gap-bottom h-100 ">
					<div className="red height-20 padding-top white-color">
						<div className="container h-100">
							<div className="row  h-100">
								<div className="col-8 d-flex align-items-center">
									<h3>ورود</h3>
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
										<button type="button" className="btn btn-info p-1 bg-cyan rounded w-100 border "
										        onClick={() => {
											        login(this.state, (status, token) => {
												        if (status === 200) {
													        localStorage.setItem('isAuthenticated', 'true');
													        localStorage.setItem('token', token)
												        }
											        });
											        setTimeout(() => {
												        this.props.history.push("/");
											        }, 2000)
										        }}>ورود
										</button>
										<button type="button"
										        className="btn btn-outline-info p-1 bg-cyan rounded w-100 border margin-right"
										        onClick={() => {
											        this.props.history.push("/signup")
										        }}>ثبت نام
										</button>

									</div>
									<div className="align-items-center justify-content-center d-flex m-2"
									     data-onsuccess={"onSignIn"}>
										<GoogleLogin
											clientId="347630814057-37803da2d84beq46tu5kifr4cc3cpplc.apps.googleusercontent.com"
											buttonText="Login"
											onSuccess={(response => googleLogin(
												{token:response.tokenId},(status,token)=>{

													if (status === 200) {
														localStorage.setItem('isAuthenticated', 'true');
														localStorage.setItem('token', token)
													}
													setTimeout(() => {
														this.props.history.push("/");
													}, 2000)
												}
											))}
											onFailure={(response => console.log(response))}
											cookiePolicy={'single_host_origin'}
										/>
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

LoginPage.defaultProps = {
	history: {}
};
LoginPage.propTypes = {

	history: PropTypes.object.isRequired
};

export default withRouter(LoginPage)
