
DELIMITER $$
CREATE PROCEDURE update_user_point_proc(
    PARAM_USER_UUID CHAR(36)
)
BEGIN
    UPDATE  user_point SET point_score = (
    SELECT SUM(is_text_write)+ SUM(is_update_image)+SUM(is_first_review) 
    FROM review_point_flag A INNER JOIN
    (SELECT review_id FROM review WHERE user_id = PARAM_USER_UUID) B  
    on A.review_id = B.review_id)  WHERE user_id = PARAM_USER_UUID; 
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE update_review_point_text_flag_proc(
    PARAM_REVIEW_UUID CHAR(36)
)
BEGIN
    UPDATE review_point_flag SET is_text_write = EXISTS(
        SELECT comment 
        FROM review 
        WHERE review.review_id = PARAM_REVIEW_UUID AND  review.comment IS  NOT NULL LIMIT 1
        ) WHERE review_point_flag.review_id = PARAM_REVIEW_UUID;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE update_review_point_image_flag_proc(
    PARAM_REVIEW_UUID CHAR(36)
)
BEGIN
UPDATE review_point_flag SET is_update_image = EXISTS(
        SELECT image_id
        FROM review_content 
        WHERE review_content.review_id = PARAM_REVIEW_UUID  LIMIT 1
        ) WHERE review_point_flag.review_id = PARAM_REVIEW_UUID;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE update_review_point_first_review_flag_proc(
    PARAM_REVIEW_UUID CHAR(36),
    PARAM_PLACE_UUID CHAR(36)
)
BEGIN
UPDATE review_point_flag SET is_first_review = NOT EXISTS(
    SELECT * FROM (SELECT review_id FROM review_create_log 
    WHERE place_id=PARAM_PLACE_UUID AND review_id != PARAM_REVIEW_UUID)  review_log
    INNER JOIN (SELECT review_id,is_first_review  FROM review_point_flag)  flag  
    ON flag.review_id = review_log.review_id
    WHERE flag.is_first_review = 1
    ) WHERE review_point_flag.review_id = PARAM_REVIEW_UUID;
END $$
DELIMITER ;