var express = require('express');
var router = express.Router();
var User = require('./../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录
router.post('/login',function(req,res,next){
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status:'0',
          msg:'',
          result:doc.userName
        })
      }
    }
  })
})
//登出
router.post('/logout',function(req,res,next){
  res.cookie("userName","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})
//登录状态检查
router.get('/checklogin',function(req,res,next){
  if(req.cookies.userName){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName||''
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})
//购物车列表
router.get('/cartlist',function(req,res,next){
  var userName = req.cookies.userName;
  User.findOne({"userName":userName},function(err,doc){//findOne中传入参数一定是一个对象
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})
//删除商品
router.post('/cartdel',function(req,res,next){
  var userName = req.cookies.userName,productId = req.body.productId;
  User.update({"userName":userName},{$pull:{
    'cartList':{
      'productId':productId
    }
  }},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})
//修改商品数量和选中状态
router.post('/cartedit',function(req,res,next){
  var userName = req.cookies.userName,
  productId = req.body.productId,
  productNum = req.body.productNum,
  checked = req.body.checked;
  User.update({"userName":userName,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})
//全部选中
router.post('/carteditall',function(req,res,next){
  var userName = req.cookies.userName,
  checkAll = req.body.checked?1:0;
  User.findOne({"userName":userName},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.cartList.forEach((item)=>{
          //对数据库的对象进行遍历
          item.checked = checkAll
        })
        doc.save(function(err1,doc1){
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            })
          }
        })
      }
    }
  })
})
//查询用户地址接口
router.get('/address',function(req,res,next){
  var userName = req.cookies.userName;
  User.findOne({"userName":userName},function(err,doc){//findOne中传入参数一定是一个对象
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.addressList
        })
      }
    }
  })
})
//设置默认地址
router.post('/setdefaultaddress',function(req,res,next){
  var userName = req.cookies.userName,
  addressId = req.body.addressId;
  User.findOne({'userName':userName},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.addressList.forEach((item)=>{
          if(item.addressId == addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        })
        doc.save(function(err1,doc1){
          if(err1){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            })
          }
        })
      }
    }
  })
})
module.exports = router;
