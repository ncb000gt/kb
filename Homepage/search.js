function search(remote) {
    var query = req.get('s');
    remote = remote || req.get('r') || false;

    var filter = {};
    if (query && query != '') {
	filter = new SearchFilter(query, 'tdc');
    }

    var results = app.getHits(['Article'], filter, {path:'/home'}).objects(0,10);

    if ((results.length > 0) && query && query != '') {
	increment_search(query);
    }
    if (remote) {
	return {results: results.map(function(e) { return {title:e.title,href:e.getURI()};})};
    } else {
	return this.frame({content: this.render_search({results: results}) });
    };
};

function remote_search() {
    return this.search(true);
}

function top_searches(size) {
    size = size || req.get('size') || 5;

    size = parseInt(size, 10);

    var conn = getDBConnection('_default');
    var rows = conn.executeQuery("SELECT query, views FROM search_views ORDER BY views DESC;");
    var results = [];
    if (rows) {
	var i = 0;
	while (rows.next()) {
	    results.push(rows.getColumnItem('query'));
	    i++;
	}
    }

    return results;
}