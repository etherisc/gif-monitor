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
	"core_public",
	"core_public.instances_public",
	"core_public.core_contracts_public",
	"core_public.core_contracts_public.details",
	"core_public.events_public",
	"core_public.events_public.details",
	"oracles_public",
	"oracles_public.oracle_types_public",
	"oracles_public.oracle_types_public.details",
	"oracles_public.oracles_public",
	"oracles_public.oracles_public.details",
	"products_public",
	"products_public.details",
	"policies_public",
	"policies_public.metadata_public",
	"policies_public.metadata_public.details",
	"policies_public.applications_public",
	"policies_public.applications_public.details",
	"policies_public.policies_public",
	"policies_public.policies_public.details",
	"policies_public.claims_public",
	"policies_public.payouts_public"
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
	"admin.settings_page",
	"admin.settings_page.insert",
	"admin.settings_page.update",
	"admin.settings_page.details",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"instances",
	"instances.insert",
	"instances.update",
	"instances.details",
	"contracts",
	"contracts.details",
	"events",
	"events.details",
	"oracle_types",
	"oracle_types.details",
	"oracles",
	"oracles.details",
	"products",
	"products.details",
	"metadata",
	"metadata.details",
	"applications",
	"applications.details",
	"policies",
	"policies.details",
	"claims",
	"claims.details",
	"payouts",
	"payouts.details"
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
	{ route: "admin.settings_page",	roles: ["admin"] },
	{ route: "admin.settings_page.insert",	roles: ["admin"] },
	{ route: "admin.settings_page.update",	roles: ["admin"] },
	{ route: "admin.settings_page.details",	roles: ["admin"] },
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
	this.route("/core_public", {name: "core_public", title: "", controller: "CorePublicController"});
	this.route("/core_public/instances_public", {name: "core_public.instances_public", title: "", controller: "CorePublicInstancesPublicController"});
	this.route("/core_public/core_contracts_public", {name: "core_public.core_contracts_public", title: "", controller: "CorePublicCoreContractsPublicController"});
	this.route("/core_public/core_contracts_public/details/:contractId", {name: "core_public.core_contracts_public.details", title: "", controller: "CorePublicCoreContractsPublicDetailsController"});
	this.route("/core_public/events_public", {name: "core_public.events_public", title: "", controller: "CorePublicEventsPublicController"});
	this.route("/core_public/events_public/details/:eventId", {name: "core_public.events_public.details", title: "", controller: "CorePublicEventsPublicDetailsController"});
	this.route("/oracles_public", {name: "oracles_public", title: "", controller: "OraclesPublicController"});
	this.route("/oracles_public/oracle_types_public", {name: "oracles_public.oracle_types_public", title: "", controller: "OraclesPublicOracleTypesPublicController"});
	this.route("/oracles_public/oracle_types_public/details/:oracleTypeId", {name: "oracles_public.oracle_types_public.details", title: "", controller: "OraclesPublicOracleTypesPublicDetailsController"});
	this.route("/oracles_public/oracles_public", {name: "oracles_public.oracles_public", title: "", controller: "OraclesPublicOraclesPublicController"});
	this.route("/oracles_public/oracles_public/details/:oracleId", {name: "oracles_public.oracles_public.details", title: "", controller: "OraclesPublicOraclesPublicDetailsController"});
	this.route("/products_public", {name: "products_public", title: "", controller: "ProductsPublicController"});
	this.route("/products_public/details/:productId", {name: "products_public.details", title: "", controller: "ProductsPublicDetailsController"});
	this.route("/policies_public", {name: "policies_public", title: "", controller: "PoliciesPublicController"});
	this.route("/policies_public/metadata_public", {name: "policies_public.metadata_public", title: "", controller: "PoliciesPublicMetadataPublicController"});
	this.route("/policies_public/metadata_public/details/:metadataId", {name: "policies_public.metadata_public.details", title: "", controller: "PoliciesPublicMetadataPublicDetailsController"});
	this.route("/policies_public/applications_public", {name: "policies_public.applications_public", title: "", controller: "PoliciesPublicApplicationsPublicController"});
	this.route("/policies_public/applications_public/details/:applicationId", {name: "policies_public.applications_public.details", title: "", controller: "PoliciesPublicApplicationsPublicDetailsController"});
	this.route("/policies_public/policies_public", {name: "policies_public.policies_public", title: "", controller: "PoliciesPublicPoliciesPublicController"});
	this.route("/policies_public/policies_public/details/:policyId", {name: "policies_public.policies_public.details", title: "", controller: "PoliciesPublicPoliciesPublicDetailsController"});
	this.route("/policies_public/claims_public", {name: "policies_public.claims_public", title: "", controller: "PoliciesPublicClaimsPublicController"});
	this.route("/policies_public/payouts_public", {name: "policies_public.payouts_public", title: "", controller: "PoliciesPublicPayoutsPublicController"});
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
	this.route("/admin/settings_page", {name: "admin.settings_page", title: "", controller: "AdminSettingsPageController"});
	this.route("/admin/settings_page/insert", {name: "admin.settings_page.insert", title: "", controller: "AdminSettingsPageInsertController"});
	this.route("/admin/settings_page/update/:settingId", {name: "admin.settings_page.update", title: "", controller: "AdminSettingsPageUpdateController"});
	this.route("/admin/settings_page/details/:settingId", {name: "admin.settings_page.details", title: "", controller: "AdminSettingsPageDetailsController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/instances", {name: "instances", title: "", controller: "InstancesController"});
	this.route("/instances/insert", {name: "instances.insert", title: "", controller: "InstancesInsertController"});
	this.route("/instances/update/:chainId", {name: "instances.update", title: "", controller: "InstancesUpdateController"});
	this.route("/instances/details/:chainId", {name: "instances.details", title: "", controller: "InstancesDetailsController"});
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
	this.route("/metadata", {name: "metadata", title: "", controller: "MetadataController"});
	this.route("/metadata/details/:metadataId", {name: "metadata.details", title: "", controller: "MetadataDetailsController"});
	this.route("/applications", {name: "applications", title: "", controller: "ApplicationsController"});
	this.route("/applications/details/:applicationId", {name: "applications.details", title: "", controller: "ApplicationsDetailsController"});
	this.route("/policies", {name: "policies", title: "", controller: "PoliciesController"});
	this.route("/policies/details/:policyId", {name: "policies.details", title: "", controller: "PoliciesDetailsController"});
	this.route("/claims", {name: "claims", title: "", controller: "ClaimsController"});
	this.route("/claims/details/:claimId", {name: "claims.details", title: "", controller: "ClaimsDetailsController"});
	this.route("/payouts", {name: "payouts", title: "", controller: "PayoutsController"});
	this.route("/payouts/details/:payoutId", {name: "payouts.details", title: "", controller: "PayoutsDetailsController"});
});
