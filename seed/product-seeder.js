var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

var products = [
	new Product({
		imagePath : 'images/img.jpg',
		title : 'Puppy',
		description : 'Funny puppy',
		price : 1050
	})
];

var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save();
	done++;
	// if (products.length === done){
	// 	// exit();
	// }
}

function exit(){
	// mongoose.disconnect();
}