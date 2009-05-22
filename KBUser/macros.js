function setPassword(pw) {
	this.password = pw.md5();
};

function getFullname() {
	return this.first_name + ' ' + this.last_name;
};

function hasRole(role) {
    if (this.role == role)
	return true;
    return false;
};

