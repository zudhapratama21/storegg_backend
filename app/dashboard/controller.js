const Transaction  = require("../transaction/model");
const Voucher  = require("../voucher/model");
const Category  = require("../category/model");
const Player  = require("../player/model");



module.exports = {

    index :  async(req,res) => {
        try {
                       
            const transaction = await Transaction.countDocuments();
            const voucher = await Voucher.countDocuments();
            const category = await Category.countDocuments();
            const player = await Player.countDocuments();
            
            
            res.render('admin/dashboard/view_dashboard',{
                count : {
                    transaction,
                    voucher,
                    category,
                    player
                }
            });
            
         
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');

            res.redirect('/');
            
        }
    }
              
}