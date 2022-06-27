CREATE TABLE user(
    user_id CHAR(36) PRIMARY KEY
);

CREATE TABLE review(
    review_id CHAR(36),
    user_id  CHAR(36) NOT NULL,
    place_id  CHAR(36) NOT NULL,
    comment VARCHAR(1024),

    PRIMARY KEY(review_id)
);

CREATE TABLE review_content(
    review_id CHAR(36),
    image_id  CHAR(36) NOT NULL,
    
    FOREIGN KEY review_content(review_id) REFERENCES review(review_id)
);

CREATE TABLE review_point_flag(
    review_id CHAR(36),
    is_text_write TINYINT(1),
    is_update_image TINYINT(1),
    is_first_review TINYINT(1),

    FOREIGN KEY eview_point_flag(review_id) REFERENCES review(review_id)
);


CREATE TABLE user_point(
    user_id   CHAR(36),
    point_score INTEGER,

     FOREIGN KEY user_point(user_id) REFERENCES user(user_id)
);


CREATE TABLE point_increase_log(
    place_id CHAR(36) NOT NULL,
    review_id  CHAR(36) NOT NULL,

    log_date DATETIME
);

CREATE TABLE point_deleted_log(
    place_id CHAR(36) NOT NULL,
    review_id CHAR(36) NOT NULL,

    log_date DATETIME
);

