const connection = require('../config/db')
const Joi = require('joi');

exports.ValidateAddArticle= async (req,res,next)=>{

   
    const schema=  Joi.object({
        title:Joi.string().trim().min(3).max(70).required(),
        // url:Joi.string().trim().required(),
        description:Joi.string().trim().min(3).required(),
        category_id:Joi.number().integer().positive().required(),
    })
    const {value,error}= schema.validate(req.body)

    
    if (error) {      
        
        // return res.send(schema.validate(req.body))
        const [category] = await connection.query('SELECT * FROM categories'); 
        const{path,message}=error.details[0];
     
        return res.render('article/create',{
            value,
            error:{
                path,message
            },category
         })
    }

    next();
}