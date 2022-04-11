const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {

    index :  async(req,res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            
            const alert = {
                message : alertMessage,
                status : alertStatus
            }

            const payment = await Payment.find().populate('bank');
            
            console.log(payment);
            res.render('admin/payment/view_payment', {
                payment,
                alert
            })

        } catch (err) {
            
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/payment');         

        }
    },
    
    viewCreate : async(req,res) => {
        try {
            const banks = await Bank.find();

            
            res.render("admin/payment/create",{
                banks
            });
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/payment');
        }
    },

    actionCreate : async (req,res) => {
        try {
            const {type , bank} = req.body;
            let payment = await Payment({type , bank})            
            await payment.save();

            req.flash('alertMessage',"berhasil tambah Bank");
            req.flash('alertStatus',"success");

            res.redirect('/payment');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/payment');
        }
    }, 
    
    viewEdit : async (req,res)=>{
        try {
            const { id } = req.params;

            const payment = await Payment.findOne({ _id : id}).populate('bank');

            const banks = await Bank.find();
                        
            res.render('admin/payment/edit',{
                payment,
                banks
            });

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/nominal');
        }
    },

    actionEdit : async(req,res)=>{
        try {
            const { id } = req.params;
            const {type , bank} = req.body;

            req.flash('alertMessage',"berhasil ubah pembayaran");
            req.flash('alertStatus',"success");

            const payment = await Payment.findOneAndUpdate({
                _id : id
            },{type , bank});


            res.redirect('/payment');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/payment');
        }
    },
    actionDelete : async(req,res) => {
        try {
            const {id} = req.params;

            const payment = await Payment.findByIdAndRemove({
                _id : id
            });

            req.flash('alertMessage',"berhasil hapus Bank");
            req.flash('alertStatus',"success");

            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/payment');
        }
    },
    actionStatus : async (req , res) => {
        try {
            const {id} = req.params;
            const {status} = req.body;

            const payment = await Payment.findByIdAndUpdate({
                _id : id  
            },{
                status
            });

            req.flash('alertMessage',"berhasil activekan tipe pembayaran");
            req.flash('alertStatus',"success");

            res.redirect('/payment');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/payment');
        }
    }
    
}