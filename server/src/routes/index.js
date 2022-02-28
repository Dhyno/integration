const express = require('express')

const router = express.Router()

//Ccontroller
const { register, login } = require('../controller/auth')
const { addProduct, changeProduct, delProduct, getDetailProduct, getProducts } = require('../controller/product')
const { addToping, getToppings, getDetailTopping, changeToping, deleteToping } = require('../controller/topping');
const { addTransaction, getTransaction, getDetailTransaction, deleteTransaction, myTransaction, 
        editsTransaction, deleteOneProductTransaction, addOneProductTransaction, 
        delOneProductTransactionById, getDetailTransactionByToken} = require('../controller/transaction');

const { getFixTransactions, addFixTransactions, changeFixTransaction, getDetailFixTransactions } = require('../controller/fix_transaction');
const { changeName, reloadProfile, changeImage } = require('../controller/user');
const { getRateStatus, getDetailRateStatus, employeeComment, addRateStatus, customerComment, getStatusByCondition } = require('../controller/rating_status');

const { testFunc } = require('../controller/test');

// import middleware here
const {uploadFile} = require('../middlewares/uploadFile')
const { auth } = require('../middlewares/auth');


router.post('/product',uploadFile("image"), addProduct)//add
router.patch('/product/:id',uploadFile("image"), changeProduct)
router.delete('/product/:id', delProduct)
router.get('/product/:id', getDetailProduct)
router.get('/products', getProducts)//show all

router.post('/topping', uploadFile("image"), addToping)
router.get('/toppings', getToppings)
router.get('/topping/:id', getDetailTopping)
router.patch('/topping/:id', uploadFile("image"), changeToping)
router.delete('/topping/:id', deleteToping)

//this for order from user or pre transaction
router.post('/transaction', auth, addTransaction)
router.get('/transactions',getTransaction)
router.get('/transaction/:id',getDetailTransaction)
router.delete('/transaction/:id',deleteTransaction);
router.get('/my-transaction/:id',myTransaction);
router.patch('/transaction/:id', editsTransaction)
router.delete('/deleteOneProductTransaction',deleteOneProductTransaction);
router.delete('/delOneProductTransactionById/:id',delOneProductTransactionById);
router.post('/addOneProductTransaction',addOneProductTransaction)
///////////////////////////////////////////////////////////

//for transaction after user pay order
router.get('/fix_transactions', getFixTransactions);//get all id transaction for admin
router.get('/my-fix_transaction',auth, getDetailFixTransactions)//get all user login transaction for user that curretn login
router.post('/fix_transaction',auth, uploadFile("attachment"), addFixTransactions);
router.patch('/fix_transaction/:id', changeFixTransaction);
////////////////////////////////////////

router.post('/register', register)
router.post('/login', login)

router.patch('/profileimage',auth ,uploadFile("image"), changeImage);//chang user image
router.patch('/profile',auth, changeName);//change user name
router.get('/profilereload',auth,reloadProfile)//to render in profile page when user change his/her data

//list of add route match with design fe
router.get('/transactionbytoken',auth,getDetailTransactionByToken)//to check if user have order before


router.get('/ratestatus', getRateStatus);
router.get('/ratestatus/:id',getDetailRateStatus)//when user get cancel status from admin and she/he want to know why. get by idtransaction
router.patch('/ratestatus/:id',employeeComment)//change employee message from admin/delivery
router.patch('/ratestatuses/:id', customerComment)//user give rate and comment when product has arrive or status is success
router.post('/ratestatus',addRateStatus)//add new row when admin give status is it cancel or approve
router.post('/ratestatuses', getStatusByCondition)//for get all status by condition body is it cancel,xuccess, etc




router.get('/test',auth, testFunc);


module.exports = router