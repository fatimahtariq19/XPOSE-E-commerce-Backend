// QueryBuilder.js

class QueryBuilder {
  constructor(query, qs) {
    this.query = query; // Mongoose query (e.g., Product.find())
    this.qs = { ...qs }; // Query string from req.query
  }

  filter() {
    const exclude = ['page', 'limit', 'sort', 'fields', 'keyword'];
    exclude.forEach((k) => delete this.qs[k]);

    // Advanced operators: price[gte]=, price[lte]= etc
    let qsStr = JSON.stringify(this.qs);
    qsStr = qsStr.replace(/\b(gte|gt|lte|lt|ne|in|nin)\b/g, (m) => `$${m}`);
    const mongoFilter = JSON.parse(qsStr);

    // Basic keyword search on name/slug
    if (typeof this.qs.keyword === 'string' && this.qs.keyword.trim()) {
      const kw = this.qs.keyword.trim();
      mongoFilter.$or = [
        { name: { $regex: kw, $options: 'i' } },
        { slug: { $regex: kw, $options: 'i' } }
      ];
    }

    this.query = this.query.find(mongoFilter);
    return this;
  }

  sort() {
    if (this.qs.sort) {
      const sortBy = this.qs.sort.split(',').join(' '); // e.g. 'price,-createdAt'
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this; // DSA: sorting handled by MongoDB indexes (O(log n) tree ops)
  }

  select() {
    if (this.qs.fields) {
      const fields = this.qs.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.qs.page, 10) || 1;
    const limit = Math.min(parseInt(this.qs.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this; // DSA: pagination uses skip/limit; for large data prefer keyset pagination
  }
}

module.exports = QueryBuilder;
