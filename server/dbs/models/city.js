import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  province: {
    type: String,
    require: true
  }
})
export default mongoose.model('City',schema)
