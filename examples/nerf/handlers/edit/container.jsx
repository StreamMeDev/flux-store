'use strict';
import React from 'react';

module.exports = React.createClass({
	displayName: 'UserEdit',
	propTypes: {
		user: React.PropTypes.object.isRequired,
		notifications: React.PropTypes.array,
		changeAvatar: React.PropTypes.func.isRequired,
		changeEmail: React.PropTypes.func.isRequired,
		changeUsername: React.PropTypes.func.isRequired
	},
	render: function () {
		if (!this.props.user) {
			return (
				<section>
					<h1>User Not Found</h1>
					<p>Perhaps you would like to go <a href="/">back to the listing</a>?</p>
				</section>
			);
		}

		return (
			<section>
				<nav className="navbar navbar-default">
					<div className="container">
						<ul className="nav navbar-nav">
							<li><a href="/"><span className="glyphicon glyphicon glyphicon-arrow-left" aria-hidden="true" /> Back</a></li>
						</ul>
					</div>
				</nav>
				<form className="container">
					<h1>Edit User</h1>

					{this.props.notifications && this.props.notifications.map((notification) => {
						return (
							<div className={'alert alert-' + notification.level} key={notification.code} role="alert">
								<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" /> {notification.message}
							</div>
						);
					})}

					<div className="form-group">
						<label>Username</label>
						<input onChange={this.onUsernameChange} value={this.props.user.username} type="text" placeholder="foobar" className="form-control" />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input onChange={this.onEmailChange} value={this.props.user.email} type="email" placeholder="test@example.com" className="form-control" />
					</div>
					<div className="form-group">
						<label>Avatar</label>
						<input onChange={this.onAvatarChange} value={this.props.user.avatar} type="url" placeholder="http://example.com/image.jpg" className="form-control" />
					</div>

					<button onClick={this.saveUser} className="btn btn-success">
						<span className="glyphicon glyphicon-plus-sign" aria-hidden="true" /> Save User
					</button>&nbsp;
					<button onClick={this.deleteUser} className="btn btn-danger">
						<span className="glyphicon glyphicon-trash" aria-hidden="true" /> Delete User
					</button>
				</form>
			</section>
		);
	},
	onAvatarChange: function (e) {
		this.props.changeAvatar(e.target.value);
	},
	onUsernameChange: function (e) {
		this.props.changeUsername(e.target.value);
	},
	onEmailChange: function (e) {
		this.props.changeEmail(e.target.value);
	},
	deleteUser: function (e) {
		e.preventDefault();
		this.props.deleteUser(this.props.user.id);
	},
	saveUser: function (e) {
		e.preventDefault();
		this.props.saveUser(this.props.user.id, {
			avatar: this.props.user.avatar,
			username: this.props.user.username,
			email: this.props.user.email
		});
	}
});
