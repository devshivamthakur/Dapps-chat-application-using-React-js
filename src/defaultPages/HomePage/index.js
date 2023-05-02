import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { wrapperStyle, titleStyle, subTitleStyle, boxStyle, titleWrapperStyle, thumbnailWrapperStyle, componentTitleStyle, UIComponentStyle, descWrapperStyle, linkWrapperStyle, linkStyle, logoutBtn } from "./style";

import * as actions from "../../store/action";

import CometChatUI from "./resources/CometChatUI.png";

class HomePage extends React.Component {
	render() {
		let authRedirect = null;
		if (!this.props.isLoggedIn) {
			authRedirect = <Redirect to="/login" />;
		}

		return (
			<div css={wrapperStyle()}
			style={{
				
				background: 'linear-gradient(to right, #8360c3, #2ebf91)',
				height: '100vh'
			}}
			>
				{authRedirect}
				<p css={titleStyle()}>Welcome To Our Dapps Chat Application</p>
				<p css={subTitleStyle()}>.</p>

				<div css={UIComponentStyle()}>
					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								<img src={CometChatUI} alt="CometChatUI" />
							</div>
							<h2 css={componentTitleStyle()}>Chat with friends</h2>
						</div>
						<div css={descWrapperStyle()}>
							
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/embedded-app">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>

				
				
				<div css={logoutBtn()}>
					<button type="button" onClick={this.props.onLogout}>
						Logout
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		error: state.error,
		isLoggedIn: state.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
