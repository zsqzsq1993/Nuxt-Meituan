import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  imgs: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  count: {
    type: Number,
    require: true
  }
})
export default mongoose.model('Order',schema)
