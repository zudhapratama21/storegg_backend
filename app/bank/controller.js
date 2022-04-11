const Bank = require('./model');

module.exports = {

    index :  async(req,res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            
            const alert = {
                message : alertMessage,
                status : alertStatus
            }

            const bank = await Bank.find();
            
            res.render('admin/bank/view_bank', {
                bank,
                alert
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');

            res.redirect('/bank');
            
        }
    },
    
    viewCreate : async(req,res) => {
        try {
            res.render("admin/bank/create");
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/bank');
        }
    },

    actionCreate : async (req,res) => {
        try {
            const {name , nameBank, noRekening} = req.body;
            let bank = await Bank({name , nameBank, noRekening})            
            await bank.save();

            req.flash('alertMessage',"berhasil tambah Bank");
            req.flash('alertStatus',"success");

            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/bank');
        }
    }, 
    
    viewEdit : async (req,res)=>{
        try {
            const { id } = req.params;

            const bank = await Bank.findOne({_id : id});
            res.render('admin/bank/edit',{
                bank
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
            const {name , nameBank, noRekening} = req.body;

            req.flash('alertMessage',"berhasil ubah nominal");
            req.flash('alertStatus',"success");

            const bank = await Bank.findOneAndUpdate({
                _id : id
            },{name , nameBank, noRekening});


            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/bank');
        }
    },
    actionDelete : async(req,res) => {
        try {
            const {id} = req.params;

            const bank = await Bank.findByIdAndRemove({
                _id : id
            });

            req.flash('alertMessage',"berhasil hapus Bank");
            req.flash('alertStatus',"success");

            res.redirect('/bank');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/bank');
        }
    }
    
}