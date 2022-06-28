
DELIMITER $$
CREATE TRIGGER delete_review_before
    BEFORE DELETE ON review FOR EACH ROW
        BEGIN
            DELETE FROM review_content WHERE review_id = OLD.review_id;
            DELETE FROM review_point_flag WHERE review_id = OLD.review_id;
        END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER insert_review_after
    AFTER INSERT ON review FOR EACH ROW
        BEGIN
            INSERT INTO point_increase_log(review_id,place_id,log_date) VALUES (NEW.review_id,NEW.place_id,NOW());
        END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER delete_review_after
    AFTER DELETE ON review FOR EACH ROW
        BEGIN
            INSERT INTO point_deleted_log(review_id,place_id)
            SELECT review_id,place_id 
            FROM point_increase_log WHERE review_id = OLD.review_id;

            UPDATE point_deleted_log SET log_date = NOW() WHERE review_id = OLD.review_id;
        END$$
DELIMITER ;




