
DELIMITER $$
CREATE TRIGGER delete_review_before
    BEFORE DELETE ON review FOR EACH ROW
        BEGIN
            DELETE FROM review_content WHERE review_id = OLD.review_id;
            DELETE FROM review_point WHERE review_id = OLD.review_id;
        END $$
DELIMITER ;



DELIMITER $$
CREATE TRIGGER delete_review_after
    AFTER DELETE ON review FOR EACH ROW
        BEGIN
            INSERT INTO review_deleted_log(review_id,place_id)
            SELECT review_id,place_id 
            FROM point_increase_log WHERE review_id = OLD.review_id;

            UPDATE review_deleted_log SET log_date = NOW() WHERE review_id = OLD.review_id;
        END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER delete_user_before
    BEFORE DELETE ON user FOR EACH ROW
        BEGIN
            DELETE FROM user_point WHERE user_id = OLD.user_id;
            DELETE FROM review WHERE user_id = OLD.user_id;
        END $$
DELIMITER ;


