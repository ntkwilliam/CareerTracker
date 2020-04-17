-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: careertracker
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumni`
--

DROP TABLE IF EXISTS `alumni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni` (
  `alumnus_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `middle_name` varchar(20) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `mailing_address_line_1` varchar(35) DEFAULT NULL,
  `mailing_address_line_2` varchar(35) DEFAULT NULL,
  `mailing_address_city` varchar(25) DEFAULT NULL,
  `mailing_address_state` char(2) DEFAULT NULL,
  `mailing_address_zipcode` varchar(10) DEFAULT NULL,
  `added_by` varchar(30) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`alumnus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16689 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni`
--

LOCK TABLES `alumni` WRITE;
/*!40000 ALTER TABLE `alumni` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni_degrees`
--

DROP TABLE IF EXISTS `alumni_degrees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni_degrees` (
  `degree_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumnus_id` int(11) NOT NULL,
  `diploma_description` varchar(100) NOT NULL,
  `graduation_term_code` varchar(10) NOT NULL,
  `added_by` varchar(30) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`degree_id`),
  KEY `ALUMNUS_ID` (`alumnus_id`),
  CONSTRAINT `alumni_alumni_degree` FOREIGN KEY (`alumnus_id`) REFERENCES `alumni` (`alumnus_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16508 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni_degrees`
--

LOCK TABLES `alumni_degrees` WRITE;
/*!40000 ALTER TABLE `alumni_degrees` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumni_degrees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni_employments`
--

DROP TABLE IF EXISTS `alumni_employments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni_employments` (
  `employment_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumnus_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `added_by` varchar(30) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`employment_id`),
  KEY `alumnus_id` (`alumnus_id`),
  KEY `employers_alumni_employments_idx` (`employer_id`),
  CONSTRAINT `alumni_alumni_employments` FOREIGN KEY (`alumnus_id`) REFERENCES `alumni` (`alumnus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employers_alumni_employments` FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni_employments`
--

LOCK TABLES `alumni_employments` WRITE;
/*!40000 ALTER TABLE `alumni_employments` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumni_employments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni_graduate_schools`
--

DROP TABLE IF EXISTS `alumni_graduate_schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni_graduate_schools` (
  `alumni_graduate_school_id` int(11) NOT NULL AUTO_INCREMENT,
  `alumnus_id` int(11) NOT NULL,
  `graduate_school_id` int(11) NOT NULL,
  `added_by` varchar(30) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(30) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`alumni_graduate_school_id`),
  KEY `alumnus_id` (`alumnus_id`) /*!80000 INVISIBLE */,
  KEY `graduate_school_id` (`graduate_school_id`),
  CONSTRAINT `alumni_alumni_graduate_schools` FOREIGN KEY (`alumnus_id`) REFERENCES `alumni` (`alumnus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `graduate_schools_alumni_graduate_schools` FOREIGN KEY (`graduate_school_id`) REFERENCES `graduate_schools` (`graduate_school_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni_graduate_schools`
--

LOCK TABLES `alumni_graduate_schools` WRITE;
/*!40000 ALTER TABLE `alumni_graduate_schools` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumni_graduate_schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_type` char(1) DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `added_by` varchar(15) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employers`
--

DROP TABLE IF EXISTS `employers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employers` (
  `employer_id` int(11) NOT NULL AUTO_INCREMENT,
  `employer_name` varchar(100) NOT NULL,
  `address_line_1` varchar(35) DEFAULT NULL,
  `address_line_2` varchar(35) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `contact_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `added_by` varchar(15) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`employer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employers`
--

LOCK TABLES `employers` WRITE;
/*!40000 ALTER TABLE `employers` DISABLE KEYS */;
INSERT INTO `employers` VALUES (15,'Tests',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CURRENTUSER','2020-04-15 16:13:03','CURRENTUSER','2020-04-15 16:13:11',_binary '');
/*!40000 ALTER TABLE `employers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `graduate_schools`
--

DROP TABLE IF EXISTS `graduate_schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `graduate_schools` (
  `graduate_school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(100) NOT NULL,
  `address_line_1` varchar(45) DEFAULT NULL,
  `address_line_2` varchar(45) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `contact_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `added_by` varchar(15) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`graduate_school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `graduate_schools`
--

LOCK TABLES `graduate_schools` WRITE;
/*!40000 ALTER TABLE `graduate_schools` DISABLE KEYS */;
/*!40000 ALTER TABLE `graduate_schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(15) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `password_hash` varchar(300) DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `role` char(1) DEFAULT NULL,
  `added_by` varchar(15) DEFAULT NULL,
  `added_datetime` datetime DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('root','User','Root','$2a$10$YavHk69UqXQL5Lk.fT9EluwRSjLxbjxHDmXz1.lDY6gWfQ03Imy1u',_binary '','A','sshrout','2020-04-15 16:10:06','sshrout','2020-04-15 16:10:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-15 16:22:15
