const express = require('express');
const exphbs = require('express-handlebars');


const restaurants = require('./restaurant.json').results;
const app = express();

const port = 3000;

app.use(express.static('public'));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const restaurant = restaurants.find(item => item.id === +id);
  res.render('show', { pageTitle: restaurant.name, restaurant: restaurant })
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  // console.log(keyword)
  filterList = restaurants.filter(restaurant => restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()));
  // console.log(filterList)
  res.render('index', { pageTitle: 'index', isIndex: true, restaurants: filterList })

});

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'index', isIndex: true, restaurants: restaurants });
});


app.listen(port);