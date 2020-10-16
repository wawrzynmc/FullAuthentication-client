import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import classes from './Socials.module.scss';

export const Facebook = (props) => {
	const sendFacebookToken = (userID, accessToken) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/login/facebook`, {
				userID,
				accessToken,
			})
			.then((res) => {
				console.log(res.data);
				// informParent(res);
			})
			.catch((error) => {
				console.log('GOOGLE SIGNIN ERROR', error.response);
			});
	};

	const responseFacebook = (response) => {
		console.log(response);
		// sendFacebookToken(response.userID, response.accessToken);
	};

	return (
		<FacebookLogin
			appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
			autoLoad={false}
			fields="name, email, picture"
			callback={responseFacebook}
			render={(renderProps) => (
				<button
					onClick={renderProps.onClick}
					className={`${classes.Button} ${classes.Button_facebook}`}
				>
					<i className="fab fa-facebook" />
				</button>
			)}
		/>
	);
};

export const Google = (props) => {
	const sendGoogleToken = async (tokenId) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/account/signin/google`,
				{
					idToken: tokenId,
				}
			);
			console.log(response);
		} catch (err) {}
	};

	const responseGoogle = (response) => {
		sendGoogleToken(response.tokenId);
	};

	return (
		<GoogleLogin
			clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
			render={(renderProps) => (
				<button
					onClick={renderProps.onClick}
					disabled={renderProps.disabled}
					className={`${classes.Button} ${classes.Button_google}`}
				>
					<i className="fab fa-google " />
				</button>
			)}
		></GoogleLogin>
	);
};
