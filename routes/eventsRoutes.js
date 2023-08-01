const {Router}=require('express');
const { check } = require('express-validator');
const { EventsValidator } = require('../middleware/ValidationEvents');
const { ReadEvents, CreateEvent, UpdateEvent, DelatevEvent } = require('../controllers/events');
const { revalidaation } = require('../middleware/revalidationToken');
const { validationsMiddleware } = require('../middleware/validation');
const { validateDate } = require('../helpers/validateDate');
const router = Router();

//api/events
router.get("/read",[
    check('msg','el mensaje esta vacio').not().isEmpty(),
    validationsMiddleware,
    revalidaation
],ReadEvents),


router.post("/create",[
    check('msg',).not().isEmpty(),
    check("start","la fecha de inicio no es valida").custom(validateDate),
    check("end","la fecha de finalizacion no es valida").custom(validateDate),
    validationsMiddleware,
    revalidaation

],CreateEvent)

router.put("/:id",[
    check('msg').not().isEmpty(),
    validationsMiddleware,
    revalidaation
   

],UpdateEvent)

router.delete("/:id",[
    check('msg').notEmpty(),
    validationsMiddleware,
    revalidaation

],DelatevEvent);


module.exports = router;