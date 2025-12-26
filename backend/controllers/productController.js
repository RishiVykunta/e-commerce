const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    const products = await Product.findAll({ category, search, page: parseInt(page), limit: parseInt(limit) });
    const total = await Product.count({ category, search });
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image_url } = req.body;

    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : image_url;

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image_url: imageUrl,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image_url } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (image_url || existingProduct.image_url);

    const product = await Product.update(req.params.id, {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price ? parseFloat(price) : existingProduct.price,
      category: category || existingProduct.category,
      stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
      image_url: imageUrl,
    });

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.delete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
