const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

exports.listAll = async (req, res) => {
  const filter = {};
  if(req.query.category) filter.category = req.query.category;
  const products = await Product.find(filter).populate('category').populate('owner', 'username');
  const categories = await Category.find();
res.render("productList", {
    products,
    categories,
    query: req.query 
});

};

exports.showMy = async (req, res) => {
  const products = await Product.find({ owner: req.user._id }).populate('category');
  res.render('myProducts', { products });
};

exports.showCreate = async (req, res) => {
  const categories = await Category.find();
  res.render('productForm', { product: {}, categories, action: '/products' });
};

exports.create = async (req, res) => {
  const { name, description, price, category } = req.body;
  const product = new Product({ name, description, price, category, owner: req.user._id });
  await product.save();
  // add to user's products
  await User.findByIdAndUpdate(req.user._id, { $push: { products: product._id } });
  res.redirect('/products');
};

exports.showEdit = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = await Category.find();
  if(!product) return res.redirect('/products');
  // only owner or admin can edit
  if(String(product.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).send('Forbidden');
  res.render('productForm', { product, categories, action: '/products/'+product._id+'?_method=PUT' });
};

exports.update = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.redirect('/products');
  if(String(product.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403);
  const { name, description, price, category } = req.body;
  product.name = name; product.description = description; product.price = price; product.category = category;
  await product.save();
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.redirect('/products');
  if(String(product.owner) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403);
  await Product.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(product.owner, { $pull: { products: product._id }});
  res.redirect('/products');
};
