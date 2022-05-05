const {query} = require('../utils/db.js');

const getAll = async () => {
    const rows = await query("SELECT * FROM image_HTML_URl");
    return rows;
}

const getByID = async (id) => {
  const [row] = await query("SELECT * FROM image_HTML_URl WHERE id=?", id);
  return row;
}

const getByTagLike = async (tag) => {
    const rows = await query("SELECT * FROM image_HTML_URl WHERE tag LIKE ?", `%${tag}%`);
    return rows;
}

const getByNameLike = async (name) => {
    const rows = await query("SELECT * FROM image_HTML_URl WHERE Name_of_image LIKE ?", '%'+name+'%');
    return rows;

}

const getByName = async (name) => {
    const [row] = await query("SELECT * FROM image_HTML_URl WHERE Name_of_image=?", name);
    return row;

}

const getByUrl = async (url) => {
    const [row] = await query("SELECT * FROM image_HTML_URl WHERE HTML_URL=?", url);
    return row;

}

const create = async (url, name, tag) => {
    console.log('url =' + url + ' name = ' + name + ' tag = ' + tag )
    const response = await query("INSERT INTO image_HTML_URl (HTML_URL, Name_of_image, tag) VALUES (?, ?, ?)", [url, name , tag]);
    return response;
}

const update = async (id, name, tag) => {
    const response = await query("UPDATE image_HTML_URl SET Name_of_image=?, tag=? WHERE id=?" , [name , tag, id]);
    return response;
}

const remove = async (id) => {
    const response = await query("DELETE FROM image_HTML_URl WHERE id=?" , id);
    return response;
}

const countTags = async () => {
    const rows = await query("SELECT tag, count(*) FROM image_HTML_URl GROUP BY tag");
    return rows;
}


module.exports = {
    getAll,
    getByUrl,
    getByID,
    getByTagLike,
    getByNameLike,
    getByName,
    create,
    update,
    remove,
    countTags
}