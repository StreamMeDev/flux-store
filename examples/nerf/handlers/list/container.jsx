'use strict';
import React from 'react';

module.exports = React.createClass({
	displayName: 'UserList',
	propTypes: {
		users: React.PropTypes.array.isRequired,
		notifications: React.PropTypes.array,
		createUser: React.PropTypes.func.isRequired,
		changeAvatar: React.PropTypes.func.isRequired,
		changeEmail: React.PropTypes.func.isRequired,
		changeUsername: React.PropTypes.func.isRequired,
		avatar: React.PropTypes.string,
		email: React.PropTypes.string,
		username: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			avatar: '',
			email: '',
			username: ''
		};
	},
	render: function () {
		return (
			<section className="container">
				<h1>Users</h1>
				{this.props.notifications && this.props.notifications.map((notification) => {
					return (
						<div className={'alert alert-' + notification.level} key={notification.code} role="alert">
							<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" /> {notification.message}
						</div>
					);
				})}
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Avatar</th>
								<th>Username</th>
								<th>Email</th>
								<th>Actions</th>
							</tr>
							<tr>
								<th>
									<input onChange={this.onAvatarChange} value={this.props.avatar} placeholder="http://example.com/image.jpg" className="form-control" />
								</th>
								<th>
									<input onChange={this.onUsernameChange} value={this.props.username} placeholder="foobar" className="form-control" />
								</th>
								<th>
									<input onChange={this.onEmailChange} value={this.props.email} placeholder="test@example.com" className="form-control" />
								</th>
								<th>
									<button onClick={this.createUser} className="btn btn-success">
										<span className="glyphicon glyphicon-plus-sign" aria-hidden="true" /> Create User
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							{this.props.users.length ? this.props.users.map((user) => {
								return (
									<tr key={user.id}>
										<td>
											<a href={'/user/' + user.id}><img src={user.avatar} width="35" /></a>
										</td>
										<td>
											<a href={'/user/' + user.id}>{'@' + user.username}</a>
										</td>
										<td>{user.email}</td>
										<td>
											<div className="btn-group">
												<a href={'/user/' + user.id} className="btn btn-default">
													<span className="glyphicon glyphicon-pencil" aria-hidden="true" /> Edit
												</a>
												<button onClick={this.deleteUser} data-user-id={user.id} className="btn btn-danger">
													<span className="glyphicon glyphicon-trash" aria-hidden="true" /> Delete
												</button>
											</div>
										</td>
									</tr>
								);
							}) : (
								<tr>
									<td colSpan="4"><h4 style={{textAlign: 'center'}}>No Users</h4></td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
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
	createUser: function () {
		this.props.createUser({
			avatar: this.props.avatar,
			username: this.props.username,
			email: this.props.email
		});
	},
	deleteUser: function (e) {
		this.props.deleteUser(e.target.dataset.userId);
	}
});
