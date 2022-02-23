const express = require('express')

const router = express.Router()

//Ccontroller
const { register, login } = require('../controller/auth')
const { addProduct, changeProduct, delProduct, getDetailProduct, getProducts } = require('../controller/product')
const { addToping, getToppings, getDetailTopping, changeToping, deleteToping } = require('../controller/topping');
const { addTransaction, getTransaction, getDetailTransaction, deleteTransaction, myTransaction, 
    editsTransaction, deleteOneProductTransaction, addOneProductTransaction, 
    delOneProductTransactionById, 
    getDetailTransactionByToken} = require('../controller/transaction');

const { getFixTransactions, addFixTransactions, changeFixTransaction } = require('../controller/fix_transaction');

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
router.get('/fix_transactions', getFixTransactions);
router.post('/fix_transaction', uploadFile("attachment"), addFixTransactions);
router.patch('/fix_transaction/:id', changeFixTransaction);
////////////////////////////////////////

router.post('/register', register)
router.post('/login', login)

//list of add route match with design fe
router.get('/transactionbytoken',auth,getDetailTransactionByToken)

router.get('/test',auth, testFunc);


module.exports = router