-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sportshop
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Calza Azul','calza_azul.jpg','Ropa',25000,1),(2,'Calza Gris','calza_gris.jpg','Ropa',25000,1),(3,'Calza Marron','calza_marron.jpg','Ropa',25000,1),(4,'Calza Oxford','calza_oxford.jpg','Ropa',25000,1),(5,'Calza Roja','calza_roja.jpg','Ropa',25000,1),(6,'Calza Rosa Viejo','calza_rosa_viejo.jpg','Ropa',25000,1),(7,'Calza Verdee','calza_verde.jpg','ropa',25000,1),(8,'Campera Azul','campera_azul.jpg','Ropa',45000,1),(9,'Campera Beige','campera_beige.jpg','Ropa',45000,1),(10,'Campera Gris','campera_gris.jpg','Ropa',45000,1),(11,'Campera Marron','campera_marron.jpg','Ropa',45000,1),(12,'Campera Negra','campera_negra.jpg','Ropa',45000,1),(13,'Campera Roja','campera_roja.jpg','Ropa',45000,1),(14,'Campera Verde','campera_verde.jpg','Ropa',45000,1),(15,'Remera Rosa Claro','remera_rosa_claro.jpg','Ropa',18000,1),(16,'Remera Blanca','remera_blanca.jpg','Ropa',18000,1),(17,'Remera Gris','remera_gris.jpg','Ropa',18000,1),(18,'Remera Lila','remera_lila.jpg','Ropa',18000,1),(19,'Remera Manga Larga Negra','remera_manga_larga_negra.jpg','Ropa',22000,1),(20,'Remera Manga Larga Blanca','remera_manga_larga_blanca.jpg','Ropa',22000,1),(21,'Remera Negra','remera_negra.jpg','Ropa',18000,1),(22,'Short Amarillo','short_amarillo.jpg','Ropa',16000,1),(23,'Short Blanco','short_blanco.jpg','Ropa',16000,1),(24,'Short Celeste','short_celeste.jpg','Ropa',16000,1),(25,'Short Gris','short_gris.jpg','Ropa',16000,1),(26,'Short Marron Clarito','short_marron_clarito.jpg','Ropa',16000,1),(27,'Short Rojo','short_rojo.jpg','Ropa',16000,1),(28,'Short Rosa','short_rosa.jpg','Ropa',16000,1),(29,'Top Amarillo','top_amarillo.jpg','Ropa',15000,1),(30,'Top Blanco','top_blanco.jpg','Ropa',15000,1),(31,'Top Marron Largo','top_marron_largo.jpg','Ropa',15000,1),(32,'Top Negro','top_negro.jpg','Ropa',15000,1),(33,'Top Rojo','top_rojo.jpg','Ropa',15000,1),(34,'Top Rosa','top_rosa.jpg','Ropa',15000,1),(35,'Top Rosa Viejo','top_rosa_viejo.jpg','Ropa',15000,1),(36,'Zapatillas Topper Blancas','zapatillas_topper_blancas.jpg','zapatillas',55000,1),(37,'Zapatillas Adidas Celestes','zapatillas_adidas_celestes.jpg','zapatillas',60000,1),(38,'Zapatillas Negras Nike','zapatillas_negras_nike.jpg','zapatillas',65000,1),(39,'Zapatillas Nike Rosa','zapatillas_nike_rosa.jpg','zapatillas',65000,1),(40,'Zapatillas Puma Negra','zapatillas_puma_negra.jpg','zapatillas',58000,1),(41,'Zapatillas Puma Rosa','zapatillas_puma_rosa.jpg','zapatillas',58000,1),(42,'Zapatillas Topper Gris','zapatillas_topper_gris.jpg','zapatillas',55000,1),(43,'Zapatillas ultraLacoste','zapatillas_ultraLacoste.jpg','zapatillas',50000,1),(44,'Remera colorida','remera_colorida.jpg','zapatillas',34500,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@sport.com','$2b$10$GMKLJp7AHq7GNSlEzamd0.PTKC.EZV.pPr.chOwXbtakvCf1gnsh.'),(2,'Martina','martina@sport.com','$2b$10$gKuGTc2M.uMll71enun28eJLGg1g0YkpKeN0/v3pqsqHtPh143NN6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'mar','2026-07-02 23:26:55',85000.00),(2,'amr','2026-07-03 00:19:30',130000.00),(3,'mar','2026-07-03 09:15:56',80000.00),(4,'Mar','2026-07-03 11:02:10',18000.00);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ventas_productos`
--

LOCK TABLES `ventas_productos` WRITE;
/*!40000 ALTER TABLE `ventas_productos` DISABLE KEYS */;
INSERT INTO `ventas_productos` VALUES (1,1,37,1,60000.00),(2,1,3,1,25000.00),(3,2,38,2,65000.00),(4,3,34,1,15000.00),(5,3,39,1,65000.00),(6,4,15,1,18000.00);
/*!40000 ALTER TABLE `ventas_productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-08 15:20:43
