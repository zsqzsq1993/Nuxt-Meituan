import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  menu: {
    type: Array,
    require: true
  }
})

export default mongoose.model('Menu',schema)
