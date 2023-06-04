import {pool} from '../db.js'

export const getCategories = async (req, res) => {
   try {
 const [rows] = await pool.query('SELECT * FROM categories')
 res.json(rows) 
   } catch (error) {
    return res.status(500)
   }
}

export const getCategory = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id])

if (rows.length <= 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})

    res.json(rows[0]) 
} catch (error) {
    return res.status(500)
}
}


export const postCategories = async (req, res) => {
    try {
const  {Codigo, Nombre, Descripcion, Observacion} = req.body
const [rows] = await pool.query('INSERT INTO categories (Codigo, Nombre, Descripcion, Observacion) VALUES (?, ?, ?, ?)', [Codigo, Nombre, Descripcion, Observacion])
res.send({
    id: rows.insertId,
    Codigo,
    Nombre,
    Descripcion,
    Observacion
});
    } catch (error) {
    return res.status(500)
    }
}

export const deleteCategories = async (req, res) => {
    try {
const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id])

if (result.affectedRows <= 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})
    }
    catch (error) {
res.sendStatus(204)
    }
}

export const putCategories = async (req, res) => {
 const {id} = req.params
 const {Codigo, Nombre, Descripcion, Observacion} = req.body

const [result] = await pool.query('UPDATE categories SET Codigo = IFNULL(?, Codigo), Nombre = IFNULL(?, Nombre), Descripcion = IFNULL(?, Descripcion), Observacion = IFNULL(?, Observacion) WHERE id = ?', [Codigo, Nombre, Descripcion, Observacion, id])
console.log(result)

if (result.affectedRows === 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})

const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id])

res.json(rows[0])
}

