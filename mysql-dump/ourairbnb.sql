-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 19 juil. 2022 à 17:35
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `miola`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartements`
--

DROP TABLE IF EXISTS `appartements`;
CREATE TABLE IF NOT EXISTS `appartements` (
  `agent_securite` bit(1) NOT NULL,
  `ascenseur` bit(1) NOT NULL,
  `nombre_chambre` bigint DEFAULT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `chambres`
--

DROP TABLE IF EXISTS `chambres`;
CREATE TABLE IF NOT EXISTS `chambres` (
  `balcon` bit(1) NOT NULL,
  `nombre_lits` bigint DEFAULT NULL,
  `id` bigint NOT NULL,
  `holet_riad_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfcafyv3dud743g35knyuqodxv` (`holet_riad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `guides_touristiques`
--

DROP TABLE IF EXISTS `guides_touristiques`;
CREATE TABLE IF NOT EXISTS `guides_touristiques` (
  `cin` varchar(150) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `heure_debut_matin` bigint DEFAULT NULL,
  `heure_debut_soir` bigint DEFAULT NULL,
  `heure_fin_matin` bigint DEFAULT NULL,
  `heure_fin_soir` bigint DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `ville_id` bigint DEFAULT NULL,
  PRIMARY KEY (`cin`),
  KEY `FK7u5jd8qubejbdu0dsmfbsap5t` (`ville_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(38);

-- --------------------------------------------------------

--
-- Structure de la table `hotels_riads`
--

DROP TABLE IF EXISTS `hotels_riads`;
CREATE TABLE IF NOT EXISTS `hotels_riads` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appreciation` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `type` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_k2po5mv43xsm01pd34h5fo6h7` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `hotels_riads`
--

INSERT INTO `hotels_riads` (`id`, `appreciation`, `name`, `photo`, `type`) VALUES
(1, 4, 'Hilton', '1656450029236-file.jpg', b'1'),
(2, 5, 'Mamounia', '1656450089426-file.jpg', b'1'),
(3, 3, 'Yacout', '1656450136123-file.jpg', b'0'),
(9, 4, 'Ibis Tanger', '1658250942667-file.jpg', b'1'),
(10, 4, 'Casa Amsterdam', '1658250977624-file.jpg', b'1'),
(11, 4, 'B&B Hôtel', '1658251008349-file.jpg', b'1'),
(12, 5, 'Amor Riad', '1658251044208-file.jpg', b'0'),
(13, 4, 'Al Andalous Riad', '1658251076635-file.jpg', b'0');

-- --------------------------------------------------------

--
-- Structure de la table `logements`
--

DROP TABLE IF EXISTS `logements`;
CREATE TABLE IF NOT EXISTS `logements` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contact` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `rating_cache` double DEFAULT NULL,
  `rating_count` int NOT NULL,
  `surface` double DEFAULT NULL,
  `ville_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdvjencsuiki0k243sgtfqqwb1` (`ville_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `logements`
--

INSERT INTO `logements` (`id`, `contact`, `description`, `email`, `photo`, `rating_cache`, `rating_count`, `surface`, `ville_id`) VALUES
(1, '08887766', 'Appartement Journalier', 'contact@gmail.com', '1656449868210-file.jpg', 2, 2, 75, 2),
(2, '078777777', 'Appartement Marina', 'contact@gmail.com', '1656449914965-file.jpg', 3.5, 2, 32, 1),
(11, '0690909090', 'Jbel Kbir Villa', 'villatanger@gmail.com', '1658250485984-file.jpg', 0, 0, 45, 3),
(12, '0655550090', 'Duplex Ain Sebaa', 'duplex@gmail.com', '1658250545708-file.jpg', 0, 0, 32, 1),
(13, '0655446534', 'Résidence Bouskoura', 'bouskoura@gmail.com', '1658250602078-file.jpg', 5, 1, 22, 1),
(14, '0538987655', 'Duplex Irfane', 'irfaneRes@mail.com', '1658250660291-file.jpg', 0, 0, 12, 2),
(15, '0640141072', 'Studio Mont fleuri ', 'feslocation@gmail.com', '1658250749456-file.jpg', 0, 0, 10, 8),
(16, '0567643212', 'Atlas appartement', 'fesLocation@gmail.com', '1658250813039-file.jpg', 0, 0, 22, 8),
(17, '0677554422', 'Villa Al Omrane', 'irfaneLoc@gmail.com', '1658250876857-file.jpg', 0, 0, 30, 4);

-- --------------------------------------------------------

--
-- Structure de la table `monuments`
--

DROP TABLE IF EXISTS `monuments`;
CREATE TABLE IF NOT EXISTS `monuments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `historique` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `nom` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `ville_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7mopyj3ljr4980onyaecm9kgp` (`ville_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `monuments`
--

INSERT INTO `monuments` (`id`, `historique`, `nom`, `photo`, `ville_id`) VALUES
(1, 'Avec sa pierre taillée à la main et son beau marbre, la mosquée Hassan II est l’un des sites incontournables de Casablanca. Des visites guidées sont possibles en dehors des heures de prière, et montrent les coins de la mosquée tels que la salle de prière et le hammam.', 'Mosquée Hassan II', '1656450532001-file.jpg', 1),
(2, 'La médina la plus grande du monde, ce quartier immense et bien animé mérite au moins une journée pour visiter. Vous y trouverez des mosquées, fontaines, des tanneries et des souks. Réservez un guide pour ne pas vous perdre dans ses petites ruelles qui créent un véritable labyrinthe.', 'Médina de Fès', '1656450589910-file.jpg', 2),
(7, 'Le mausolée Mohammed-V est un tombeau royal situé à Rabat, capitale du Maroc. Il se trouve sur l\'esplanade de la tour Hassan et en surplomb de l\'embouchure du fleuve Bouregreg. ', 'Mausolée Mohamed V', '1658251149380-file.jpg', 2);

-- --------------------------------------------------------

--
-- Structure de la table `natures`
--

DROP TABLE IF EXISTS `natures`;
CREATE TABLE IF NOT EXISTS `natures` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `map` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `ville_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjnmyslp596tfgvfgpx2eo1yya` (`ville_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `natures`
--

INSERT INTO `natures` (`id`, `description`, `map`, `photo`, `type`, `ville_id`) VALUES
(1, 'Cascade Ouzout', 'Map', '1656450228821-file.jpg', 'Cascade', 4),
(2, 'Haut Atlas', 'Map', '1656450301409-file.jpg', 'Montagne', 5),
(5, 'Dunes de l\'Erg Chebbi', 'Map', '1657199873729-file.jpg', 'Dune', 8),
(6, 'Vallée de Todga', 'Map', '1657200220663-file.jpg', 'Vallée', 5),
(7, 'Paradise Valley', 'Map', '1657200336748-file.jpg', 'Vallée', 10);

-- --------------------------------------------------------

--
-- Structure de la table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
CREATE TABLE IF NOT EXISTS `refreshtoken` (
  `id` bigint NOT NULL,
  `expiry_date` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_or156wbneyk8noo4jstv55ii3` (`token`),
  KEY `FKa652xrdji49m4isx38pp4p80p` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `expiry_date`, `token`, `user_id`) VALUES
(1, '2022-07-08 23:43:13', '93d10183-3f0f-422f-b113-5b78b7abeb0b', 12),
(2, '2022-07-08 23:50:12', '385b888e-034d-4608-9b5b-1fc67d2386f2', 12),
(3, '2022-07-08 23:58:39', '558cf7c9-952f-4871-af9c-60256947e369', 12),
(4, '2022-07-09 00:05:31', '0ce3167f-f146-40a7-9b49-264638e01565', 12),
(5, '2022-07-09 00:12:53', '6ce5c54f-9377-4d4d-83e7-5170dd9fa341', 12),
(6, '2022-07-09 11:33:21', '531abc2b-6c2e-4135-9581-8120dede5a5b', 1),
(7, '2022-07-09 14:20:23', '81f0a709-051b-4872-817a-9e52e435291b', 1),
(8, '2022-07-09 14:25:17', 'f55fef9f-957c-450c-9085-c1ef14a7ebbe', 1),
(9, '2022-07-09 14:30:05', '9792805e-da43-4a03-9039-0e022028ea47', 12),
(10, '2022-07-09 14:45:52', '6bbef7a9-f9c0-4a27-86c1-d03c6154942c', 1),
(11, '2022-07-09 14:56:25', '75d46770-1bf8-44b1-84b2-217daaa306b8', 12),
(12, '2022-07-09 14:59:04', 'c63ef861-093b-44c4-866c-fb9dc9e6ca72', 12),
(13, '2022-07-09 15:00:29', '45e66d1a-1100-407e-aadc-938e366c070f', 12),
(14, '2022-07-09 15:03:20', '8269e2b9-1b29-46f4-908c-e16bf019d5c4', 12),
(15, '2022-07-09 15:05:25', 'dc4c3291-f9dc-43b0-96d2-1c720f084628', 12),
(16, '2022-07-09 15:09:22', '9f73b7d8-c4b2-40a3-a508-91182cd7dd36', 12),
(21, '2022-07-09 15:36:39', 'ac8fff97-985a-4781-bde6-2c833b18138e', 1),
(22, '2022-07-09 15:43:10', 'd2e439bf-03fa-4f74-ab5c-b63df71c41c2', 1),
(23, '2022-07-09 16:20:13', '54d11b7b-48bf-4201-b9d5-dc51bafa215c', 1),
(24, '2022-07-09 18:10:01', '96319202-9f13-4039-a534-45d554464f08', 1),
(25, '2022-07-13 16:26:07', '910fae0d-5c71-4968-9889-a0b9174f07df', 1),
(26, '2022-07-19 17:31:56', '933005c7-5d09-4569-a2d2-9afc239303cf', 13),
(27, '2022-07-20 13:37:28', 'fa502f55-a5d4-4455-ae82-c3053c6e5c60', 1),
(28, '2022-07-20 13:38:13', 'e23e0774-eb55-4592-8762-1e43181b7a7c', 12),
(29, '2022-07-20 13:49:18', '72a39f63-dda3-43ea-a064-2fa2284cc750', 12),
(30, '2022-07-20 14:53:39', 'd1867ca1-10ca-432c-bd5c-4ddf445e1d30', 13),
(31, '2022-07-20 14:55:20', '752bf8b5-2def-4c19-91e9-5ebc6cb995f0', 12),
(32, '2022-07-20 15:27:16', '0039e1d1-af8a-40fd-94bc-e916b8832b22', 16),
(33, '2022-07-20 15:29:36', 'bb62249a-114e-4419-9cb5-983f4a272ba6', 12),
(34, '2022-07-20 15:30:48', 'dee1809b-64fa-47b8-934f-c6e9384e59fc', 16),
(35, '2022-07-20 15:42:18', 'fe7e97d8-470e-4504-928f-bcca2538ac5c', 12),
(36, '2022-07-20 17:53:43', '05f3896b-e3ff-48c6-b087-dc3d60447203', 1),
(37, '2022-07-20 18:31:53', 'c28cbb72-556c-45d2-b28d-74ffcc71131b', 26);

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `note` int NOT NULL,
  `logement_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UniqueReviewAndLogement` (`logement_id`,`user_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `reviews`
--

INSERT INTO `reviews` (`id`, `created_at`, `message`, `note`, `logement_id`, `user_id`, `updated_at`) VALUES
(1, '2022-07-18 15:37:51', 'Super !!!', 3, 2, 12, '2022-07-18 15:37:51'),
(2, '2022-07-18 15:52:41', 'J\'ai adoré', 4, 2, 16, '2022-07-18 15:52:41'),
(7, '2022-07-19 14:52:56', 'Null ', 1, 1, 12, NULL),
(8, '2022-07-19 14:53:57', 'Cool', 3, 1, 13, '2022-07-19 14:53:57'),
(10, '2022-07-19 18:33:06', 'Je recommande !!!', 5, 13, 26, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_MODERATOR'),
(3, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `hotel_riad_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbt1fyvtv339nqhc05h6r3lyid` (`hotel_riad_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `tourists`
--

DROP TABLE IF EXISTS `tourists`;
CREATE TABLE IF NOT EXISTS `tourists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t5mslnjmynyoegfkn85tnorx0` (`email`),
  UNIQUE KEY `UK_kvuwjw1bmmvk519lp4lw3hxax` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `tourists`
--

INSERT INTO `tourists` (`id`, `email`, `password`, `avatar`, `last_name`, `name`, `pays`, `telephone`) VALUES
(1, 'client1@gmail.com', 'password', 'avatar_2.png', 'Last Name', 'Client 1', 'Italie', '0540140786'),
(2, 'client2@gmail.com', 'password', 'avatar_1.png', 'Last Name', 'Client 2', 'Maroc', '0640141070'),
(29, 'mhdabdel@gmail.com', 'password', '1655947959411-file.jpeg', 'Mohamadou', 'Abdoul Bagui', 'Maroc', '640141068');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2p58gbqhxvue2igoderm0gh2c` (`telephone`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `avatar`, `email`, `last_name`, `name`, `password`, `pays`, `telephone`) VALUES
(1, NULL, 'admin@admin.com', NULL, 'admin', '$2a$10$6f7ykiY7wCQokpGy4lxnz.kbydqb/6A3bdeMP2YWWAgmwNWMTe8f6', 'maroc', '0640141070'),
(12, '1658250157374-file.jpeg', 'mhdabdel151@gmail.com', 'Abdoul Bagui', 'Mohamadou', '$2a$10$ptDL9tB9BKi3cxaVik4wiujxlmdz7XgeP3t4q34a.yHAi/0kz2/9u', 'Cameroun', '0640141075'),
(13, NULL, 'h.ouafae@gmail.com', 'Hdili', 'Ouafae', '$2a$10$rj5eA9OgSuE4vv90wmVAxupBry/3mmZd1byROTMDhF.Zb1jDDyVT6', 'Maroc', '0645654634'),
(16, NULL, 'halima@gmail.com', 'Maghraoui', 'Halima', '$2a$10$EEC/UeOr8RtcPiEdmf3SCuKbHg2AX0.vT.gn3iuX0rAOw9ixtCT26', 'Maroc', '0655443322'),
(25, '', 'aziza@gmail.com', 'Saufi', 'Aziza', '$2a$10$vPgQ0f2fwDbmZRO0HgvIveipSnYKN3jKr10qc.vDK7q4e/3NcSPvO', 'Maroc', '0678905677'),
(26, '', 'sara@gmail.com', 'Faqihi', 'Sara', '$2a$10$RMEaYga.oFywCDQT07qA7O7WJ6QBOXGhvLCZXruaB.VRW043XkJd.', 'Maroc', '065456545');

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(12, 1),
(13, 1),
(16, 1),
(25, 1),
(26, 1),
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `villas`
--

DROP TABLE IF EXISTS `villas`;
CREATE TABLE IF NOT EXISTS `villas` (
  `jardin` bit(1) NOT NULL,
  `nombre_chambre` bigint DEFAULT NULL,
  `piscine` bit(1) NOT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `villes_touristiques`
--

DROP TABLE IF EXISTS `villes_touristiques`;
CREATE TABLE IF NOT EXISTS `villes_touristiques` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `map` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `meteo` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `surface` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hdfbu375kc2175m1j51ta46at` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `villes_touristiques`
--

INSERT INTO `villes_touristiques` (`id`, `map`, `meteo`, `name`, `photo`, `surface`) VALUES
(1, 'https://goo.gl/maps/XJn2wqWQZxJMx8ZM7', 'Ensoléillé', 'Casablanca', '1656449625448-file.jpg', 400),
(2, 'https://goo.gl/maps/3tbUEUKm61zbhvS1A', 'Ensoiléillé', 'Rabat', '1656449659746-file.jpg', 300),
(3, 'https://goo.gl/maps/bqNZ1gPgsvH5UBgR6', 'Humide', 'Tanger', '1656449705689-file.jpg', 200),
(4, 'https://goo.gl/maps/s2q7CMF52515tAG8A', 'Froid', 'Ifrane', '1656449740346-file.jpg', 150),
(5, 'https://goo.gl/maps/K65Ns2y35Soajfeo7', 'Chaud', 'Marrackech', '1656450162647-file.jpg', 350),
(8, 'https://goo.gl/maps/XXzrhsbYVuvQ8QcQ9', 'Chaud', 'Fès', '1657129913812-file.jpg', 200),
(10, 'https://goo.gl/maps/vjSMiCMUADCpcMVD7', 'Cool', 'Agadir', '1657200309485-file.jpg', 65),
(12, '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52493.07031762391!2d-1.9074780999999998!3d34.6845705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7864984106d6ef%3A0x1d86b33244c4650!2sOujda!5e0!3m2!1sfr!2sma!4v1658250292730!5m2!1sfr!2sma\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', 'Cool', 'Oujda', '1658250311689-file.jpg', 90);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appartements`
--
ALTER TABLE `appartements`
  ADD CONSTRAINT `FKi0gqhpd6wmwroucp33u5cgas8` FOREIGN KEY (`id`) REFERENCES `logements` (`id`);

--
-- Contraintes pour la table `chambres`
--
ALTER TABLE `chambres`
  ADD CONSTRAINT `FKdnb7bebaqdxpakk36fn0gcags` FOREIGN KEY (`id`) REFERENCES `logements` (`id`),
  ADD CONSTRAINT `FKfcafyv3dud743g35knyuqodxv` FOREIGN KEY (`holet_riad_id`) REFERENCES `hotels_riads` (`id`);

--
-- Contraintes pour la table `guides_touristiques`
--
ALTER TABLE `guides_touristiques`
  ADD CONSTRAINT `FK7u5jd8qubejbdu0dsmfbsap5t` FOREIGN KEY (`ville_id`) REFERENCES `villes_touristiques` (`id`);

--
-- Contraintes pour la table `logements`
--
ALTER TABLE `logements`
  ADD CONSTRAINT `FKdvjencsuiki0k243sgtfqqwb1` FOREIGN KEY (`ville_id`) REFERENCES `villes_touristiques` (`id`);

--
-- Contraintes pour la table `monuments`
--
ALTER TABLE `monuments`
  ADD CONSTRAINT `FK7mopyj3ljr4980onyaecm9kgp` FOREIGN KEY (`ville_id`) REFERENCES `villes_touristiques` (`id`);

--
-- Contraintes pour la table `natures`
--
ALTER TABLE `natures`
  ADD CONSTRAINT `FKjnmyslp596tfgvfgpx2eo1yya` FOREIGN KEY (`ville_id`) REFERENCES `villes_touristiques` (`id`);

--
-- Contraintes pour la table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `FKa652xrdji49m4isx38pp4p80p` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK6reyafnxb5l1cett0eqs9xg87` FOREIGN KEY (`logement_id`) REFERENCES `logements` (`id`),
  ADD CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `FKbt1fyvtv339nqhc05h6r3lyid` FOREIGN KEY (`hotel_riad_id`) REFERENCES `hotels_riads` (`id`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `villas`
--
ALTER TABLE `villas`
  ADD CONSTRAINT `FKhkkb8mn91d4cfjxs1xnapspgp` FOREIGN KEY (`id`) REFERENCES `logements` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
