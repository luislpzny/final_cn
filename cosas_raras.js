
router.get('/products', async(req, res, next) => {
  const productos = await Productos.find();
  res.render('products',{productos});
});



router.post('/products', new LocalStrategy({
  titleField: 'nombre',
  priceField: 'precio',
  descriptionField: 'descripcion',
  passReqToCallback: true
}, async (req, nombre, precio, descripcion, done) => {

  //const producto = await Producto.findOne({'email': email});
 
    const newProductos = new Producto();
    newProductos.nombre = nombre;
    newProductos.precio = precio;
    newProductos.descripcion = descripcion;
    
    await newUser.save();
    done(null, newProductos);
   

 }));



router.post('/products',async(req,res)=>{

}, async (req, nombre, precio, descripcion, done) => {

  //const producto = await Producto.findOne({'email': email});
 
    const newProductos = new Producto();
    newProductos.nombre = nombre;
    newProductos.precio = precio;
    newProductos.descripcion = descripcion;
    
    await newProductos.save();
    done(null, newProductos);
  
});

router.post('/agregarproducto',async(req,res)=>{
    const productos = new Producto(req.body);
    
    /*
    newProductos.nombre = nombre;
    newProductos.precio = precio;
    newProductos.descripcion = descripcion; 
    */
  
    await productos.save();
    //done(null, newProductos);
    res.redirect('/products');
  
    /*
    const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      await newUser.save();
      done(null, newUser);
      */
  
  
  });