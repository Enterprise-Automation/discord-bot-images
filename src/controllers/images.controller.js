const {query} = require('../utils/db.js');

const getAll = async () => {
    const rows = await query("SELECT * FROM image_HTML_URl");
    return rows;
}

const getByID = async (id) => {
  const [row] = await query("SELECT * FROM image_HTML_URl WHERE id=?", id);
  return row;
}

const getByTag = async (tag) => {
    const rows = await query("SELECT * FROM image_HTML_URl WHERE tag=?", tag);
    return rows;
}

const getByName = async (name) => {
    const rows = await query("SELECT * FROM image_HTML_URl WHERE Name_of_image=?", name);
    return rows;

}

const create = async (url, name, tag) => {
    const response = await query("INSERT INTO image_HTML_URl (HTML_URL, Name_of_image, tag) VALUES (?, ?, ?)"  [url, name , tag]);
    return response;
}

const update = async (id, url, name, tag) => {
    const response = await query("UPDATE image_HTML_URl SET  HTML_URL=?, Name_of_image=?, tag=? WHERE id=?" [url, name , tag, id]);
    return response;
}

const remove = async (id) => {
    const response = await query("DELETE FROM image_HTML_URl WHERE id=?" , id);
    return response;
}


module.exports = {
    getAll,
    getByID,
    getByTag,
    getByName,
    create,
    update,
    remove
}