const express = require('express')

const router = express.Router()

//Ccontroller
const { register, login } = require('../controller/auth')
const { addProduct, changeProduct, delProduct, getDetailProduct, getProducts } = require('../controller/product')
const { addToping, getToppings, getDetailTopping, changeToping, deleteToping } = require('../controller/topping');
const { addTransaction, getTransaction, getDetailTransaction, deleteTransaction, myTransaction, 
    editsTransaction, deleteOneProductTransaction, addOneProductTransaction, 
    delOneProductTransactionById } = require('../controller/transaction');
    
const { getFixTransactions } = require('../controller/fix_transaction');


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
router.post('/transaction',addTransaction)
router.get('/transactions',getTransaction)
router.get('/transaction/:idtrans',getDetailTransaction)
router.delete('/transaction/:id',deleteTransaction);
router.get('/my-transaction/:id',myTransaction);
router.patch('/transaction/:id', editsTransaction)
router.delete('/deleteOneProductTransaction',deleteOneProductTransaction);
router.delete('/delOneProductTransactionById/:id',delOneProductTransactionById);
router.post('/addOneProductTransaction',addOneProductTransaction)
///////////////////////////////////////////////////////////

router.get('/fix_transactions', getFixTransactions)

router.post('/register', register)
router.post('/login', login)

module.exports = router