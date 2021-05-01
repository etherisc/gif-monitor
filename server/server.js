var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	// Email templates config
	if(Accounts.emailTemplates) {
		Accounts.emailTemplates.siteName = "GIF Monitor";
		Accounts.emailTemplates.from = "";
	}

	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "auth0": {
	//             "domain": "",
	//             "clientId": "",
	//             "secret": ""
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// auth0
		if(Meteor.settings.oauth.auth0 && _.isObject(Meteor.settings.oauth.auth0)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "auth0"
			});

			var settingsObject = Meteor.settings.oauth.auth0;
			settingsObject.service = "auth0";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}

	
});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, data) {
		if(!data || !Object.keys(data).length) {
			return;
		}

		// Only admin or owner
		if(!(Users.isAdmin(this.userId) || userId == this.userId)) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// deepen: convert { "x.y": "val" } into { x: { y: "val" }}
		var userData = objectUtils.deepen(data);

		// non-admin user can change only .profile, .private and .public
		if(!Users.isAdmin(this.userId)) {
			let allowedKeys = ["profile", "private", "public"];
			for(var key in userData) {
				if(allowedKeys.indexOf(key) < 0) {
					throw new Meteor.Error(403, "You are not allowed to modify \"" + key + "\".");
				}
			}
		}

		// flatten: convert { x: { y: "val" }} into { "x.y": "val" }
		userData = objectUtils.flatten(userData);

		// update
		Users.update(userId, { $set: userData });
	},

	"detectUsersCountryCode": function() {
		var ip = null;
		if (this.connection) {
			ip = this.connection.clientAddress || null;
			if (!ip && this.connection.httpHeaders) {
				ip = this.connection.httpHeaders["x-forwarded-for"] || null;
			}
		}

		if (!ip) {
			return "";
		}

		var res = HTTP.get("https://ipinfo.io/" + ip);
		if(res && res.statusCode == 200 && res.data && !res.data.bogon) {
			return res.data.country;
		}

		return "";
	},

	/* DANGER! */
	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

var getUserOAuthProfile = function(doc) {
	if(doc.services) {
		doc.profile = doc.profile || {};
		doc.private = doc.private || {};
		// google e-mail
		if(doc.services.google && doc.services.google.email) {
			doc.private.email = doc.services.google.email;
		} else {
			// github e-mail
			if(doc.services.github && doc.services.github.accessToken) {
				var github = new GitHub({
					version: "3.0.0",
					timeout: 5000
				});

				github.authenticate({
					type: "oauth",
					token: doc.services.github.accessToken
				});

				try {
					var result = github.user.getEmails({});
					var email = _.findWhere(result, { primary: true });
					if(!email && result.length && _.isString(result[0])) {
						email = { email: result[0] };
					}

					if(email) {
						doc.private.email = email.email;
					}
				} catch(e) {
					console.log(e);
				}
			} else {
				// linkedin email
				if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
					doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
					doc.profile.firstName = doc.services.linkedin.firstName;
					doc.profile.lastName = doc.services.linkedin.lastName;
					doc.private.email = doc.services.linkedin.emailAddress;
				} else {
					if(doc.services.facebook && doc.services.facebook.email) {
						// facebook
						doc.private.email = doc.services.facebook.email;
					} else {
						if(doc.services.twitter && doc.services.twitter.email) {
							// twitter
							doc.private.email = doc.services.twitter.email;
						} else {
							if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
								// meteor
								doc.private.email = doc.services["meteor-developer"].emails[0].address;
							} else {
								if(doc.services.auth0) {
									// auth0
									doc.profile.name = doc.services.auth0.given_name + " " + doc.services.auth0.family_name;
									doc.profile.firstName = doc.services.auth0.given_name;
									doc.profile.lastName = doc.services.auth0.family_name;
									doc.private.email = doc.services.auth0.email;
								}
							}
						}
					}
				}
			}
		}
	}
	return doc;
};


Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}

	user.private = user.private || {};

	Meteor.call("detectUsersCountryCode", function(e, r) {
		if(e) {
			console.log(e);
		}
		Users.update({ _id: user._id }, { $set: { "private.countryCode": r } });
	});

	if(user.services) {
		user = getUserOAuthProfile(user);
	}

	if(!Users.findOne({ roles: "admin" }) && user.roles.indexOf("admin") < 0) {
		user.roles = ["admin"];
	 }


	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(499, "E-mail not verified.");
  }

	return true;
});

Accounts.onLogin(function (info) {
	if(info.user && info.user.services) {
		var user = getUserOAuthProfile(info.user);
		Users.update({ _id: user._id }, { $set: { "profile": user.profile, "private": user.private } });
	}
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};

Accounts.urls.enrollAccount = function (token) {
	return Meteor.absoluteUrl('create_password/' + token);
};
