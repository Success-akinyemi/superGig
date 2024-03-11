import { Router } from 'express'
const privateRouter = Router()
import * as controller from '../controllers/adminRoutes.js'
import { AdminProtect, Protect } from '../middleware/auth.js';


privateRouter.route('/makeAdmin').post(Protect, AdminProtect, controller.makeAdmin); //make admin
privateRouter.route('/confirmPayment').post(Protect, AdminProtect, controller.confirmPayment); //cofirm payment order

privateRouter.route('/getAllPaymentOrder/:query').get(Protect, AdminProtect, controller.getAllPaymentOrder); //get all payment order
privateRouter.route('/getPaymentOrder').get(Protect, AdminProtect, controller.makeAdmin); //get all payment order



export default privateRouter