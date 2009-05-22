function breadcrumbs() {
  var objs = [];
  var obj = this;
  while (!(obj instanceof Root)) {
    objs.unshift(obj);
    obj = obj._parent;
  };

  return objs;
};

function getNavigation() {
    var data = {
	attributes: {
	    id: "root"
	},
	data: "Topics",
	state: "open",
	children: []
    };
    var topics = app.getObjects("Topic", {}, {sort: {title:'asc'}});
    for each (var t in topics) {
	var sources = app.getSources(t, "Article", {}, {sort: {title:'asc'}});
	var topic = {
	    attributes: {id: t.id, rel: "folder"},
	    data: {title:t.title/*, attributes: {href:t.getURI(), onclick:"window.location=this.href"}*/},
	    state: ((sources.contains(this))?"open":"closed"),
	    children: sources.map(function(elem) {
		return {
		    attributes: { id: elem.id },
		    data: {
			title:elem.title,
			attributes: {
			    href: elem.getURI(),
			    onclick:"window.location=this.href"
			}
		    }
		};
	    })
	};
	data['children'].push(topic);
    }

    return data;
};

function genHeadline() {
  var title = null;
  title = this.title;

  return title;
};

function genSearchContent() {
    return this.title + ' ' + this.description;
};