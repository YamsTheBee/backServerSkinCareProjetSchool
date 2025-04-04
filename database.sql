CREATE DATABASE IF NOT EXISTS `skincare_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `skincare_db`;

-- Table structure for table `skin_types`
DROP TABLE IF EXISTS `skin_types`;
CREATE TABLE `skin_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `skin_types`
INSERT INTO `skin_types` VALUES (1,'Peau sèche'),(2,'Peau grasse'),(3,'Peau mixte'),(4,'Peau normale'),(5,'Peau sensible'),(6,'Peau acnéique'),(7,'Peau mature');

-- Table structure for table `home_remedies`
DROP TABLE IF EXISTS `home_remedies`;
CREATE TABLE `home_remedies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `ingredients` text,
  `instructions` text,
  `care_type` varchar(100),
  `duration` int,
  `tips` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `home_remedies`
INSERT INTO `home_remedies` VALUES
(1,'Masque hydratant à l\'avocat','Un masque hydratant et nourrissant pour le visage, à base d\'avocat et de miel.','1 avocat mûr, 2 cuillères à soupe de miel, 1 cuillère à soupe d\'huile d\'olive','1. Écraser l\'avocat dans un bol.\n2. Ajouter le miel et l\'huile d\'olive.\n3. Mélanger jusqu\'à obtention d\'une pâte homogène.\n4. Appliquer sur le visage et laisser poser pendant 15-20 minutes avant de rincer.','visage',20,'Idéal pour les peaux sèches, à utiliser une fois par semaine pour un effet optimal.'),
(2,'Masque purifiant au charbon et à l\'argile','Un masque pour purifier la peau, idéal pour les peaux grasses et sujettes aux imperfections.','Charbon actif, argile verte, eau','1. Mélanger 1 cuillère à soupe d\'argile verte avec 1/2 cuillère à café de charbon actif.\n2. Ajouter quelques gouttes d\'eau jusqu\'à obtenir une pâte.\n3. Appliquer sur le visage et laisser poser pendant 10-15 minutes, puis rincer.','visage',15,'Utiliser une fois par semaine pour purifier les pores en profondeur.'),
(3,'Gommage au sucre et à l\'huile d\'olive','Gommage doux pour exfolier la peau et lui donner un éclat naturel.','Sucre, huile d\'olive, miel','1. Mélanger 2 cuillères à soupe de sucre avec 1 cuillère à soupe d\'huile d\'olive et 1 cuillère à soupe de miel.\n2. Appliquer sur le corps en massant doucement en mouvements circulaires.\n3. Rincer à l\'eau tiède.','corps',10,'À utiliser 2 fois par semaine pour une peau douce et lisse.'),
(4,'Soin nourrissant au miel et au yaourt','Un soin hydratant et apaisant pour les peaux sèches.','Miel, yaourt nature, huile d\'olive','1. Mélanger 2 cuillères à soupe de miel avec 2 cuillères à soupe de yaourt nature.\n2. Ajouter 1 cuillère à soupe d\'huile d\'olive et bien mélanger.\n3. Appliquer sur le visage et laisser poser pendant 15 minutes.\n4. Rincer à l\'eau tiède.','visage',15,'À appliquer une fois par semaine pour maintenir la peau nourrie.'),
(5,'Sérum capillaire à l\'huile d\'argan et à l\'huile de coco','Sérum pour nourrir et réparer les cheveux secs et abîmés.','Huile d\'argan, huile de coco, huile essentielle de lavande','1. Mélanger 1 cuillère à soupe d\'huile d\'argan et 1 cuillère à soupe d\'huile de coco.\n2. Ajouter 2-3 gouttes d\'huile essentielle de lavande (facultatif).\n3. Appliquer sur les cheveux secs ou humides, en insistant sur les pointes.\n4. Laisser poser 30 minutes à 1 heure avant de laver les cheveux.','cheveux',60,'À appliquer une fois par semaine pour des cheveux nourris et brillants.'),
(6,'Soin apaisant à la camomille et au concombre','Un soin apaisant et hydratant pour les peaux sensibles ou sujettes aux rougeurs.','Infusion de camomille, concombre','1. Préparer une infusion de camomille et la laisser refroidir.\n2. Mélanger quelques cuillères de l\'infusion avec de la pulpe de concombre écrasée.\n3. Appliquer ce mélange sur le visage et laisser poser pendant 15 minutes.\n4. Rincer à l\'eau froide.','visage',15,'Idéal pour les peaux sensibles, à appliquer après une exposition au soleil.');

-- Table structure for table `products`
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `price` decimal(10,2),
  `product_type` enum('nettoyant','hydratant','traitement','masque') NOT NULL,
  `routine_id` int,
  `product_url` varchar(255),
  `skin_type_id` int,
  PRIMARY KEY (`id`),
  KEY `skin_type_id` (`skin_type_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`skin_type_id`) REFERENCES `skin_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `products`
INSERT INTO `products` VALUES
(1,'Crème Anti-Acné','Crème de traitement anti-acné pour les peaux grasses.',34.99,'traitement',4,'http://exemple.com/creme-anti-acne',2),
(2,'Crème Nourrissante','Crème nourrissante pour les peaux sèches et sensibles.',24.99,'hydratant',1,'http://exemple.com/creme-nourrissante',1),
(3,'Crème Solaire SPF 50','Crème solaire protectrice pour tous types de peau.',19.99,'hydratant',2,'http://exemple.com/creme-solaire',4),
(4,'Crème Apaisante','Crème apaisante pour les peaux irritées et sensibles.',27.99,'hydratant',3,'http://exemple.com/creme-apaisante',2),
(5,'Crème Anti-Imperfections','Crème pour réduire les imperfections et les boutons.',32.99,'traitement',4,'http://exemple.com/creme-anti-imperfections',3),
(6,'Crème Régénérante','Crème régénérante pour restaurer et nourrir les peaux matures.',49.99,'hydratant',5,'http://exemple.com/creme-regenerante',3),
(7,'Masque Hydratant','Masque hydratant intensif pour les peaux sèches et déshydratées.',15.99,'masque',1,'http://exemple.com/masque-hydratant',1),
(8,'Masque Purifiant','Masque purifiant pour nettoyer les pores en profondeur, idéal pour les peaux grasses.',18.99,'masque',2,'http://exemple.com/masque-purifiant',2),
(9,'Masque Anti-Acné','Masque destiné à réduire les boutons et les imperfections, pour peaux sujettes à l’acné.',21.99,'masque',3,'http://exemple.com/masque-anti-acne',3),
(10,'Masque Apaisant','Masque apaisant pour les peaux sensibles et sujettes aux rougeurs.',19.99,'masque',4,'http://exemple.com/masque-apaisant',2),
(11,'Masque Nourrissant','Masque nourrissant pour restaurer l’élasticité de la peau.',23.99,'masque',5,'http://exemple.com/masque-nourrissant',3),
(12,'Gel Nettoyant Purifiant','Gel nettoyant purifiant pour les peaux grasses et sujettes aux imperfections.',12.99,'nettoyant',1,'http://exemple.com/gel-nettoyant-purifiant',2),
(13,'Gel Nettoyant Hydratant','Gel nettoyant doux pour les peaux sèches et déshydratées.',14.99,'nettoyant',2,'http://exemple.com/gel-nettoyant-hydratant',1),
(14,'Gel Nettoyant Apaisant','Gel nettoyant apaisant pour les peaux sensibles et sujettes aux rougeurs.',16.99,'nettoyant',3,'http://exemple.com/gel-nettoyant-apaisant',2),
(15,'Gel Nettoyant Anti-Acné','Gel nettoyant pour peaux sujettes à l’acné, aide à réduire les boutons et les imperfections.',17.99,'nettoyant',4,'http://exemple.com/gel-nettoyant-anti-acne',3),
(16,'Gel Nettoyant Nourrissant','Gel nettoyant nourrissant pour restaurer l’hydratation de la peau.',18.99,'nettoyant',5,'http://exemple.com/gel-nettoyant-nourrissant',3);

-- Table structure for table `recipes`
DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `recipes`
INSERT INTO `recipes` VALUES
(1,'Masque hydratant au miel','Masque hydratant pour les peaux sèches','Miel, yaourt, huile d’olive','Mélanger tous les ingrédients et appliquer sur le visage pendant 15 minutes. Rincer à l’eau tiède.','2025-03-08 21:16:58','2025-03-08 21:16:58');

-- Table structure for table `routines`
DROP TABLE IF EXISTS `routines`;
CREATE TABLE `routines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skin_type_id` int,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `skin_type_id` (`skin_type_id`),
  CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`skin_type_id`) REFERENCES `skin_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `routines`
INSERT INTO `routines` VALUES
(1,1,'Routine hydratante','Nettoyage doux, sérum hydratant à l’acide hyaluronique, crème nourrissante, protection solaire.'),
(2,2,'Routine équilibrante','Nettoyant purifiant, sérum à la niacinamide, crème matifiante légère, protection solaire non grasse.'),
(3,3,'Routine mixte','Nettoyant doux, sérum équilibrant, hydratation légère sur la zone T et plus riche sur les joues.'),
(4,4,'Routine simple','Nettoyant doux, hydratation légère, protection solaire quotidienne.'),
(5,5,'Routine apaisante','Nettoyant sans sulfate, crème hydratante apaisante, protection solaire minérale.'),
(6,6,'Routine anti-imperfections','Nettoyant doux sans savon, sérum à l’acide salicylique, crème hydratante non comédogène, protection solaire.'),
(7,7,'Routine anti-âge','Nettoyant doux, sérum au rétinol ou à la vitamine C, crème hydratante nourrissante, protection solaire.'),
(8,NULL,'Routine Matin','Routine de soin du matin pour un réveil frais.'),
(9,NULL,'Routine Soir','Routine de soin du soir avant de se coucher.');

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `users`
INSERT INTO `users` VALUES
(1,'user1','user1@example.com','password123','2025-03-08 01:25:50'),
(2,'user2','user2@example.com','securepass456','2025-03-08 01:25:50'),
(3,'user3','user3@example.com','mysecret789','2025-03-08 01:25:50');
