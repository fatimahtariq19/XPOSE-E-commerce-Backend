const { connectDB } = require('../config/db');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');


(async () => {
await connectDB();
await Category.deleteMany({});
await Subcategory.deleteMany({});


const men = await Category.create({ name: 'Men' });
const women = await Category.create({ name: 'Women' });


const menSubs = ['loafers','mocc','Peshawari','sandal','Oxford','slippers','man casual','man formal'];
const womenSubs = ['slip-on','sandal','court shoe','sling back','pumps','loafer','mule','sneakers','mocc','boots'];


await Subcategory.insertMany([
...menSubs.map((name) => ({ name, category: men._id })),
...womenSubs.map((name) => ({ name, category: women._id }))
]);


console.log('✅ Seeded categories & subcategories');
process.exit(0);
})();