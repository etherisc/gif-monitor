Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password",
	"core",
	"core.core_contracts",
	"core.core_contracts.details",
	"core.events",
	"core.events.details"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"admin.logs_browser",
	"admin.logs_analytics",
	"admin.logs_server",
	"admin.details_modal",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"chains",
	"chains.insert",
	"chains.update",
	"chains.details",
	"contracts",
	"contracts.details",
	"events",
	"events.details",
	"oracle_types",
	"oracle_types.details",
	"oracles",
	"oracles.details",
	"products",
	"products.details"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "admin.logs_browser",	roles: ["admin"] },
	{ route: "admin.logs_analytics",	roles: ["admin"] },
	{ route: "admin.logs_server",	roles: ["admin"] },
	{ route: "admin.details_modal",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/core", {name: "core", title: "", controller: "CoreController"});
	this.route("/core/core_contracts", {name: "core.core_contracts", title: "", controller: "CoreCoreContractsController"});
	this.route("/core/core_contracts/details/:contractId", {name: "core.core_contracts.details", title: "", controller: "CoreCoreContractsDetailsController"});
	this.route("/core/events", {name: "core.events", title: "", controller: "CoreEventsController"});
	this.route("/core/events/details/:eventId", {name: "core.events.details", title: "", controller: "CoreEventsDetailsController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/admin/logs_browser", {name: "admin.logs_browser", title: "", controller: "AdminLogsBrowserController"});
	this.route("/admin/logs_analytics", {name: "admin.logs_analytics", title: "", controller: "AdminLogsAnalyticsController"});
	this.route("/admin/logs_server", {name: "admin.logs_server", title: "", controller: "AdminLogsServerController"});
	this.route("/admin/details_modal", {name: "admin.details_modal", title: "", controller: "AdminDetailsModalController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/chains", {name: "chains", title: "", controller: "ChainsController"});
	this.route("/chains/insert", {name: "chains.insert", title: "", controller: "ChainsInsertController"});
	this.route("/chains/update/:chainId", {name: "chains.update", title: "", controller: "ChainsUpdateController"});
	this.route("/chains/details/:chainId", {name: "chains.details", title: "", controller: "ChainsDetailsController"});
	this.route("/contracts", {name: "contracts", title: "", controller: "ContractsController"});
	this.route("/contracts/details/:contractId", {name: "contracts.details", title: "", controller: "ContractsDetailsController"});
	this.route("/events", {name: "events", title: "", controller: "EventsController"});
	this.route("/events/details/:eventId", {name: "events.details", title: "", controller: "EventsDetailsController"});
	this.route("/oracle_types", {name: "oracle_types", title: "", controller: "OracleTypesController"});
	this.route("/oracle_types/details/:oracleTypeId", {name: "oracle_types.details", title: "", controller: "OracleTypesDetailsController"});
	this.route("/oracles", {name: "oracles", title: "", controller: "OraclesController"});
	this.route("/oracles/details/:oracleId", {name: "oracles.details", title: "", controller: "OraclesDetailsController"});
	this.route("/products", {name: "products", title: "", controller: "ProductsController"});
	this.route("/products/details/:productId", {name: "products.details", title: "", controller: "ProductsDetailsController"});
});
