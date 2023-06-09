const connection = require('../config/db')



const getAllCourses = async (req,res)=>{
    // const data = await pool.query("SELECT * FROM courses")
    // console.log(data);

    try {
        const [result]= await connection.query('SELECT * FROM courses');
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }

}




// const getAllCourses = (req, res) => res.send(myCourses)

const saveCourse = async (req, res) => {
    // console.log(req.body);
    // res.send(req.body)
    let {title,description}=req.body

    try {
        const result= await connection.query('INSERT INTO courses (title,description) VALUES(?,?)',[title,description]);
        res.status(201).send(result)
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

const oneCourse  = async (req,res)=>{
    // const data = await pool.query("SELECT * FROM courses")
    // console.log(data);
    const id = req.params.id

    try {
        const [result]= await connection.query('SELECT * FROM courses WHERE id = ?',[id]);
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

const putCourse = async (req, res) => {
    let id =req.params.id
    let {title,description}=req.body

    if (title =='' || description== '') {
        return res.status(400).send({
            message:"Bad request"
        })
    }

    try {
        
        const [result]= await connection.query('UPDATE courses SET title = ?,description = ? WHERE id = ?',[title,description,id]);
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

const patchCourse = async (req, res) =>{
    let id =req.params.id
    let {title,description}=req.body

    try {
        
        const [result]= await connection.query('UPDATE courses SET title=IFNULL(?, title), description=IFNULL(?, description) WHERE id = ?',[title,description,id]);
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

const deleteCourse = async(req, res) => {
    let id =req.params.id

    try {
        
        const [result]= await connection.query('DELETE FROM courses WHERE id = ?',[id]);

        res.status(204).send({})
       
        
        
    } catch (error) {
        res.status(500).json({
            message:"server is down!"
        })
    }
}

exports.getAllCourses = getAllCourses
exports.oneCourse = oneCourse
exports.putCourse = putCourse
exports.saveCourse =saveCourse
exports.patchCourse =patchCourse
exports.deleteCourse =deleteCourse