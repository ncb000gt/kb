function genTitle() {
  return this.id + ' - ' + this.title;
};

function genId() {
  return 'KB'+ this._id;
};

function genSearchContent() {
    return this.id + ' ' + this.title + ' ' + this.description + ' ' + this.content + ' ' + this.author;
};