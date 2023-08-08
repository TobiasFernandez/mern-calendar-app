const {Router}=require('express');
const router = Router();
const {crearUsuario,loginUsuer,revalidarToken}= require('../controllers/auth');
const { check } = require('express-validator');
const { validationsMiddleware } = require('../middleware/validation');
const { revalidaation } = require('../middleware/revalidationToken');

//host in api/auth
const cors= require('cors')

router.post('/',[
    check('name','the name is empty').not().isEmpty(),
    check('email','the format of the mail is incorrect').isEmail(),
    check('password','the password must have min 4 characters').isLength({min:4}),
  validationsMiddleware,
 

],crearUsuario);


router.post('/new',[
    check('email','the format of the mail is incorrect').isEmail(),
    check('password','the password must have min 4 characters').isLength({min:4}),
    validationsMiddleware,
 
],loginUsuer);


router.get('/renew',revalidaation,revalidarToken)

module.exports= router;
