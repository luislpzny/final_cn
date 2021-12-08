const express = require('express');
const router = express.Router();
const passport = require('passport');

const Producto = require('../models/productos');

// llamar al index o pagina de inicio
router.get('/', (req, res, next) => {
  res.render('index');
});

//Llamar a la pagina de crear cuenta
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

//Madar datos de crear cuenta para que se verifiquen
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 

//llamar a pagina de iniciar sesion
router.get('/signin', (req, res, next) => {
  res.render('signin');
});

//manda los datos de inicio de sesion para verificar que sean correctos
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

//Sale de la sesion
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Agrega elementos a la coleccion productos
router.post('/agregarproducto',async(req,res)=>{
  const productos = new Producto(req.body);
  await productos.save();
  res.redirect('/products');

});

/*
//todos las rutas debajo estaran dentro de la seguridad de las sessions
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});
*/

//Accede a profile solo si estainiciado la secion
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

/*
router.get('/products',async(req,res)=>{
  const task = await Producto.find();
  //console.log(task);
  //res.send('mensaje de prueba desd nodeJS');
  res.render('products',{task});
});
*/

//Accede a productos solo si esta iniciado la secion
router.get('/products',isAuthenticated, async(req, res, next) => {
  const productos = await Producto.find();
  res.render('products',{productos});
});


router.get('/edit/:id',isAuthenticated,async(req,res, next)=>{
  const {id} = req.params;
  const productos = await Producto.findById(id);
  res.render('products',{productos});
});

router.post('/update/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Producto.update({_id:id},req.body);
  res.redirect('/products');
});

router.get('/delete/:id',isAuthenticated,async(req,res)=>{
  const {id}=req.params;
  await Producto.remove({_id:id});
  res.redirect('/products');
  //res.send('peticion de borraer recibida por GET');
});




function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;