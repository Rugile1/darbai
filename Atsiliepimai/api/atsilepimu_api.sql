-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 10:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atsilepimu_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `atsilepimai`
--

CREATE TABLE `atsilepimai` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `text` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `atsilepimai`
--

INSERT INTO `atsilepimai` (`id`, `email`, `name`, `text`, `date_time`, `rating`) VALUES
(1, 'user@example.com', 'John Doe', 'Great service! Highly recommended.', '2023-12-07 10:30:00', 5),
(2, 'anotheruser@example.com', 'Jane Smith', 'Good experience overall.', '2023-12-07 11:45:00', 3),
(3, 'testuser@example.com', 'Bob Johnson', 'Could be better. Not satisfied.', '2023-12-07 13:20:00', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atsilepimai`
--
ALTER TABLE `atsilepimai`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
