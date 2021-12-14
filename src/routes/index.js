const express = require('express');
const router = express.Router();
const passport = require('passport');

const Hilo = require('../models/hilos');
const Respuesta = require('../models/respuestas');

const Dicis = require('../models/dicisbd');
const RespuestaD = require('../models/respuestas');



/*
 *RENDERIZAR PAGINAS 
 */

//llamar al index o pagina de inicio sin iniciar secion
router.get('/', (req, res, next) => {
  res.render('index');
});

//Entrar a campus de la UG
router.get('/campus', (req, res, next) => {
  res.render('campus');
  
});

//prueba de paginas
router.get('/mainprofile', (req, res, next) => {
  res.render('mainprofile');
  
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

/*
 *PETICIONES 
 */

//Sale de la sesion
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Accede a profile solo si estainiciado la secion
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

/* DEM */
//Agrega elementos a la coleccion hilos
//Accede a hilos solo si esta iniciado la secion
router.get('/dem',isAuthenticated, async(req, res, next) => {
  const hilos = await Hilo.find();
  res.render('dem',{hilos});
});


router.post('/nuevohilo',async(req,res)=>{
  const hilos = new Hilo(req.body);
  await hilos.save();
  res.redirect('/dem');

});

router.post('/demrespuesta/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Hilo.insert({_id:id},req.body);
  res.redirect('/dem');
 
});

//Editar algun producto
router.get('/editDem/:id',isAuthenticated,async(req,res, next)=>{
  const {id} = req.params;
  const respuestas = await Respuesta.find();
  const hilos = await Hilo.findById(id);
  res.render('editarDEM',{hilos,respuestas});
});




//Acctualizar algun producto
router.post('/update/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Hilo.update({_id:id},req.body);
  res.redirect('/dem');
});
//Eliminar hilos
router.get('/delete/:id',isAuthenticated,async(req,res)=>{
  const {id}=req.params;
  await Hilo.remove({_id:id});
  res.redirect('/dem');
  //res.send('peticion de borraer recibida por GET');
});



/* DICIS */
//Agrega elementos a la coleccion hilos
//Accede a hilos solo si esta iniciado la secion
router.get('/dicis',isAuthenticated, async(req, res, next) => {
  const dicisbd = await Dicis.find();
  res.render('dicis',{dicisbd});
});

router.post('/nuevodicis',async(req,res)=>{
  const dicisbd = new Dicis(req.body);
  await dicisbd.save();
  res.redirect('/dicis');

});

router.post('/dicisrespuesta/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Dicis.insert({_id:id},req.body);
  res.redirect('/dicis');
 
});

//Editar algun producto
router.get('/editDicis/:id',isAuthenticated,async(req,res, next)=>{
  const {id} = req.params;
  const respuestasD = await RespuestaD.find();
  const dicisbd = await Dicis.findById(id);
  res.render('editDicis',{dicisbd,respuestasD});
});




//Acctualizar algun producto
router.post('/updateD/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Dcis.update({_id:id},req.body);
  res.redirect('/dicis');
});
//Eliminar hilos
router.get('/delete/:id',isAuthenticated,async(req,res)=>{
  const {id}=req.params;
  await Hilo.remove({_id:id});
  res.redirect('/dicis');
  //res.send('peticion de borraer recibida por GET');
});

router.post('/update/:id',isAuthenticated ,async(req,res, next)=>{
  const {id} = req.params;
  await Hilo.update({_id:id},req.body);
  res.redirect('/dicis');
});

//////////////Funciones de respuestas/////////////////
router.post('/nuevarespuesta',async(req,res)=>{
  const respuestas = new Respuesta(req.body);
  await respuestas.save();
  res.redirect('/dem');

});

router.post('/nuevarespuestaD',async(req,res)=>{
  const respuestasD = new RespuestaD(req.body);
  await respuestasD.save();
  res.redirect('/dicis');

});


///Funcion para verificar si se esta autenticado
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;