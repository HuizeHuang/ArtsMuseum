var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);


/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function get10RandomPaintings(req, res) {

  var query = `SELECT Page_Link, Image_Source, Title
              FROM ARTWORK
              ORDER BY RAND()
              LIMIT 10;`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });

};


/* ---- Menu Content ---- */
function getUniqueValues(req, res) {
  var searchKey = req.params.searchKey;
  console.log(searchKey);
  var query = `
  SELECT DISTINCT ${searchKey} AS value
  FROM ARTWORK
  ORDER BY ${searchKey}
  ;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};



/* ---- Find the images with corresponding search key and value---- */
function getImages(req, res) {
  var key = req.params.key;
  var value = req.params.value;
  var query = `
  SELECT ID, IMAGE_SOURCE
  FROM ARTWORK
  WHERE ${key} = '${value}'
  ORDER BY RAND()
  LIMIT 16;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Extract all the info for a iamge ---- */
function getImgInfo(req, res) {
  var imgId = req.params.id;
  /* !!!! This query could be optimized !!! */
	var query = `
    SELECT ARTWORK.*, AUTHOR.FULL_NAME AS AUTHOR
    FROM ARTWORK JOIN AUTHOR ON ARTWORK.AUTHOR_ID = AUTHOR.ID
    WHERE ARTWORK.ID = ${imgId};
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}

/* ---- Fetch all the artists that first name starts with given letter ---- */
function getArtists(req, res) {
  var firstLetter = req.params.firstLetter;
  /* !!!! This query could be optimized !!! */
  var query = `

    SELECT FULL_NAME, ARTWORK.author_id AS ID, IMAGE_SOURCE
    FROM (
      SELECT full_name, id
      FROM AUTHOR
      where full_name like "${firstLetter}%") author_initial
    JOIN ARTWORK
    ON author_initial.id= ARTWORK.author_id
    GROUP BY full_name
    ORDER BY full_name;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Get recommendations for current image ---- */
function getRecsForImg(req, res) {
  var query = `
  SELECT A.id AS ID, image_source
  FROM ARTWORK A,
  (SELECT Form, Type, Timeline_Start, Timeline_End
  FROM ARTWORK
  WHERE ID = 2) T
  WHERE A.Form = T.Form
  AND A.Type = T.Type
  ORDER BY ABS(A.Timeline_Start - T.Timeline_Start)
  LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  get10RandomPaintings: get10RandomPaintings,
  getUniqueValues: getUniqueValues,
  getImages:getImages,
  getImgInfo: getImgInfo,
  getArtists:getArtists,
  getRecsForImg: getRecsForImg
  // getDecades: getDecades,
  // bestGenresPerDecade: bestGenresPerDecade,
  // getRandomMovies:getRandomMovies
}