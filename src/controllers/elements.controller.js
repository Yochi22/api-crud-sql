import {pool} from '../db.js'

export const getElements = async (req, res) => {
    try {
      const Categories_id = req.params.Categories_id; // Obtener el ID de la categoría desde la solicitud
      const query = 'SELECT * FROM elements WHERE Categories_id = ?'; // Consulta SQL para filtrar por la llave foránea
  
      const [rows] = await pool.query(query, [Categories_id]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  
export const getElement = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM elements WHERE id = ?', [req.params.id])

if (rows.length <= 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})

    res.json(rows[0]) 
} catch (error) {
    return res.status(500)
}
}


export const postElements = async (req, res) => {
    try {
const  {Referencias, Nombre, Cantidad, Valor, Estado, Lugar, Observaciones, Categories_id} = req.body
const [rows] = await pool.query('INSERT INTO elements (Referencias, Nombre, Cantidad, Valor, Estado, Lugar, Observaciones, Categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [Referencias, Nombre, Cantidad, Valor, Estado, Lugar, Observaciones, Categories_id])
res.send({
    id: rows.insertId,
    Referencias,
    Nombre,
    Cantidad,
    Valor,  
    Estado,
    Lugar,
    Observaciones,
    Categories_id
});
    } catch (error) {
    return res.status(500)
    }
}

export const deleteElements = async (req, res) => {
    try {
const [result] = await pool.query('DELETE FROM elements WHERE id = ?', [req.params.id])

if (result.affectedRows <= 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})
    }
    catch (error) {
res.sendStatus(204)
    }
}

export const putElements = async (req, res) => {
 const {id} = req.params
 const {Referencias, Nombre, Cantidad, Valor, Estado, Lugar, Observaciones, Categories_id} = req.body

const [result] = await pool.query('UPDATE elements SET Referencias = IFNULL(?, Referencias), Nombre = IFNULL(?, Nombre), Cantidad = IFNULL(?, Cantidad), Valor = IFNULL(?, Valor), Estado = IFNULL(?, Estado), Lugar = IFNULL(?, Lugar), Observaciones = IFNULL(?, Observaciones), Categories_id = IFNULL(?, Categories_id) WHERE id = ?', [Referencias, Nombre, Cantidad, Valor, Estado, Lugar, Observaciones, Categories_id, id])
console.log(result)

if (result.affectedRows === 0 ) return res.status(404).json({
    message: "No se encuentra la categoría"
})

const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id])

res.json(rows[0])
}
