function Login() {
    var username = req.get("username");
    var password = req.get("password");

    if (username && password) {
	var user = app.getObjects("KBUser", {username: username, password: password.md5()});
	if (user.length > 0) {
	    session.login(user[0]);
	    res.redirect(root.get("home").getURI());
	};
    };

    return this.frame({content: this.login_form({})});
};

function Logout() {
    session.logout();
    res.redirect(root.get("home").getURI());
};