function AddContent() {
    return this.frame({content: this.content_form({title:null, description: null, content:null, edit:null, id:null, topics: app.getObjects("Topic")})});
};

function AddContent_save() {
    var edit = req.get("edit");
    var title = req.get("title");
    var topic = req.get("topic");
    var content = req.get("content");
    var description = req.get("description");

    if (title && topic && content) {
	var hp = root.get("home");
	var article = null;
	if (!edit) {
	    article = new Article();
	    article.title = title;
	    article.content = new XMLList(content.replace(/&[^;]*;/g, ''));
	    if (description)
		article.description = description;
	    var topic_obj = app.getObjects("Topic", {title: topic});
	    if (topic_obj.length === 0) {
		topic_obj = this.AddTopic_save(topic, null, 2);
	    } else {
		topic_obj = topic_obj[0];
	    }
	    article.topic = new Reference(topic_obj);
	    article.author = new Reference(session.user);
	    hp.add(article);
	} else {
	    var id = req.get("id");
	    if (id) {
		article = hp.get(id);
		article.title = title;
		article.content = new XMLList(content.replace(/&[^;]*;/g, ''));
		if (description)
		    article.description = description;
		var topic_obj = app.getObjects("Topic", {title: topic});
		if (topic_obj.length === 0) {
		    topic_obj = this.AddTopic_save(topic, null, 2);
		} else {
		    topic_obj = topic_obj[0];
		}
		article.topic = new Reference(topic_obj);
		article.author = new Reference(session.user);
	    }
	}
    }
}

function AddTopic() {
    return this.frame({content: this.topic_form({})});
}

function AddTopic_save(title, id, override_edit) {
    var edit = req.get("edit");
    if (!title)
	title = req.get("title");

    var topic = null;
    var hp = root.get("home");
    if (!edit || override_edit == 2) {
	topic = new Topic();
	topic.title = title;
	topic.id = title.toLowerCase().replace(/\s/g, "_").replace(/[^\w\d]/g, "");
	hp.add(topic);
	res.commit();
    } else {
	if (!id)
	    id = req.get("id");
	if (id) {
	    topic = hp.get(id);
	    topic.title = title;
	}
    }
    return topic;
}

function EditContent() {
    var id = req.get("id");
    if (id) {
	var form = null;
	var o = root.get("home").get(id);
	if (o) {
	    if (o instanceof Article) {
		var new_topics = [];
		var topic = o.topic.getTarget();
		for each(var t in app.getObjects("Topic")) {
		    var to = {title:t.title};
		    if (topic.title == t.title) {
			app.log("found - " + o.title);
			to.selected = "selected";
		    }
		    new_topics.push(to);
		}
		form = this.content_form({
		    id: id,
		    title: o.title,
		    description: o.description,
		    topics: new_topics,
		    content: o.content.toXMLString(),
		    edit: true
		});

	    } else if (o instanceof Topic) {
		form = this.topic_form({
		    id: id,
		    title: o.title,
		    edit: true
		});
	    }

	    if (form)
		return this.frame({content: form});
	}
    }
};

function RemoveContent() {
    var id = req.get("id");
    if (id) {
	var article = root.get("home").get(id);
	if (article) {
	    article.del();
	    return true;
	}
    }
    return false;
}