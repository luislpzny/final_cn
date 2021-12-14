
router.get('/hilos', async(req, res, next) => {
  const hilos = await hilos.find();
  res.render('hilos',{hilos});
});



router.post('/hilos', new LocalStrategy({
  titleField: 'nombre',
  priceField: 'precio',
  descriptionField: 'descripcion',
  passReqToCallback: true
}, async (req, nombre, precio, descripcion, done) => {

  //const producto = await Producto.findOne({'email': email});
 
    const newhilos = new Producto();
    newhilos.nombre = nombre;
    newhilos.precio = precio;
    newhilos.descripcion = descripcion;
    
    await newUser.save();
    done(null, newhilos);
   

 }));



router.post('/hilos',async(req,res)=>{

}, async (req, nombre, precio, descripcion, done) => {

  //const producto = await Producto.findOne({'email': email});
 
    const newhilos = new Producto();
    newhilos.nombre = nombre;
    newhilos.precio = precio;
    newhilos.descripcion = descripcion;
    
    await newhilos.save();
    done(null, newhilos);
  
});

router.post('/agregarproducto',async(req,res)=>{
    const hilos = new Producto(req.body);
    
    /*
    newhilos.nombre = nombre;
    newhilos.precio = precio;
    newhilos.descripcion = descripcion; 
    */
  
    await hilos.save();
    //done(null, newhilos);
    res.redirect('/hilos');
  
    /*
    const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      await newUser.save();
      done(null, newUser);
      */
  
  
  });