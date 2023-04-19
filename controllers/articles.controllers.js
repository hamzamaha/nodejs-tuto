const connection = require('../config/db')
const Joi = require('joi');



const getAllArticles = async (req,res)=>{

    try {
        const [result]= await connection.query('SELECT * FROM articles');
        // res.status(200).json(result)
        res.render('index.ejs',{articles:result})
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }

}

const createArticle = async(req,res)=>{
    let path=null;
    let message=null;
    let value = {
        title:'',
        description:'',
        url:'',

    }
    const [category]= await connection.query('SELECT * FROM categories');
    res.render('article/create.ejs',{
        value,
        error:{
            message,
            path
        },category
    })

}




const saveArticle = async (req, res) => {
//   const schema =  Joi.object({
//         title:Joi.string().uppercase().trim().min(3).max(70).required(),
//         // url:Joi.string().trim().required(),
//         description:Joi.string().trim().min(3).required(),
//         category_id:Joi.number().integer().positive().required(),
//     })
//  const {value,error}= schema.validate(req.body)

//     if (error) {
//         const{path,message}=error.details[0];
//         return res.render('article/create',{
//             value,
//             error:{
//                 path:path[0],message
//             }
//          })
//     }

    let {title,description,category_id}=req.body
    let url= req.file ? req.file.filename : undefined;

    try {
        const result= await connection.query('INSERT INTO articles (title,url,description,category_id) VALUES(?,?,?,?)',[title,url,description,category_id]);
        // res.status(201).send(result)
        // res.render('article/create.ejs',{title:title,url:url,description:description,category_id:category_id})
        res.redirect('/articles');
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const oneArticle  = async (req,res)=>{

    const id = req.params.id

    try {
        const [[result]]= await connection.query('SELECT * FROM articles WHERE id = ?',[id]);
        if (result.length==0) {
            return res.status(404).json({
                message:"course not found"
            })
        }
        // res.status(200).json(result)
        res.render('article/oneArticle',{article:result})
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }


}

const updateArticle = async(req,res)=>{
    const id = req.params.id
    let path=null;
    let message=null;
    const [[result]]= await connection.query('SELECT * FROM articles WHERE id = ?',[id]);
    res.render('article/edit.ejs',{article:result, error:{
        message,
        path
    }})
}

const putArticle = async (req, res) => {

    const schema =  Joi.object({
        title:Joi.string().uppercase().trim().min(3).max(70).required(),
        description:Joi.string().trim().min(3).required(),
        url:Joi.string().trim(),
        category_id:Joi.number().integer().positive().required(),
    })
 const {value,error}= schema.validate(req.body)

    if (error) {
        const{path,message}=error.details[0];
        return res.render('article/edit.ejs',{
            article:value,
            error:{
                path:path[0],message
            }
         })
    }

    let id =req.params.id
    let {title,url,description,category_id}=value

    if (title =='' || description== ''|| url==''||category_id==null ) {
        return res.status(400).send({
            message:"Bad request"
        })
    }

    try {
        
        const [result]= await connection.query('UPDATE articles SET title = ?,description = ?,url = ?,category_id=? WHERE id = ?',[title,description,url,category_id,id]);
       if (result.affectedRows==0  ) {
        return res.status(400).send({
            message:"Bad request"
        })
       }
        // res.status(200).send(result)
        res.redirect('/articles')
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const patchArticle = async (req, res) =>{
    let id =req.params.id
    let {title,url,description,category_id}=req.body

    try {
        
        const [result]= await connection.query('UPDATE articles SET title=IFNULL(?, title), description=IFNULL(?, description),url=IFNULL(?, url),category_id=IFNULL(?, category_id) WHERE id = ?',[title,description,url,category_id,id]);
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

const deleteArticle = async(req, res) => {
    let id =req.params.id

    try {
        
        const [result]= await connection.query('DELETE FROM articles WHERE id = ?',[id]);

        res.status(204).send({})
       
        
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}





exports.getAllArticles = getAllArticles
exports.createArticle = createArticle
exports.oneArticle = oneArticle
exports.saveArticle = saveArticle
exports.putArticle =putArticle
exports.patchArticle =patchArticle
exports.deleteArticle =deleteArticle
exports.updateArticle =updateArticle
