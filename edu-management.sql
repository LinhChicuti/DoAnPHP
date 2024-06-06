-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 03, 2024 lúc 04:31 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `edu-management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `userName`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$FM2KT1iDiNA4uPwokd9fQ.A0T9JSB7DKwoovI1kq8LFBYBlFHs.rm', 3, NULL, NULL),
(2, 'chinl', '$2y$10$ZYHRoaW1SRtaeKLWla.lPuVkhEpIuUCV0QwlXvc9uS3ZOlZpFhROe', 1, '2024-06-03 01:32:19', '2024-06-03 01:32:19'),
(3, 'chinlteacher', '$2y$10$J9OHnqgvqiHEIqY7HzLsveu/29O.b4IrjgL2itKsOJ4hqjNkvJiUK', 2, '2024-06-03 01:35:47', '2024-06-03 01:35:47'),
(4, 'quangwork', '$2y$10$oOIs6kmfiIg8iRa3AF6hR.1xZVPpGHBqxnKfiSdpmkUMvhmujY48W', 2, '2024-06-03 02:09:03', '2024-06-03 02:09:03'),
(5, 'gvThao', '$2y$10$lzQ2mtYGnMdyozcp3O3YVu0n8wAX9qMsZVubDpIOWAFN6k2siZdPa', 2, '2024-06-03 02:12:11', '2024-06-03 02:12:11'),
(6, 'gv02', '$2y$10$S1M8OAC970gltbIEVmSgI.mbZ5aPkRNJt5O/aN8lZD8jtXY7cZate', 2, '2024-06-03 03:32:54', '2024-06-03 03:32:54'),
(7, 'xuantinh', '$2y$10$B8owh/.uH5a1stei6fbNau9TOyE7HOQL3T25PH7LaafFb9uZ4ZTR2', 1, '2024-06-03 03:35:21', '2024-06-03 03:35:21'),
(8, 'hung', '$2y$10$5ok.W0/9iDAWOE.A059e1untssyX11vi/mC1I8eKgDFDFLLFOUYBa', 1, '2024-06-03 03:35:51', '2024-06-03 03:35:51'),
(9, 'thuhoai', '$2y$10$n/I0vrmOMQGgru.uiS96zOj8zwLNQmWuT1Aqk4NJJwP5fzycEukJy', 1, '2024-06-03 04:32:01', '2024-06-03 04:32:01'),
(10, 'thib', '$2y$10$8TLj8ectMeJrpdeQNROCMOj.ILn0wb9gDBGIrbE/NwBqMSyeQ5eLW', 1, '2024-06-03 04:32:46', '2024-06-03 04:32:46'),
(11, 'lvloi', '$2y$10$FGKkatMcIcTdoBob1q4kMOYwcrMtUrgwewWHXCgV8VvrJGup/nwbS', 1, '2024-06-03 04:44:05', '2024-06-03 04:44:05'),
(12, 'lam111', '$2y$10$NAudC0qyBQGLg865Ia7nTOuOQ7V5YdSYRLIYuQbiFDAxKPJKaT662', 1, '2024-06-03 07:05:26', '2024-06-03 07:05:26'),
(13, 'nhu111', '$2y$10$VbeF2O75loqfY5UUmb4S4eA7oKWddNZT2Ij4VZCPKSCbGu22SN/dq', 1, '2024-06-03 07:08:13', '2024-06-03 07:08:13'),
(14, 'nga1', '$2y$10$4DSDvzvwftK5/PFZvOKFhu9rtfltrmPHxjm5hOEk2/DwyaOzvmHFS', 1, '2024-06-03 07:09:04', '2024-06-03 07:09:04'),
(15, 'ha1', '$2y$10$xHQZgwnG4YrlQRZda5VyJehHv25PxPmE5QqjfOmqqraFekwRLqlj6', 1, '2024-06-03 07:10:13', '2024-06-03 07:10:13'),
(16, 'han1', '$2y$10$nQg7z3CScitogEMngunu4ex9wAcQpmigeSPyK6gQUDjh1EjCNFCaS', 1, '2024-06-03 07:11:29', '2024-06-03 07:11:29'),
(17, 'hanh1', '$2y$10$hSM39owslq0/6ssFdeSIu.Zrhx.RQj2sGvl4SFxNyjPI4/QPGB582', 1, '2024-06-03 07:12:26', '2024-06-03 07:12:26'),
(18, 'hoi1', '$2y$10$gtcnaHLoaoNwxYqelZtiaODe25skXMu1dUXwzwiNlbzxqPbjPJEM6', 1, '2024-06-03 07:12:49', '2024-06-03 07:12:49'),
(19, 'bao1', '$2y$10$pE5EZBhTfnN/2qw2VcR6deV2iV1JUMhRFSQgSchhQGMNFyVikOXhq', 1, '2024-06-03 07:13:36', '2024-06-03 07:13:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accountsession`
--

CREATE TABLE `accountsession` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `accountId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `accountsession`
--

INSERT INTO `accountsession` (`id`, `accountId`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-06-03 01:30:02', '2024-06-03 01:30:02'),
(2, 1, '2024-06-03 01:51:15', '2024-06-03 01:51:15'),
(3, 3, '2024-06-03 02:13:58', '2024-06-03 02:13:58'),
(4, 1, '2024-06-03 02:16:35', '2024-06-03 02:16:35'),
(5, 2, '2024-06-03 02:18:44', '2024-06-03 02:18:44'),
(6, 1, '2024-06-03 02:53:52', '2024-06-03 02:53:52'),
(7, 2, '2024-06-03 02:54:47', '2024-06-03 02:54:47'),
(8, 3, '2024-06-03 02:55:15', '2024-06-03 02:55:15'),
(9, 2, '2024-06-03 02:56:44', '2024-06-03 02:56:44'),
(10, 2, '2024-06-03 02:58:45', '2024-06-03 02:58:45'),
(11, 1, '2024-06-03 03:02:05', '2024-06-03 03:02:05'),
(12, 2, '2024-06-03 03:06:20', '2024-06-03 03:06:20'),
(13, 3, '2024-06-03 03:07:21', '2024-06-03 03:07:21'),
(14, 1, '2024-06-03 03:15:21', '2024-06-03 03:15:21'),
(15, 1, '2024-06-03 03:21:24', '2024-06-03 03:21:24'),
(16, 3, '2024-06-03 03:24:36', '2024-06-03 03:24:36'),
(17, 1, '2024-06-03 03:25:31', '2024-06-03 03:25:31'),
(18, 2, '2024-06-03 03:26:18', '2024-06-03 03:26:18'),
(19, 2, '2024-06-03 03:27:01', '2024-06-03 03:27:01'),
(20, 2, '2024-06-03 03:27:02', '2024-06-03 03:27:02'),
(21, 3, '2024-06-03 03:27:28', '2024-06-03 03:27:28'),
(22, 1, '2024-06-03 03:32:09', '2024-06-03 03:32:09'),
(23, 6, '2024-06-03 03:33:28', '2024-06-03 03:33:28'),
(24, 1, '2024-06-03 03:34:45', '2024-06-03 03:34:45'),
(25, 1, '2024-06-03 04:03:14', '2024-06-03 04:03:14'),
(26, 1, '2024-06-03 05:09:51', '2024-06-03 05:09:51'),
(27, 1, '2024-06-03 05:46:26', '2024-06-03 05:46:26'),
(28, 2, '2024-06-03 05:47:31', '2024-06-03 05:47:31'),
(29, 3, '2024-06-03 05:48:15', '2024-06-03 05:48:15'),
(30, 1, '2024-06-03 05:51:55', '2024-06-03 05:51:55'),
(31, 3, '2024-06-03 06:24:13', '2024-06-03 06:24:13'),
(32, 1, '2024-06-03 06:25:18', '2024-06-03 06:25:18'),
(33, 3, '2024-06-03 06:25:40', '2024-06-03 06:25:40'),
(34, 2, '2024-06-03 06:25:53', '2024-06-03 06:25:53'),
(35, 3, '2024-06-03 06:26:18', '2024-06-03 06:26:18'),
(36, 8, '2024-06-03 06:27:56', '2024-06-03 06:27:56'),
(37, 2, '2024-06-03 06:28:16', '2024-06-03 06:28:16'),
(38, 3, '2024-06-03 06:28:44', '2024-06-03 06:28:44'),
(39, 3, '2024-06-03 06:29:46', '2024-06-03 06:29:46'),
(40, 1, '2024-06-03 06:30:24', '2024-06-03 06:30:24'),
(41, 8, '2024-06-03 06:30:40', '2024-06-03 06:30:40'),
(42, 1, '2024-06-03 06:31:00', '2024-06-03 06:31:00'),
(43, 2, '2024-06-03 06:31:16', '2024-06-03 06:31:16'),
(44, 8, '2024-06-03 06:31:34', '2024-06-03 06:31:34'),
(45, 7, '2024-06-03 06:31:57', '2024-06-03 06:31:57'),
(46, 1, '2024-06-03 06:32:15', '2024-06-03 06:32:15'),
(47, 9, '2024-06-03 06:32:37', '2024-06-03 06:32:37'),
(48, 10, '2024-06-03 06:32:56', '2024-06-03 06:32:56'),
(49, 3, '2024-06-03 06:33:06', '2024-06-03 06:33:06'),
(50, 1, '2024-06-03 07:04:30', '2024-06-03 07:04:30'),
(51, 1, '2024-06-03 07:07:27', '2024-06-03 07:07:27'),
(52, 3, '2024-06-03 07:16:48', '2024-06-03 07:16:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attendance`
--

CREATE TABLE `attendance` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `studentId` bigint(20) UNSIGNED NOT NULL,
  `sessionId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT -1 COMMENT '-1: Chưa điểm danh, 0: Vắng, 1: Có mặt'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `attendance`
--

INSERT INTO `attendance` (`id`, `studentId`, `sessionId`, `created_at`, `updated_at`, `status`) VALUES
(2, 1, 5, '2024-06-03 03:08:32', '2024-06-03 03:08:38', 1),
(3, 1, 5, '2024-06-03 03:08:32', '2024-06-03 03:08:42', 1),
(4, 1, 7, '2024-06-03 03:28:29', '2024-06-03 03:28:36', 1),
(5, 1, 8, '2024-06-03 06:27:06', '2024-06-03 06:27:15', 1),
(6, 1, 9, '2024-06-03 06:33:46', '2024-06-03 06:34:02', 1),
(7, 2, 9, '2024-06-03 06:33:46', '2024-06-03 06:34:07', 1),
(8, 4, 9, '2024-06-03 06:33:46', '2024-06-03 06:34:10', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `class`
--

CREATE TABLE `class` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `teacherId` bigint(20) UNSIGNED NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `numberOfSession` int(11) NOT NULL,
  `departmentId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `class`
--

INSERT INTO `class` (`id`, `name`, `teacherId`, `courseName`, `startDate`, `endDate`, `status`, `numberOfSession`, `departmentId`, `created_at`, `updated_at`) VALUES
(3, 'PHP', 1, 'PHP 1', '2024-06-03 00:00:00', '2024-06-10 00:00:00', 'Open', 10, 1, '2024-06-03 03:01:36', '2024-06-03 03:08:58'),
(4, 'Java', 1, 'java01', '2024-06-03 00:00:00', '2024-06-17 00:00:00', 'Open', 15, 1, '2024-06-03 03:24:55', '2024-06-03 03:27:59'),
(5, 'Đi động', 1, 'DD01', '2024-06-03 00:00:00', '2024-06-24 00:00:00', 'Open', 15, 1, '2024-06-03 06:24:54', '2024-06-03 06:26:44'),
(6, 'PTTK', 1, 'pttk01', '2024-06-03 00:00:00', '2024-06-24 00:00:00', 'Open', 15, 1, '2024-06-03 06:30:16', '2024-06-03 06:33:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classregistration`
--

CREATE TABLE `classregistration` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `studentId` bigint(20) UNSIGNED NOT NULL,
  `classId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classstudent`
--

CREATE TABLE `classstudent` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `studentId` bigint(20) UNSIGNED NOT NULL,
  `classId` bigint(20) UNSIGNED NOT NULL,
  `score` decimal(4,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `classstudent`
--

INSERT INTO `classstudent` (`id`, `studentId`, `classId`, `score`, `created_at`, `updated_at`) VALUES
(2, 1, 3, 0.00, '2024-06-03 03:07:38', '2024-06-03 03:07:38'),
(4, 1, 4, 0.00, '2024-06-03 03:27:46', '2024-06-03 03:27:46'),
(5, 1, 5, 0.00, '2024-06-03 06:26:37', '2024-06-03 06:26:37'),
(6, 1, 6, 0.00, '2024-06-03 06:33:20', '2024-06-03 06:33:20'),
(7, 2, 6, 0.00, '2024-06-03 06:33:21', '2024-06-03 06:33:21'),
(8, 4, 6, 0.00, '2024-06-03 06:33:23', '2024-06-03 06:33:23'),
(9, 14, 3, 0.00, '2024-06-03 14:14:08', '2024-06-03 14:14:08'),
(10, 13, 3, 0.00, '2024-06-03 14:14:08', '2024-06-03 14:14:08'),
(11, 12, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(12, 11, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(13, 10, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(14, 2, 3, 0.00, '2024-06-03 14:14:08', '2024-06-03 14:14:08'),
(15, 3, 3, 0.00, '2024-06-03 14:14:08', '2024-06-03 14:14:08'),
(16, 4, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(17, 5, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(18, 6, 3, 0.00, '2024-06-03 14:14:59', '2024-06-03 14:14:59'),
(19, 7, 3, 0.00, '2024-06-03 14:20:41', '2024-06-03 14:20:41'),
(20, 8, 3, 0.00, '2024-06-03 14:20:41', '2024-06-03 14:20:41'),
(21, 9, 3, 0.00, '2024-06-03 14:20:41', '2024-06-03 14:20:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department`
--

CREATE TABLE `department` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `department`
--

INSERT INTO `department` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Marketing', '2024-06-03 01:31:42', '2024-06-03 01:31:42'),
(2, 'IT', '2024-06-03 02:07:22', '2024-06-03 02:07:22'),
(3, 'Event', '2024-06-03 02:07:32', '2024-06-03 02:07:32'),
(4, 'QTKD', '2024-06-03 03:36:16', '2024-06-03 03:36:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2024_05_10_000001_create_tables', 1),
(3, '2024_05_31_175615_add_status_to_attendance_table', 1),
(4, '2024_06_02_045634_master_data', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `session`
--

CREATE TABLE `session` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `classId` bigint(20) UNSIGNED NOT NULL,
  `sessionDate` datetime NOT NULL,
  `sessionLocation` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `session`
--

INSERT INTO `session` (`id`, `classId`, `sessionDate`, `sessionLocation`, `status`, `created_at`, `updated_at`) VALUES
(5, 3, '2024-06-03 00:00:00', '140 LTT', 1, '2024-06-03 03:08:28', '2024-06-03 03:08:32'),
(6, 3, '2024-06-04 00:00:00', '140 LTT', 0, '2024-06-03 03:09:13', '2024-06-03 03:09:13'),
(7, 4, '2024-06-03 00:00:00', 'huit', 1, '2024-06-03 03:28:24', '2024-06-03 03:28:29'),
(8, 5, '2024-06-03 00:00:00', '140 LTT', 1, '2024-06-03 06:27:01', '2024-06-03 06:27:06'),
(9, 6, '2024-06-03 00:00:00', 'HUIT', 1, '2024-06-03 06:33:40', '2024-06-03 06:33:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

CREATE TABLE `student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `departmentId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`id`, `userId`, `departmentId`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-06-03 01:32:19', '2024-06-03 01:32:19'),
(2, 6, 1, '2024-06-03 03:35:21', '2024-06-03 03:35:21'),
(3, 7, 2, '2024-06-03 03:35:51', '2024-06-03 03:35:51'),
(4, 8, 1, '2024-06-03 04:32:01', '2024-06-03 04:32:01'),
(5, 9, 4, '2024-06-03 04:32:46', '2024-06-03 04:32:46'),
(6, 10, 3, '2024-06-03 04:44:05', '2024-06-03 04:44:05'),
(7, 11, 1, '2024-06-03 07:05:26', '2024-06-03 07:05:26'),
(8, 12, 1, '2024-06-03 07:08:13', '2024-06-03 07:08:13'),
(9, 13, 1, '2024-06-03 07:09:04', '2024-06-03 07:09:04'),
(10, 14, 1, '2024-06-03 07:10:13', '2024-06-03 07:10:13'),
(11, 15, 1, '2024-06-03 07:11:29', '2024-06-03 07:11:29'),
(12, 16, 1, '2024-06-03 07:12:26', '2024-06-03 07:12:26'),
(13, 17, 1, '2024-06-03 07:12:49', '2024-06-03 07:12:49'),
(14, 18, 1, '2024-06-03 07:13:36', '2024-06-03 07:13:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teacher`
--

CREATE TABLE `teacher` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `departmentId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `teacher`
--

INSERT INTO `teacher` (`id`, `userId`, `departmentId`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2024-06-03 01:35:47', '2024-06-03 01:35:47'),
(2, 3, 2, '2024-06-03 02:09:03', '2024-06-03 02:09:03'),
(3, 4, 3, '2024-06-03 02:12:11', '2024-06-03 02:12:11'),
(4, 5, 1, '2024-06-03 03:32:54', '2024-06-03 03:32:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `accountId` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `gender`, `address`, `accountId`, `created_at`, `updated_at`) VALUES
(1, 'Nguyễn Linh Chi', 'chinl@gmail.com', 'Female', 'B4/9 Ql50, Bình Hưng - Bình Chánh - TP HCM', 2, '2024-06-03 01:32:19', '2024-06-03 01:32:19'),
(2, 'Mrs. Chi', 'chinlwork@gmail.com', 'Female', 'B4/9 Ql50, Bình Hưng - Bình Chánh - TP HCM', 3, '2024-06-03 01:35:47', '2024-06-03 01:35:47'),
(3, 'Mr. Quang', 'quangwork@gmail.com', 'Male', '24A yahoo', 4, '2024-06-03 02:09:03', '2024-06-03 02:09:03'),
(4, 'Mr. Thao', 'thao000@gmail.com', 'FeMale', 'TP HCM', 5, '2024-06-03 02:12:11', '2024-06-03 02:12:11'),
(5, 'Nguyen Van A', 'vana@gmail.com', 'Male', '140LTt', 6, '2024-06-03 03:32:54', '2024-06-03 03:32:54'),
(6, 'Xuan Tinh', 'tinh123@gmail.com', 'Male', 'TP HCM', 7, '2024-06-03 03:35:21', '2024-06-03 03:35:21'),
(7, 'Hung', 'hung123@gmail.com', 'Male', 'Tp HCM', 8, '2024-06-03 03:35:51', '2024-06-03 03:35:51'),
(8, 'Tran Thu Hoai', 'hoaithu@gmail.com', 'Female', 'Bình Định', 9, '2024-06-03 04:32:01', '2024-06-03 04:32:01'),
(9, 'Nguyen Thi B', 'b@gmail.com', 'Male', 'Vũng Tàu', 10, '2024-06-03 04:32:46', '2024-06-03 04:32:46'),
(10, 'Lê Văn Lợi', 'lvl@gmail.com', 'Male', 'Long An', 11, '2024-06-03 04:44:05', '2024-06-03 04:44:05'),
(11, 'Lam', 'lam@gmail.com', 'Male', 'Ha Noi', 12, '2024-06-03 07:05:26', '2024-06-03 07:05:26'),
(12, 'Nhu', 'nhu111@gmail.com', 'FeMale', '24A yahoo', 13, '2024-06-03 07:08:13', '2024-06-03 07:08:13'),
(13, 'Nga', 'nga1@gmail.com', 'FeMale', '24A yahoo', 14, '2024-06-03 07:09:04', '2024-06-03 07:09:04'),
(14, 'Ha', 'ha1@gmail.com', 'FeMale', '24A yahoo', 15, '2024-06-03 07:10:13', '2024-06-03 07:10:13'),
(15, 'Han', 'han1@gmail.com', 'FeMale', '24A yahoo', 16, '2024-06-03 07:11:29', '2024-06-03 07:11:29'),
(16, 'Hanh', 'hanh1@gmail.com', 'FeMale', '24A yahoo', 17, '2024-06-03 07:12:26', '2024-06-03 07:12:26'),
(17, 'Hoi', 'hoi1@gmail.com', 'FeMale', '24A yahoo', 18, '2024-06-03 07:12:49', '2024-06-03 07:12:49'),
(18, 'Bao', 'bao1@gmail.com', 'Male', '24A yahoo', 19, '2024-06-03 07:13:36', '2024-06-03 07:13:36');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `accountsession`
--
ALTER TABLE `accountsession`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accountsession_accountid_foreign` (`accountId`);

--
-- Chỉ mục cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_studentid_foreign` (`studentId`),
  ADD KEY `attendance_sessionid_foreign` (`sessionId`);

--
-- Chỉ mục cho bảng `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_teacherid_foreign` (`teacherId`),
  ADD KEY `class_departmentid_foreign` (`departmentId`);

--
-- Chỉ mục cho bảng `classregistration`
--
ALTER TABLE `classregistration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classregistration_studentid_foreign` (`studentId`),
  ADD KEY `classregistration_classid_foreign` (`classId`);

--
-- Chỉ mục cho bảng `classstudent`
--
ALTER TABLE `classstudent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classstudent_studentid_foreign` (`studentId`),
  ADD KEY `classstudent_classid_foreign` (`classId`);

--
-- Chỉ mục cho bảng `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_classid_foreign` (`classId`);

--
-- Chỉ mục cho bảng `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_userid_foreign` (`userId`),
  ADD KEY `student_departmentid_foreign` (`departmentId`);

--
-- Chỉ mục cho bảng `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_userid_foreign` (`userId`),
  ADD KEY `teacher_departmentid_foreign` (`departmentId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_accountid_foreign` (`accountId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `accountsession`
--
ALTER TABLE `accountsession`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `class`
--
ALTER TABLE `class`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `classregistration`
--
ALTER TABLE `classregistration`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `classstudent`
--
ALTER TABLE `classstudent`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `session`
--
ALTER TABLE `session`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `student`
--
ALTER TABLE `student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `accountsession`
--
ALTER TABLE `accountsession`
  ADD CONSTRAINT `accountsession_accountid_foreign` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_sessionid_foreign` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_studentid_foreign` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_teacherid_foreign` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `classregistration`
--
ALTER TABLE `classregistration`
  ADD CONSTRAINT `classregistration_classid_foreign` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `classregistration_studentid_foreign` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `classstudent`
--
ALTER TABLE `classstudent`
  ADD CONSTRAINT `classstudent_classid_foreign` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `classstudent_studentid_foreign` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_classid_foreign` FOREIGN KEY (`classId`) REFERENCES `class` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_accountid_foreign` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
