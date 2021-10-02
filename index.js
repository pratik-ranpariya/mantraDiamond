var express = require('express'),
ejs = require('ejs'),
path = require('path'),
bodyParser = require('body-parser'),
fileUpload = require('express-fileupload'),
url = "mongodb://localhost:27017",
// dbName = 'mantradiamond',
dbName="jewellery",
MongoClient = require('mongodb').MongoClient,
objectId = require('mongodb').ObjectID,
// numberDecimal = require('mongodb').NumberDecimal,
session = require('express-session'),
assets = require('assert'),
http = require('http'),
app = express(),
helmet = require('helmet'),
port = '3000';

var BaseUrl = "http://localhost:"+port;
// console.log(BaseUrl)

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//path of website........
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, 'views')));

app.use(helmet());

app.use(fileUpload());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var server = app.listen(port, () => {
    console.log("We Are Live On " + port)
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    secret: 'fsd84h507JKNJ9hg8&jndas*(jnjzcz',
    resave: true,
    saveUninitialized: true
  }));

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assets.equal(null, err);
    if (err) throw err;
    // console.log(err)
    const db = client.db(dbName);
    console.log("mongodb is connected with database =", dbName)

    function responseData(file, data, res) {  
        data['BaseUrl'] = BaseUrl;
        // data['active'] = typeof sess.active != 'undefined' ? sess.active : 'dashboard';
        res.render(file, data);
      }


    app.get('/', (req, res) => {
        sess ='';
      // sess.active = 'des';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

      db.collection("category").aggregate(aggregate).toArray((err, result) => { 
        db.collection('banner').find({}).toArray((err, result2) => {
          db.collection('product').find({tselling: 'checked'}).toArray((err, result3) => {
            db.collection('product').find({lcollection: 'checked'}).toArray((err, result4) => {
              db.collection('product').find({}).sort({ _id: -1 }).limit(10).toArray((err, result5) => {
                db.collection('poster').find({}).toArray((err, result6) => {

                  data = {
                    data1: result,
                    banner:result2,
                    tselling: result3,
                    lcollection: result4,
                    lproduct: result5,
                    poster: result6
                  }

                  // console.log(data)
                  responseData('jewellery/index.html', data, res)
                  // res.send(data);
                })
              })
            })
          })
        })
      })
    })

    app.get('/index', (req, res) => {
      sess ='';
      // sess.active = 'des';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

      db.collection("category").aggregate(aggregate).toArray((err, result) => { 
        db.collection('banner').find({}).toArray((err, result2) => {
          db.collection('product').find({tselling: 'checked'}).toArray((err, result3) => {
            db.collection('product').find({lcollection: 'checked'}).toArray((err, result4) => {
              db.collection('product').find({}).sort({ _id: -1 }).limit(10).toArray((err, result5) => {
                db.collection('poster').find({}).toArray((err, result6) => {

                  data = {
                    data1: result,
                    banner:result2,
                    tselling: result3,
                    lcollection: result4,
                    lproduct: result5,
                    poster: result6
                  }

                  // console.log(data)
                  responseData('jewellery/index.html', data, res)
                  // res.send(data);
                })
              })
            })
          })
        })
      })
    })


    app.get('/contactus', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/contact.html', data, res)
        })

    })

    app.get('/about-mantradiamond', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/about-mantradiamond.html', data, res)
        })

    })

    app.get('/privacypolicy', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/privacypolicy.html', data, res)
        })

    })

    app.get('/termsandconditions', (req, res) => {
      sess = '';
      aggregate = [
        {
          $lookup: {
            from: 'subcategory',
            localField: 'name',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection("category").aggregate(aggregate).toArray((err, result) => { 
          data = {
            data1 : result
          }
          responseData('jewellery/termsandconditions.html', data, res)
        })

    })



    app.get('/admin', (req, res) => {
      // sess.active = 'Deshboard';
      // console.log(sess)
        responseData('adminPanel/index.html', {
            msg: '',
            msgs: '',
            error: true
        }, res);
    })

    app.post('/addbanner', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {
      
        var file = req.files.uploaded_image;
        var img_name = Date.now() + '_' + file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/PNG" ) {

          file.mv('views/jewellery/image/' + img_name, function (err) {
            if (err)
              return res.status(500).send(err);

            var item = {
              image: img_name,
              date: new Date()
            };
            db.collection('banner').insert(item, function (err, result2) {
              res.redirect('/banner');
            })
          })
        }
      } else {
      res.redirect('/admin');
    }
    })


    app.post('/addposter', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {
      
        var file = req.files.uploaded_image;
        var img_name = Date.now() + '_' + file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/PNG" ) {

          file.mv('views/jewellery/image/' + img_name, function (err) {
            if (err)
              return res.status(500).send(err);

            var item = {
              image: img_name,
              date: new Date()
            };
            db.collection('poster').insert(item, function (err, result2) {
              res.redirect('/banner');
            })
          })
        }
      } else {
      res.redirect('/admin');
    }
    })

    app.get('/banner', (req, res) => {
      sess = req.session;
      // sess.active = 'banner';

      if (typeof sess.email != 'undefined') {

        db.collection('banner').find({}).toArray((err, result) =>{
          db.collection('poster').find({}).toArray((err, result1) =>{
            console.log('banner data available', result);

            var data = {
              data1: result1,
              data: result
            }

            responseData('adminPanel/banner.html', data, res)
          })
        })

      } else {
        res.redirect('/admin');
      }
    })

    app.post('/login', (req, res) => {
        sess = req.session;
        // sess.active = 'product';
        
        var email = req.body.email;
        var password = req.body.password;
    
        // console.log('  :: ' + sess)
        if (email && password) {
          db.collection("login").findOne({ email: email, password: password }, function (err, result) {
           
          if (err) {
              console.log(err);
          } 
            else if (result) {
              sess.email = req.body.email;
              // console.log(sess.email);
  
              res.redirect('/product/1');
            }
            else {
              responseData('adminPanel/index.html', {
                msg: 'email and password not metch',
                msgs: '',
                error: true
              }, res);
            }
            res.end();
          });
        }
        else {
          responseData('adminPanel/index.html', {
            msg: '',
            msgs: 'Please Enter Email And Password',
            error: true
          }, res);
          res.end();
        }
    });

  app.get('/category/:name/:page', (req, res) => {
    console.log('yes data arrive here')
    // sess.active = 'dashboard';
    var perPage = 12;
    var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
    var skip = (perPage * page) - perPage;
    var limit = "LIMIT " + skip + ", " + perPage;

          aggregate = [{
            $lookup: {
              from: 'subcategory',
              localField: 'name',
              foreignField: 'category',
              as: 'item',
            }
          }];

      db.collection("category").aggregate(aggregate).toArray((err, result3) => { 
   
      db.collection('category').findOne({name: req.params.name}, (err, result2) => {
        // console.log(result2._id, 'hh')
        // console.log(result2.name)
        
        var cID=(result2.name).toString()
        db.collection('product').countDocuments({ category: cID }, (err, userCount) => {
          console.log(userCount)
          if(skip >= userCount){
            return res.redirect('/index');
          }
        db.collection('product').find({ category: cID }).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
          // console.log(result)
          data = {
            data1: result3,
            data: result
          }

          // console.log(result2.name)
          // console.log(result[0].category)
          data['categorys'] = result[0].category;
          data['categoryName'] = result2.name;
          data['search'] = {};
          data['current'] = page;
          data['pages'] = Math.ceil(userCount / perPage);
          responseData('jewellery/product.html', data, res)
        })
        })
      })
    })
  })


    app.get('/scategory/:name/:page', (req, res) => {
    console.log('yes data arrive here')
    // sess.active = 'dashboard';
    var perPage = 12;
    var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
    var skip = (perPage * page) - perPage;
    var limit = "LIMIT " + skip + ", " + perPage;

    aggregate = [{
            $lookup: {
              from: 'subcategory',
              localField: 'name',
              foreignField: 'category',
              as: 'item',
            }
          }];

      db.collection("category").aggregate(aggregate).toArray((err, result3) => { 
   
      db.collection('subcategory').findOne({name: req.params.name}, (err, result2) => {
        // console.log(result2._id, 'hh')
        // console.log(result2.name)
        
        var cID=(result2._id).toString()

        db.collection('product').countDocuments({ subcategory: cID }, (err, userCount) => {
          console.log(userCount)
          if(skip >= userCount){
            return res.redirect('/index');
          }
        db.collection('product').find({ subcategory: cID }).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
          // console.log(result)
          data = {
            data1: result3,
            data: result
          }

          // console.log(result2.name)
          // console.log(result[0].category)
          data['categorys'] = result[0].category;
          data['categoryName'] = result2.name;
          data['search'] = {};
          data['current'] = page;
          data['pages'] = Math.ceil(userCount / perPage);
          responseData('jewellery/product.html', data, res)
        })
        })
      })
    })
  })

    app.get('/products/:_id', (req, res) => {
      sess = '';
      // sess.active = 'dashboard';
      console.log('s');
      aggregate = [{
            $lookup: {
              from: 'subcategory',
              localField: 'name',
              foreignField: 'category',
              as: 'item',
            }
          }];

      db.collection("category").aggregate(aggregate).toArray((err, result3) => { 
        db.collection('product').findOne({_id: objectId(req.params._id)}, (err, result2) => {
          console.log(result2, 'hh')
          if(!(result2)){
            return res.redirect('/index');
          }
          var cID=(result2.category).toString()
          db.collection('product').find({'category': cID}).sort({date: -1 }).toArray((err, result) => {
            console.log(result,'s')
              var h =[];
              for(var i = 0; i < result.length; i++){
                if(req.params._id != result[i]._id){
                  if(i <= 8){
                    var data = {
                      _id: result[i]._id,
                      name: result[i].name,
                      price: result[i].price,
                      category: result[i].category,
                      position: result[i].position,
                      image: result[i].image,
                      date: result[i].date
                    }
                    h.push(data)
                  }
                }
              }
            data = {
              data1: result3,
              data2: result2,
              data: h
            }
            // res.send(data)
            responseData('jewellery/inquiry.html', data, res)
          })
        })
      })
    })

    app.post('/addinquiry', (req, res) => {
      var data = req.body;
      var item = {
        contactname : data.contactname,
        mobile: data.mobile,
        id: data.id,
        name: data.name,
        price: data.price,
        category: data.category,
        image: data.image,
        date: new Date()
      };
      // console.log(data)
      db.collection('inquiry').insertOne(item, function (err, result2) {
        res.redirect('/index');
      })
    })

    app.get('/inquiry/:page', (req, res) => {
     
      sess = req.session;
      // sess.active = 'inquiry';
      if(typeof sess.email != 'undefined'){
        var perPage = 10;
        var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
        var skip = (perPage * page) - perPage;
        var limit = "LIMIT " + skip + ", " + perPage;
        db.collection('inquiry').countDocuments((err, userCount) => {
            // console.log(result2)
          db.collection('inquiry').find({}).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
           
            console.log(result)
            data = {
              data: result
            }
            data['search'] = {};
            data['current'] = page;
            data['pages'] = Math.ceil(userCount / perPage);

          responseData('adminPanel/inquiry.html',data, res)
          
        })
      })
      }else{
        res.redirect('/admin');
      }
    })

    app.post('/deleteinquiry/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("inquiry").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        console.log("id deleted succeessfully")
        res.redirect('/inquiry/1')
      })
    }else{
      res.redirect('/admin');
    }
    })

    app.get('/product/:page', (req, res) => {
     
      sess = req.session;
      // sess.active = 'product';
      if(typeof sess.email != 'undefined'){
        var perPage = 10;
        var page = (typeof req.params.page != 'undefined') ? (req.params.page == 0) ? 1 : req.params.page || 1 : 1;
        var skip = (perPage * page) - perPage;
        var limit = "LIMIT " + skip + ", " + perPage;
        db.collection('product').countDocuments((err, userCount) => {
          db.collection('category').find({}).toArray((err, result2) => {
            db.collection('subcategory').find({}).toArray((err, result3) => {
            // console.log(result2)
              db.collection('product').find({}).sort({ _id: -1 }).skip(skip).limit(perPage).toArray((err, result) => {
            var a = [];
            for(var j = 0; j < result.length; j++){
              for(var i = 0; i < result2.length; i++){
                for(var k = 0; k < result3.length; k++){
                  if(result2[i].name == result[j].category && result3[k]._id == result[j].subcategory){
                    var data = {
                      _id: result[j]._id,
                      categoryName: result2[i].name,
                      subcategoryName: result3[k].name,
                      tselling: result[j].tselling,
                      lcollection: result[j].lcollection,
                      description: result[j].description,
                      name: result[j].name,
                      price: result[j].price,
                      image: result[j].image,
                      position: result[j].position,
                    }
                    a.push(data)
                  }
                }
              }
            }
            // console.log(a)
            data = {
              data: a
            }
            data['search'] = {};
            data['current'] = page;
            data['pages'] = Math.ceil(userCount / perPage);

          responseData('adminPanel/product.html',data, res)
          // res.send(data)
          })
        })
        })
      })
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/addProduct', (req, res) => {
      sess = req.session;
      // sess.active = 'addproduct';

      if(typeof sess.email != 'undefined'){

        db.collection('category').find({}).toArray((err, result) => {
          db.collection('pcategory').find({}).toArray((err, result2) => {

            var data = {
            data: result,
            data2: result2
          }
          responseData('adminPanel/addproduct.html', data, res)

          })
        })
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/pricerise', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        db.collection('pcategory').find({}).toArray((err, result) => {
          // db.collection('pccategory').find({}).toArray((err, result2) => {

            var data = {
            data: result,
            // data2: result2
          }
          responseData('adminPanel/price.html', data, res)

          // })
        })
      }else{
        res.redirect('/admin');
      }
    })

    app.get('/editproduct/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection('category').find({}).toArray((err, result1) => {
          db.collection('product').findOne({_id: objectId(req.params._id)}, (err, result3) => {
            db.collection('category').findOne({name: result3.category}, (err, result2) => {
              db.collection('subcategory').findOne({_id: objectId(result3.subcategory)}, (err, result4) => {
                db.collection('subcategory').find({category: result4.category}).toArray((err, result5) => {
                  // console.log(result2)
                  data = {
                    data: result3,
                    data1: result1,
                    data2: result2,
                    data3: result4,
                    data4: result5,
                    error: true
                  }
                  // responseData('adminPanel/editproduct.html', data, {
                  //   msg1: '',
                  //   error: true
                  // }, res)
                  responseData('adminPanel/editproduct.html', data, res);
                  res.end()
                })
              })
            })
          })
        })
      }else{
        res.redirect('/admin');
      }
    })


    app.get('/editcategory/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection('category').findOne({_id: objectId(req.params._id)}, (err, result1) => {
          // console.log(result2)
          data = {
            data: result1,
            error: true
          }
          // responseData('adminPanel/editproduct.html', data, {
          //   msg1: '',
          //   error: true
          // }, res)
          responseData('adminPanel/editcategory.html', data, res);
          res.end()
        })
      }else{
        res.redirect('/admin');
      }
    })

    app.post('/deleteproduct/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("product").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        console.log("id deleted succeessfully")
        res.redirect('/product/1')
      })
    }else{
      res.redirect('/admin');
    }
    })



    app.post('/tselling/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("product").findOne({ _id: objectId(req.params._id) }, (err, result) => {
          if(result.tselling == 'checked'){
            var item = {
              tselling: '0',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }else{
            var item = {
              tselling: 'checked',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }
        })
      }else{
        res.redirect('/admin');
      }
    })


    app.post('/lcollection/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("product").findOne({ _id: objectId(req.params._id) }, (err, result) => {
          if(result.lcollection == 'checked'){
            var item = {
              lcollection: '0',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }else{
            var item = {
              lcollection: 'checked',
            };
            db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item })
          }
        })
      }else{
        res.redirect('/admin');
      }
    })




    app.post('/deletebanner/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("banner").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        // console.log("id deleted succeessfully")
        res.redirect('/banner')
      })
      }else{
        res.redirect('/admin');
      }
    })

    app.post('/deleteposter/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
        db.collection("poster").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        // console.log("id deleted succeessfully")
        res.redirect('/banner')
      })
      }else{
        res.redirect('/admin');
      }
    })

    app.post('/deletecategory/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("category").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        console.log("id deleted succeessfully")
        res.redirect('/category')
      })
    }else{
      res.redirect('/admin');
    }
    })


    app.post('/deletesubcategory/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("subcategory").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        console.log("id deleted succeessfully")
        res.redirect('/category')
      })
    }else{
      res.redirect('/admin');
    }
    })

    app.post('/deletepccategory/:_id', (req, res) => {
      sess = req.session
      if(typeof sess.email != 'undefined'){
      db.collection("pccategory").deleteOne({ _id: objectId(req.params._id) }, (err, rows) => {
        console.log("id deleted succeessfully")
        res.redirect('/category')
      })
    }else{
      res.redirect('/admin');
    }
    })

    // app.get('/category', (req, res) => {
    //   sess = req.session;
    //   sess.active = 'category';

    //   if(typeof sess.email != 'undefined'){
    //     db.collection("category").find({}).toArray((err, result) => {
    //       // console.log(result)
    //       // var data = {
    //       //   data: result
    //       // }

    //       // responseData('adminPanel/category.html', data, res)
    //       responseData('adminPanel/category.html', {
    //         msg1: '',
    //         data: result,
    //         error: true
    //       }, res)
    //     })
        
    //   }else{
    //     res.redirect('/admin');
    //   }
    // })

    app.get('/getcategory', (req, res) => {
      db.collection("category").find({}).toArray((err, result) => { 
        res.send(result)
      })
    })

    app.get('/getsubcategory/:_id', (req, res) => {
      db.collection("subcategory").find({category: req.params._id}).toArray((err, result) => { 
        res.send(result)
      })
    })

    app.get('/getpccategory/:_id', (req, res) => {
      db.collection("pccategory").find({pcategory: req.params._id}).toArray((err, result) => { 
        res.send(result)
      })
    })


    app.get('/category', (req, res) => {
      sess = req.session;

      // if(typeof sess.email != 'undefined'){

        aggregate = [{
          $lookup: {
            from: 'pccategory',
            localField: 'name',
            foreignField: 'pcategory',
            as: 'item',
          }
        }];

        category = [{
          $lookup: {
            from: 'subcategory',
            localField: '_id',
            foreignField: 'category',
            as: 'item',
          }
        }];

        db.collection('category').find({}).toArray((err, result2) => {
          db.collection('subcategory').find({}).toArray((err, result3) => {

            // var a = []; var b = []; var c = [];
            // for(var i = 0; i < result2.length; i++){
              
            //   console.log(result2[i].name);
            //   for(var j = 0; j < result3.length; j++){
            //     console.log(result3[j].name);
            //     if(result2[i].name == result[j].category){
            //     var data = {
            //         _id: result[j]._id,
            //         categoryName: result2[i].name,
            //         name: result[j].name,
            //         price: result[j].price,
            //         image: result[j].image,
            //         position: result[j].position,

            //       }
            //       a.push(data)
            //     }
            //   }
            // }

            // var a = []; var b = [];
            // for(var j = 0; j < result2.length; j++){
            //   var datas = {
            //         _id: result2[j]._id,
            //         name: result2[j].name,
            //     }
            //     b.push(datas)
            //   for(var i = 0; i < result3.length; i++){
            //     if(result2[j].name == result3[i].category){
            //        var data = {
            //         _id: result3[i]._id,
            //         categoryName: result3[i].name,
            //         // name: result3[j].name,
            //         item: b
            //       }
            //       a.push(data)
            //     }
                
            //   }
            // }
            
            var a = []; var b = [];
            for(var i = 0; i < result2.length; i++){
              var data = {
                    _id: result2[i]._id,
                    categoryName: result2[i].name,
                    // name: result3[j].name,
                    item: b
                  }
                  a.push(data)
                  
            for(var j = 0; j < result3.length; j++){
              
                if(result2[i].name == result3[j].category){
                  var datas = {
                    // _ida: result2[i]._id,
                    _id: result3[j]._id,
                    name: result3[j].name,
                    category: result3[j].category
                  }
                  b.push(datas)
                }

              }
    
            }





        db.collection("pcategory").aggregate(aggregate).toArray((err, result1) => {
          db.collection("category").aggregate(category).toArray((err, result) => { 

            data = {
              // msg1: '',
              data1: result,
              data2: result1,
              data3: a,
              error: true
            }

          // responseData('adminPanel/subcategory.html', data, res)
          res.send(data)
            })
        })
        })
        })
      // }else{
      //   res.redirect('/admin');
      // }
    })

    app.post('/insertcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          // console.log(data)
          var file = req.files.uploaded_image;
          var img_name = Date.now() + '_' + file.name;

          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif") {

            file.mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err);

          insertData = {
            name: data.name,
            image: img_name,
            date: new Date()
          }
          db.collection('category').find({name: data.name}).toArray((err, result) => {
            db.collection("category").find({}).toArray((err, result1) => {

            // console.log('d', result.length)

            if(result.length > 0){

              responseData('adminPanel/category.html', {
                msg1: 'Category already Available',
                data: result1,
                error: true
              }, res)

            }else{

              db.collection("category").insert(insertData)
              res.redirect('/category');

            }
            

          })
        })
        })
          }
      } else {
      res.redirect('/admin');
      }
    })


    app.post('/insertsubcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          // console.log(data)
          insertData = {
            category: data.category,
            name: data.name,
            date: new Date()
          }

          db.collection("subcategory").insert(insertData)
          res.redirect('/category');

        } else {
          res.redirect('/admin');
        }
      })

    app.post('/insertpcategory', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          console.table(data)

          insertData = {
            name: data.name,
            pcategory: data.pcategory,
            date: new Date()
          }
          
          db.collection("pccategory").insertOne(insertData)
          res.redirect('/category');
          
        } else {
          res.redirect('/admin');
        }
      })


    app.post('/addbudget', (req, res) => {
      sess = req.session;

      if(typeof sess.email != 'undefined'){

        var data = req.body;
          console.table(data)

          insertData = {
            name: data.name,
            date: new Date()
          }
          
          db.collection("pcategory").insertOne(insertData)
          res.redirect('/category');
          
        } else {
          res.redirect('/admin');
        }
      })

    app.post('/insertproduct', (req, res) => {
      sess = req.session;

      if (typeof sess.email != 'undefined') {
      
          var data = req.body;
          console.table(data);
          var file = req.files.uploaded_image;
          var img_name = Date.now() + '_' + file.name;

          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif") {

            file.mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err);

              var item = {
                name: data.name,
                price: JSON.parse(data.price),
                category: data.category,
                subcategory: data.subcategory,
                pcategory: data.pcategory,
                pccategory: data.pccategory,
                tselling:'0',
                lcollection:'0',
                image: img_name,
                description: data.description,
                date: new Date(),
              };
              db.collection('product').insert(item, function (err, result2) {
                res.redirect('/addProduct');
              })
            })
          }
        } else {
        res.redirect('/admin');
      }
    })


    app.post('/priceupdown', (req, res) => {
      sess = req.session;

      if (typeof sess.email != 'undefined') {
        
        var data = req.body;

        if('+' == data.price){

          var query = { pccategory: req.body.pccategory};
          var data = { $inc: { price: +req.body.amount }}

          db.collection('product').updateMany(query, data, function (err, result2) {
            res.redirect('/pricerise')
          })

        }else if('-' == data.price){
          var query = { pccategory: req.body.pccategory};
          var data = { $inc: { price: -req.body.amount }}

          db.collection('product').updateMany(query, data, function (err, result2) {
            res.redirect('/pricerise')
          })

        }
        
      } else {
        res.redirect('/admin');
      }
    })


    app.post('/editproductimage/:_id', (req, res) => {
      sess = req.session;

      if (typeof sess.email != 'undefined') {
          var file = req.files.uploaded_image;
          var img_name = Date.now() + '_' + file.name;
          if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            file.mv('views/jewellery/image/' + img_name, function (err) {
              if (err)
                return res.status(500).send(err);
              var item = {
                image: img_name,
                date: new Date()
              };
              db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result2) {
                res.redirect('/Product/1');
              })
            })
          }
        } else {
        res.redirect('/admin');
      }
    })

  app.post('/editproduct/:_id', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {
      var data = req.body;
      var item = {
        name: data.name,
        price: JSON.parse(data.price),
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        date: new Date(),
      };
        db.collection('product').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result20) {
          res.redirect('/product/1');
        })
    } else {
      res.redirect('/admin');
    }
  })


    app.post('/editcategory/:_id', (req, res) => {
    sess = req.session;

    if (typeof sess.email != 'undefined') {
      var data = req.body;
      var item = {
        name: data.name,
        date: new Date(),
      };
        db.collection('category').updateOne({ _id: objectId(req.params._id) }, { $set: item }, function (err, result20) {
          res.redirect('/category');
        })
    } else {
      res.redirect('/admin');
    }
  })


    app.get('/logout', (req, res) => {
      req.session.destroy(function (err) {
        console.log(err);
        res.redirect('/admin');
      })
    })

    app.use(function (req, res) {
        res.send('<style>*{transition:all .6s}html{height:100%}body{font-family:Lato,sans-serif;color:#888;margin:0}#main{display:table;width:100%;height:100vh;text-align:center}.fof{display:table-cell;vertical-align:middle}.fof h1{font-size:50px;display:inline-block;padding-right:12px;animation:type .5s alternate infinite}@keyframes type{from{box-shadow:inset -3px 0 0 #888}to{box-shadow:inset -3px 0 0 transparent}}</style><div id="main"><div class="fof"><h1>Error 404, Page Not Found</h1></div></div>')
    })

})