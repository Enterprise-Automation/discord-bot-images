DROP TABLE IF EXISTS image_HTML_URl;
CREATE TABLE image_HTML_URl (
  id         INT AUTO_INCREMENT NOT NULL,
  HTML_URL      VARCHAR(128) NOT NULL,
  Name_of_image      VARCHAR(128) NOT NULL,
  tag      VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO image_HTML_URl 
  (HTML_URL, Name_of_image, tag) 
VALUES
  ('test', 'name of pic', 'dog'),
  ('test2', 'pic', 'cat');
