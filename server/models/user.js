var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "OrderList":Array,
  "cartList":[{
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
    "checked":Number,
    "productNum":Number,
  }],
  "addressList":[
    {
      "addressId":String,
      "userName":String,
      "streetName":String,
      "postCode":String,
      "tel":String,
      "isDefault":Boolean
    }
  ]
})
module.exports = mongoose.model("User", userSchema)