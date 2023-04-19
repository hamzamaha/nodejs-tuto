const connection = require('../config/db')



const getAllCategories = async (req,res)=>{
   

    try {
        const [result]= await connection.query('SELECT * FROM categories');
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }

}





const saveCategorie = async (req, res) => {
    let {label}=req.body

    try {
        const result= await connection.query('INSERT INTO categories (label) VALUES(?)',[label]);
        res.status(201).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const oneCategorie  = async (req,res)=>{

    const id = req.params.id

    try {
        const [result]= await connection.query('SELECT * FROM categories WHERE id = ?',[id]);
        if (result.length==0) {
            return res.status(404).json({
                message:"course not found"
            })
        }
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }

  


}

const putCategorie = async (req, res) => {
    let id =req.params.id
    let {label}=req.body

    if (label =='' ) {
        return res.status(400).send({
            message:"Bad request"
        })
    }

    try {
        
        const [result]= await connection.query('UPDATE categories SET label = ? WHERE id = ?',[label,id]);
       if (result.affectedRows==0  ) {
        return res.status(400).send({
            message:"Bad request"
        })
       }
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const patchCategorie = async (req, res) =>{
    let id =req.params.id
    let {label}=req.body

    try {
        
        const [result]= await connection.query('UPDATE categories SET label=IFNULL(?, label) WHERE id = ?',[label,id]);
       if (result.affectedRows==0  ) {
        return res.status(400).send({
            message:"Bad request"
        })
       }
        res.status(200).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const deleteCategorie = async(req, res) => {
    let id =req.params.id

    try {
        
        const [result]= await connection.query('DELETE FROM categories WHERE id = ?',[id]);

        res.status(204).send({})
       
        
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

exports.getAllCategories = getAllCategories
exports.oneCategorie = oneCategorie
exports.saveCategorie = saveCategorie
exports.putCategorie =putCategorie
exports.patchCategorie =patchCategorie
exports.deleteCategorie =deleteCategorie