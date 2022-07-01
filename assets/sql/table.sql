
CREATE TABLE review(
    review_id CHAR(36) UNIQUE,
    user_id  CHAR(36) NOT NULL,
    place_id  CHAR(36) NOT NULL,
    comment VARCHAR(1024) NOT NULL,

    PRIMARY KEY(review_id)
);

CREATE TABLE review_content(
    review_id CHAR(36),
    image_id  CHAR(36) NOT NULL,
    
    FOREIGN KEY review_content(review_id) REFERENCES review(review_id)
);

CREATE TABLE review_point_flag(
    review_id CHAR(36),
    is_text_write TINYINT(1) NOT NULL,
    is_update_image TINYINT(1) NOT NULL,
    is_first_review TINYINT(1) NOT NULL,

    FOREIGN KEY eview_point_flag(review_id) REFERENCES review(review_id)
);


CREATE TABLE user_point(
    user_id   CHAR(36) NOT NULL,
    point_score INTEGER NOT NULL
);


CREATE TABLE review_create_log(
    place_id CHAR(36) NOT NULL,
    review_id  CHAR(36) NOT NULL,

    log_date DATETIME NOT NULL
);

CREATE TABLE review_deleted_log(
    place_id CHAR(36) NOT NULL,
    review_id CHAR(36) NOT NULL,

    log_date DATETIME NOT NULL
);

CREATE TABLE point_plus_log(
    review_id  CHAR(36) NOT NULL,

    text_write TINYINT(1) NOT NULL,
    update_image TINYINT(1) NOT NULL,
    first_review TINYINT(1) NOT NULL,


    log_date DATETIME NOT NULL
);