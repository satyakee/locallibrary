var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var moment = require('moment');

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});


// Virtual for author's DOB
AuthorSchema
.virtual('formattedDOB')
.get(function () {
  //return (this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '');
  return (this.date_of_birth ? this.date_of_birth.getFullYear() : '');
});

// Virtual for author's DOD
AuthorSchema
.virtual('formattedDOD')
.get(function () {
  //return (this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '');
  return (this.date_of_death ? this.date_of_death.getFullYear() : '');
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var YoD = this.date_of_death ? this.date_of_death.getFullYear() : '';	
  var YoB = this.date_of_birth ? this.date_of_birth.getFullYear() : '';	
  return (((YoD - YoB) > 0) ? YoD - YoB : '').toString();
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);