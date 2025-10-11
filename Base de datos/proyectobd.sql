-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectobd
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admingestion`
--

DROP TABLE IF EXISTS `admingestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admingestion` (
  `CiAdmin` int NOT NULL,
  PRIMARY KEY (`CiAdmin`),
  CONSTRAINT `admingestion_ibfk_1` FOREIGN KEY (`CiAdmin`) REFERENCES `usuario` (`CiUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admingestion`
--

LOCK TABLES `admingestion` WRITE;
/*!40000 ALTER TABLE `admingestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `admingestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `CiCliente` int NOT NULL,
  PRIMARY KEY (`CiCliente`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`CiCliente`) REFERENCES `usuario` (`CiUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (12),(111),(112),(6666761);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comenta`
--

DROP TABLE IF EXISTS `comenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comenta` (
  `IdComentario` int NOT NULL AUTO_INCREMENT,
  `CiCliente` int DEFAULT NULL,
  `IdPublicacion` int DEFAULT NULL,
  `Contenido` text NOT NULL,
  `FechaHora` datetime NOT NULL,
  `Respuesta` text,
  PRIMARY KEY (`IdComentario`),
  KEY `CiCliente` (`CiCliente`),
  KEY `IdPublicacion` (`IdPublicacion`),
  CONSTRAINT `comenta_ibfk_1` FOREIGN KEY (`CiCliente`) REFERENCES `cliente` (`CiCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comenta_ibfk_2` FOREIGN KEY (`IdPublicacion`) REFERENCES `publicacion` (`IdPublicacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comenta`
--

LOCK TABLES `comenta` WRITE;
/*!40000 ALTER TABLE `comenta` DISABLE KEYS */;
/*!40000 ALTER TABLE `comenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrata`
--

DROP TABLE IF EXISTS `contrata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrata` (
  `IdContrato` int NOT NULL AUTO_INCREMENT,
  `CiCliente` int DEFAULT NULL,
  `IdPublicacion` int DEFAULT NULL,
  `FechaHora` datetime NOT NULL,
  `Comentario` text,
  `Puntaje` int DEFAULT NULL,
  PRIMARY KEY (`IdContrato`),
  KEY `CiCliente` (`CiCliente`),
  KEY `IdPublicacion` (`IdPublicacion`),
  CONSTRAINT `contrata_ibfk_1` FOREIGN KEY (`CiCliente`) REFERENCES `cliente` (`CiCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contrata_ibfk_2` FOREIGN KEY (`IdPublicacion`) REFERENCES `publicacion` (`IdPublicacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contrata_chk_1` CHECK ((`Puntaje` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrata`
--

LOCK TABLES `contrata` WRITE;
/*!40000 ALTER TABLE `contrata` DISABLE KEYS */;
INSERT INTO `contrata` VALUES (7,111,3,'2025-10-02 20:56:25',NULL,NULL),(10,6666761,5,'2025-10-02 21:13:12',NULL,NULL);
/*!40000 ALTER TABLE `contrata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestiona`
--

DROP TABLE IF EXISTS `gestiona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestiona` (
  `CiAdmin` int NOT NULL,
  `CiUsuario` int NOT NULL,
  PRIMARY KEY (`CiAdmin`,`CiUsuario`),
  KEY `CiUsuario` (`CiUsuario`),
  CONSTRAINT `gestiona_ibfk_1` FOREIGN KEY (`CiAdmin`) REFERENCES `admingestion` (`CiAdmin`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gestiona_ibfk_2` FOREIGN KEY (`CiUsuario`) REFERENCES `usuario` (`CiUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestiona`
--

LOCK TABLES `gestiona` WRITE;
/*!40000 ALTER TABLE `gestiona` DISABLE KEYS */;
/*!40000 ALTER TABLE `gestiona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `IdPublicacion` int NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`IdPublicacion`,`Imagen`),
  CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`IdPublicacion`) REFERENCES `publicacion` (`IdPublicacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensaje` (
  `emisor` int NOT NULL,
  `receptor` int NOT NULL,
  `fecha` datetime NOT NULL,
  `contenido` text,
  `visualizacion` tinyint(1) NOT NULL,
  PRIMARY KEY (`emisor`,`receptor`,`fecha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
INSERT INTO `mensaje` VALUES (111,111,'2025-10-03 20:49:40','Gracias por el servicio',0);
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ofrece`
--

DROP TABLE IF EXISTS `ofrece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ofrece` (
  `idServicio` int NOT NULL AUTO_INCREMENT,
  `ciProveedor` int NOT NULL,
  UNIQUE KEY `idServicio` (`idServicio`,`ciProveedor`),
  KEY `ciProveedor` (`ciProveedor`),
  CONSTRAINT `ofrece_ibfk_1` FOREIGN KEY (`ciProveedor`) REFERENCES `proveedor` (`CiProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofrece`
--

LOCK TABLES `ofrece` WRITE;
/*!40000 ALTER TABLE `ofrece` DISABLE KEYS */;
/*!40000 ALTER TABLE `ofrece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `CiProveedor` int NOT NULL,
  `Experiencia` int DEFAULT '0',
  `Habilidad` text,
  PRIMARY KEY (`CiProveedor`),
  CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`CiProveedor`) REFERENCES `usuario` (`CiUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (111,0,'a correr chaval'),(87878,0,NULL),(99922,0,NULL),(99990,0,NULL);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacion` (
  `IdPublicacion` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` text,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Ubicacion` varchar(100) DEFAULT NULL,
  `FechaPublicacion` datetime NOT NULL,
  `CiProveedor` int NOT NULL,
  PRIMARY KEY (`IdPublicacion`),
  KEY `CiProveedor` (`CiProveedor`),
  CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`CiProveedor`) REFERENCES `proveedor` (`CiProveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `publicacion_chk_1` CHECK ((`Precio` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;
/*!40000 ALTER TABLE `publicacion` DISABLE KEYS */;
INSERT INTO `publicacion` VALUES (1,'Plomero','Arreglo todo tipo de incomvenientes',10.00,'Sayago 213','2025-08-31 14:07:55',111),(3,'tecnico en redes','realizo conexiones, SOY EL OSCAR PAPA',300.00,'pocitos','2025-09-06 15:41:42',99922),(4,'electricistas','soy oscar',500.00,'pocitos','2025-09-06 15:48:01',111),(5,'tu puedes','fernando...',100.00,'en todos lados','2025-09-06 22:24:59',87878),(6,'tu puedes','aaaa',900.00,'en todos lados','2025-09-06 22:25:51',87878),(7,'tu puedes','fernando...ef?',1000.00,'en todos lados','2025-09-06 22:27:32',87878);
/*!40000 ALTER TABLE `publicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisa`
--

DROP TABLE IF EXISTS `revisa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisa` (
  `CiAdmin` int NOT NULL,
  `IdPublicacion` int NOT NULL,
  PRIMARY KEY (`CiAdmin`,`IdPublicacion`),
  KEY `IdPublicacion` (`IdPublicacion`),
  CONSTRAINT `revisa_ibfk_1` FOREIGN KEY (`CiAdmin`) REFERENCES `admingestion` (`CiAdmin`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `revisa_ibfk_2` FOREIGN KEY (`IdPublicacion`) REFERENCES `publicacion` (`IdPublicacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisa`
--

LOCK TABLES `revisa` WRITE;
/*!40000 ALTER TABLE `revisa` DISABLE KEYS */;
/*!40000 ALTER TABLE `revisa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefono`
--

DROP TABLE IF EXISTS `telefono`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefono` (
  `CiUsuario` int NOT NULL,
  `Telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`CiUsuario`,`Telefono`),
  CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`CiUsuario`) REFERENCES `usuario` (`CiUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefono`
--

LOCK TABLES `telefono` WRITE;
/*!40000 ALTER TABLE `telefono` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefono` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `CiUsuario` int NOT NULL,
  `Rol` enum('AdminGestion','Cliente','Proveedor') NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Calle` varchar(100) DEFAULT NULL,
  `NumeroPuerta` int DEFAULT NULL,
  `FotoPerfil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CiUsuario`),
  UNIQUE KEY `Email` (`Email`),
  CONSTRAINT `usuario_chk_1` CHECK ((`NumeroPuerta` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (12,'Proveedor','clinteSoy','clienteSoyYO','benitezfernando1474abs@gmail.com','$2y$10$syEbDGOg3SN28zwIg8RyWe9kUbpgyeSP8FMqEee7/JkI9QdGpsRCm',NULL,NULL,NULL),(111,'Cliente','fernando','benitez','benitezfernando1474@gmail.com','$2y$10$VEcToOhdNIAhqoSp5zx0wOZoRQEXZR2SVqTzDTAMjtFb51KzzAgWG',NULL,NULL,NULL),(112,'Cliente','fernando2','benitez','benitezfernando1474a@gmail.com','$2y$10$gMOHBqxHUbyRvdvgwWRx0O8ixhgZ34ZeXgFB7ERf7DstGGYfR3SZa',NULL,NULL,NULL),(9999,'Proveedor','oscarElKpo','elKpoMas','oscar@elKpo','$2y$10$IiabD1r5BCzFDr9AUvLDpev/9w2DEHoJAqV6ylQsovloGfKxEsIh.',NULL,NULL,NULL),(87878,'Proveedor','elizabeth','flores','floreselizabeth1474@gmail.com','$2y$10$fvXwow0XftX7LbMYGarQDuTDykOuMfttoojsP5SBv7xovmVVvftii',NULL,NULL,NULL),(99922,'Proveedor','oscar el kpo','mas mas','oscar@elKpo2.com','$2y$10$ZyIjFwTtcQnht3RVic4hKuRgylvuci5zUuI8mWcSTZgZeT2G7Gkzq',NULL,NULL,NULL),(99990,'Proveedor','fernando','bentiez2','benitezz1474zza@outlook.com','$2y$10$3uL6.LDLEKjjy5C2GiztZ.HRyI/LesZ0jFP1wRXfL53DCOIUxd8y6',NULL,NULL,NULL),(991102,'Proveedor','oscarElKpo','oscarElKpo','oscar@elKpo2','$2y$10$iqOogN/TfdLn2WvVQbzimeysI1kOTCXGy7xkQ4C7XBYQKLmY5qtEm',NULL,NULL,NULL),(6666761,'Cliente','Dante','Benitez','DanteSSJ3@gmail.com','$2y$10$rzIFsLWP6I6ZBgmGwEFN9O8V5qu3ePJ324YS/cd2fhkQq21zv5MR6',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04 13:46:22
