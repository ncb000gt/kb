function increment_search(query) {
    var conn = getDBConnection('_default');
    var sql = "SELECT id, views FROM search_views WHERE query = '"+query+"';";
    app.log(sql);
    var rows = conn.executeQuery(sql);
    var id = null;
    var sql = '';
    if (rows && rows.next() && (id = rows.getColumnItem('id'))) {
	sql = "UPDATE search_views SET views = "+(parseInt(rows.getColumnItem('views'), 10)+1)+" WHERE id = "+id+";";
    } else {
	sql = "INSERT INTO search_views (query,views) values ('"+query+"',"+1+");";
    }
    app.log(sql);
    conn.executeUpdate(sql);
}