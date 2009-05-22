function onStart() {
    var hp = root.get('home');
    if (!hp) {
	hp = new Homepage();
	hp.id = 'home';
	hp.title = 'SEOversite Knowledge Base';
	hp.content = <div>SEOversite: Your content, found.</div>;
	root.add(hp);
    };

    var errors = hp.get('error_codes');
    if (!errors) {
	errors = new Topic();
	errors.id = 'error_codes';
	errors.title = 'Error Codes';
	hp.add(errors);
    };

    var articles = hp.getChildCount('Article');
    if (articles <= 0) {
	var article1 = new Article();
	article1.title = 'What is a 404?';
	article1.description = 'A 404 is a not found error.';
	article1.content = <div>A 404 is a not found error. This occurs when a person trys to access a URL on your site that does not exist. You can find your 404 errors in your dashboard.</div>;
	article1.topic = new Reference(errors);
	hp.add(article1);
    };
};