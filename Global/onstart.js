function onStart() {
    var hp = root.get('home');
    if (!hp) {
	hp = new Homepage();
	hp.id = 'home';
	hp.title = 'Knowledge Base';
	hp.content = <div>The information source for you.</div>;
	root.add(hp);
    };

    createDB();
};

function createDB() {
    var conn = getDBConnection('_default');
    var up = conn.executeUpdate("CREATE TABLE IF NOT EXISTS search_views (id INT NOT NULL AUTO_INCREMENT, query VARCHAR(255) NOT NULL, views INT NOT NULL)");
    if (up == -1)
	app.log(conn.getLastError());
}