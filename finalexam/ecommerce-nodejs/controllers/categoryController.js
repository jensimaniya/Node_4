const Category = require('../models/Category');

exports.list = async (req, res) => {
  const categories = await Category.find();
  res.render('categoryList', { categories });
};

exports.create = async (req, res) => {
  const { name } = req.body;
  if(!name) return res.redirect('/categories');
  await Category.create({ name });
  res.redirect('/categories');
};

exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/categories');
};
