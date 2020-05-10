import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  detail: {
    type: Object,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  }
})

export default mongoose.model('cart',schema)
