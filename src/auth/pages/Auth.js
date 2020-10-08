// * -- libraries imports
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// * -- my own imports
// ---- components
import Button from '../../shared/components/FormElements/Button/Button';
import {
	Facebook as FacebookLogin,
	Google as GoogleLogin,
} from '../../shared/components/FormElements/Socials/Socials';
import SignupForm from '../components/SignupForm/SignupForm';
import SigninForm from '../components/SigninForm/SigninForm';
import TextBetweenLines from '../../shared/components/UIElements/Text/TextBetweenLines/TextBetweenLines';

// ---- functions
import { AuthContext } from '../../shared/context/auth-context';

// ---- styles
import classes from './Auth.module.scss';

// * -- component
const Auth = (props) => {
	// -- variables
	const [isLoginMode, setIsLoginMode] = useState(false);
	const auth = useContext(AuthContext);
	const searchParams = useLocation().search;

	// -- functions
	// ---- change to specific form due to searchParams
	useEffect(() => {
		const query = new URLSearchParams(searchParams);
		query.get('action') === 'signup'
			? setIsLoginMode(false)
			: setIsLoginMode(true);
	}, [setIsLoginMode, searchParams]);

	const switchModeHandler = () => {
		setIsLoginMode((prevMode) => !prevMode);
	};

	return (
		<div
			className={`
				${classes.Container} 
				${!isLoginMode && classes.Container_secondPanelActive}
			`}
		>
			<div
				className={`
					${classes.FormContainer} 
					${classes.FormContainer_signup}
				`}
			>
				<h1 className={classes.FormContainer__Title}>Create Account</h1>
				<div className={classes.FormContainer__Socials}>
					<FacebookLogin />
					<GoogleLogin />
				</div>
				<span className={classes.FormContainer__paragraph}>
					or fill the form
				</span>
				<SignupForm />
			</div>
			<div
				className={`
					${classes.FormContainer} 
					${classes.FormContainer_signin}
				`}
			>
				<h1 className={classes.FormContainer__Title}>Sign in</h1>
				<div className={classes.FormContainer__Socials}>
					<FacebookLogin />
					<GoogleLogin />
				</div>
				<span className={classes.FormContainer__paragraph}>
					or fill the form
				</span>
				<SigninForm />
			</div>
			<div className={classes.OverlayContainer}>
				<div className={classes.OverlayContainer__Overlay}>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_first}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							Welcome Back
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								log in and have fun!
							</p>
							<TextBetweenLines>or</TextBetweenLines>
						</span>
						<Button ghost onClick={switchModeHandler}>
							SIGNIN
						</Button>
					</div>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_second}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							First Time Here?
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								create an account and start the journey!
							</p>
							<TextBetweenLines>or</TextBetweenLines>
						</span>
						<Button ghost onClick={switchModeHandler}>
							SIGNUP
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
