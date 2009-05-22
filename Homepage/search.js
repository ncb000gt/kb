function search() {
  var keywords = req.get('s');
  var remote = req.get('r') || false;
    var results = app.getHits({}, {searchable_content: keywords}).objects(0,10);

  if (remote) {
    return this.list_results({results: results});
  } else {
    return this.frame({content: this.render_search({results: results}) });
  };
};