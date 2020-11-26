var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//here we use the method insertMany()
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("food_list");
  var myobj = [
    { name: 'John', recipe: 'Highway 71'},
    { name: 'Peter', recipe: 'Lowstreet 4'},
    { name: 'Amy', recipe: 'Apple st 652'},
    { name: 'Hannah', recipe: 'Mountain 21'},
    { name: 'Michael', recipe: 'Valley 345'},
    { name: 'Sandy', recipe: 'Ocean blvd 2'},
    { name: 'Betty', recipe: 'Green Grass 1'},
    { name: 'Richard', recipe: 'Sky st 331'},
    { name: 'Susan', recipe: 'One way 98'},
    { name: 'Vicky', recipe: 'Yellow Garden 2'},
    { name: 'Ben', recipe: 'Park Lane 38'},
    { name: 'William', recipe: 'Central st 954'},
    { name: 'Chuck', recipe: 'Main Road 989'},
    { name: 'Viola', recipe: 'Sideway 1633'}
  ];
  dbo.collection("employee").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});