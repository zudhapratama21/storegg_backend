const Voucher = require('./model');
const Category = require("../category/model")
const Nominal = require("../nominal/model")
const path = require('path')
const fs = require('fs')
const config = require('../../config');


module.exports = {

    index :  async(req,res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            
            const alert = {
                message : alertMessage,
                status : alertStatus
            }

            const voucher = await Voucher.find()
            .populate('category')            
            .populate('nominals');       
                             

            res.render('admin/voucher/view_voucher', {
                voucher,
                alert

            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/voucher');            
        }
    },
    
    viewCreate : async(req,res) => {
        try {
            const category = await Category.find();
            const nominal = await Nominal.find();
            res.render("admin/voucher/create",
            {
                category,
                nominal
            });
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    },

    actionCreate : async (req,res) => {
        try {
            const { name, category, nominals } = req.body;
            

            if (req.file) {
                let tmp_path = req.file.path;

                // nama file
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;

                // save to public
                let target_path = path.resolve(config.rootPath,`public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on('end',async () => {
                    try {
                        const voucher = new Voucher({
                            name ,
                            category ,
                            nominal,
                            thumbnail : filename
                        });

                        await voucher.save();
                        req.flash('alertMessage',"berhasil tambah kategory");
                        req.flash('alertStatus',"success");

                        console.log(voucher);

                        res.redirect('/voucher');

                    } catch (err) {
                         req.flash('alertMessage',`${err.message}`);
                         req.flash('alertStatus','danger');
                        
                         res.redirect('/voucher');
                    }
                })

            }else{
                try {
                    const voucher = new Voucher({
                        name ,
                        category ,
                        nominal,                        
                    });

                    await voucher.save();
                    req.flash('alertMessage',"berhasil tambah kategory");
                    req.flash('alertStatus',"success");

                    res.redirect('/voucher');

                } catch (err) {
                     req.flash('alertMessage',`${err.message}`);
                     req.flash('alertStatus','danger');
                    
                     res.redirect('/voucher');
                }
            }         

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    },
    viewEdit : async (req,res)=>{
        try {

            const {id} = req.params;

            const category = await Category.find();
            const nominal = await Nominal.find();
            const voucher = await Voucher.findOne({_id : id})
            .populate('category')            
            .populate('nominals');
            
            res.render('admin/voucher/edit',{
                voucher,
                category,
                nominal
            });
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    },
    actionEdit : async(req,res)=>{
        try {

            const { id } = req.params;            
            const { name, category, nominal } = req.body;                        
                        

            if (req.file) {
                let tmp_path = req.file.path;

                // nama file
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;

                // save to public
                let target_path = path.resolve(config.rootPath,`public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on('end',async () => {
                    try {
                        const voucher = await Voucher.findOne({ _id : id});

                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }

                        console.log('sampe sini');

                        const data = await Voucher.findOneAndUpdate({
                            _id : id
                        } , {
                            name ,
                            category ,
                            nominal,
                            thumbnail : filename
                        });
                       
                        req.flash('alertMessage',"berhasil tambah kategory");
                        req.flash('alertStatus',"success");

                        console.log(voucher);

                        res.redirect('/voucher');

                    } catch (err) {
                         req.flash('alertMessage',`${err.message}`);
                         req.flash('alertStatus','danger');
                        
                         res.redirect('/voucher');
                    }
                })

            }else{
                try {

                    console.log('sampe situ');

                    const data = await Voucher.findByIdAndUpdate({
                        _id : id
                    },{
                        name ,
                        category,
                        nominal                        
                    });                    

                    req.flash('alertMessage',"berhasil ubah voucher");
                    req.flash('alertStatus',"success");

                    res.redirect('/voucher');

                } catch (err) {
                     req.flash('alertMessage',`${err.message}`);
                     req.flash('alertStatus','danger');
                    
                     res.redirect('/voucher');
                }
            }         

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    },
    actionDelete : async(req,res) => {
        try {
            const {id} = req.params;
            const voucher = await Voucher.findByIdAndRemove({
                _id : id
            });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            if (fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage);
            }


            req.flash('alertMessage',"berhasil hapus voucher");
            req.flash('alertStatus',"success");

            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    },

    actionStatus : async(req,res) =>{
        try {
            const { id } = req.params;
            const voucher = Voucher.findOne({
                _id : id
            });

            const { status } = req.body;

            console.log(status);

            
            let dataVoucher =  await Voucher.findOneAndUpdate({ _id : id },{
                status
            });

            console.log(dataVoucher);

            req.flash('alertMessage',"berhasil ubah status");
            req.flash('alertStatus',"success");

            res.redirect('/voucher');

        } catch (err) {
            req.flash('alertMessage',`${err.message}`);
            req.flash('alertStatus','danger');
            
            res.redirect('/voucher');
        }
    }
    
}
