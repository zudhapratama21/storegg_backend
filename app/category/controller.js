
module.exports = {

    index :  async(req,res) => {
        try {
            res.render('index' , {
                title : "zudha skuy"
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    
}