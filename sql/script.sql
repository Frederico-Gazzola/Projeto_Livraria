DROP SCHEMA IF EXISTS `livraria` ;

CREATE DATABASE IF NOT EXISTS `livraria` DEFAULT CHARACTER SET utf8 ;
USE `livraria` ;

CREATE TABLE IF NOT EXISTS `livraria`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`));

CREATE TABLE IF NOT EXISTS `livraria`.`book` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `autor` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(2000) NOT NULL,
  `foto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`book_id`));

CREATE TABLE IF NOT EXISTS `livraria`.`review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `nota` INT NOT NULL,
  `descricao` VARCHAR(250) NOT NULL,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_review_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_review_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_review_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `livraria`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `livraria`.`book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `livraria`.`user_nota_review` (
  `user_nota_review_id` INT NOT NULL AUTO_INCREMENT,
  `review_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `valor_curtida` TINYINT NOT NULL,
  PRIMARY KEY (`user_nota_review_id`),
  INDEX `fk_user_nota_review_review1_idx` (`review_id` ASC) VISIBLE,
  INDEX `fk_user_nota_review_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_nota_review_review1`
    FOREIGN KEY (`review_id`)
    REFERENCES `livraria`.`review` (`review_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_nota_review_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livraria`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
