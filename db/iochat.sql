-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2017 at 05:59 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iochat`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `help_as` varchar(100) NOT NULL,
  `experties` varchar(100) NOT NULL,
  `skills` varchar(1000) NOT NULL,
  `url_for_user` varchar(200) NOT NULL,
  `color_body_font` varchar(100) NOT NULL,
  `color_scheme_menu` varchar(100) NOT NULL,
  `color_scheme_active` varchar(100) NOT NULL,
  `color_scheme_font` varchar(100) NOT NULL,
  `background_image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `first_name`, `last_name`, `gender`, `help_as`, `experties`, `skills`, `url_for_user`, `color_body_font`, `color_scheme_menu`, `color_scheme_active`, `color_scheme_font`, `background_image`) VALUES
(1, 'admin', '', 'admin@admin', 'admin', '', '', '', '', '', '', '', '', '', '', '', ''),
(21, 'user', 'q', 'cd@e', 'dfdf', 'dfdf', 'fddf', 'male', 'An Organization', '', 'QuickBooks,', 'chathub.whyalog.org/gfbf', '#fff', '#59524c', '#c7a589', '#000', 'images/gallery/1.png'),
(23, 'user', 'Hasnain', 'h@a', '12345', 'Hasnain', 'Shahariar', 'male', 'Personal', '', 'Accounting ,Logical Thinking,Problem Solving,', 'chathub.whyalog.org/taslim', '#fff', '#523f6d', '#a3b745', '#000', 'images/gallery/1.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
