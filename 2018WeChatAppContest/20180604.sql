-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-06-04 14:40:32
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--
CREATE DATABASE IF NOT EXISTS `cAuth` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cAuth`;

-- --------------------------------------------------------

--
-- 表的结构 `cAppinfo`
--

CREATE TABLE `cAppinfo` (
  `appid` char(36) DEFAULT NULL,
  `secret` char(64) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `login_duration` int(11) DEFAULT NULL,
  `qcloud_appid` char(64) DEFAULT NULL,
  `session_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `cAppinfo`
--

INSERT INTO `cAppinfo` (`appid`, `secret`, `ip`, `login_duration`, `qcloud_appid`, `session_duration`) VALUES
('wxbb4d1a0ff0d87b8e', '', '123.207.12.46', 1000, '1253884224', 2000);

-- --------------------------------------------------------

--
-- 表的结构 `cSessionInfo`
--

CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

--
-- 转存表中的数据 `cSessionInfo`
--

INSERT INTO `cSessionInfo` (`open_id`, `uuid`, `skey`, `create_time`, `last_visit_time`, `session_key`, `user_info`) VALUES
('hellokitty', '', '', '2018-06-04 10:02:49', '2018-06-04 10:02:49', '', '{\"openId\":\"hellokitty\",\"nickName\":\"官方账号\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"NanJing\",\"province\":\"Jiangsu\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHCXRI6jFcxO7WHbhBX1oYsiclwEicJUddBOpBicNHF9k74Lic235O8cpH6W3QibocOibaSKbDWic3AJZQ/132\",\"watermark\":{\"timestamp\":0,\"appid\":\"\"}}'),
('onwg346GDE92Dy5332l6XZXpX2eI', 'd73b05b4-1f5f-4b0b-88ea-35d5cc309f6d', '676924e4334d2bf6b46580c5fd484cd32ce6e25e', '2018-05-09 03:37:18', '2018-05-27 13:10:51', 'hCIT6JuQHjA2npVcEC5N8A==', '{\"openId\":\"onwg346GDE92Dy5332l6XZXpX2eI\",\"nickName\":\"墨樱\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Changzhou\",\"province\":\"Jiangsu\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXHCXRI6jFcxO7WHbhBX1oYsiclwEicJUddBOpBicNHF9k74Lic235O8cpH6W3QibocOibaSKbDWic3AJZQ/132\",\"watermark\":{\"timestamp\":1527426649,\"appid\":\"wxbb4d1a0ff0d87b8e\"}}');

-- --------------------------------------------------------

--
-- 表的结构 `mCallback`
--

CREATE TABLE `mCallback` (
  `id` int(11) NOT NULL COMMENT '意见反馈id',
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '邮箱',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系方式',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `create_time` datetime NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='意见反馈';

--
-- 转存表中的数据 `mCallback`
--

INSERT INTO `mCallback` (`id`, `email`, `phone`, `content`, `create_time`) VALUES
(2, '15012345678@qq.com', '15012345679', 'hello world!2', '2018-06-04 13:44:36'),
(3, '15012345678@qq.com', '15012345679', 'hwwwwwwwww', '2018-06-04 13:45:08'),
(4, '15012345678@qq.com', '15087654321', 'hwwwwwwwww', '2018-06-04 13:45:22');

-- --------------------------------------------------------

--
-- 表的结构 `mComment`
--

CREATE TABLE `mComment` (
  `id` int(11) NOT NULL COMMENT '评论id',
  `topic_id` int(11) NOT NULL COMMENT '话题id',
  `pool_id` int(11) NOT NULL COMMENT '话题池id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id',
  `good_point` int(11) NOT NULL COMMENT '点赞数',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `save_point` int(11) NOT NULL COMMENT '收藏数',
  `rank_id` int(11) NOT NULL COMMENT '排行组id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='评论';

--
-- 转存表中的数据 `mComment`
--

INSERT INTO `mComment` (`id`, `topic_id`, `pool_id`, `content`, `open_id`, `good_point`, `create_time`, `update_time`, `save_point`, `rank_id`) VALUES
(1, 3, 12, 'h123456', 'svsdvsdvdsvsdvds28000', 2, '2018-06-04 15:57:31', '2018-06-04 15:59:53', 1, 0),
(2, 3, 12, 'hello world', 'onwg346GDE92Dy5332l6XZXpX2eI', 0, '2018-06-04 16:00:28', '2018-06-04 16:00:28', 0, 0),
(6, 14, 9, 'happy！！！', '123456', 1, '2018-06-04 21:48:21', '2018-06-04 21:48:21', 0, 4),
(7, 14, 9, 'happy！！！2', '1234567', 2, '2018-06-04 21:51:48', '2018-06-04 21:51:48', 0, 4),
(9, 14, 9, 'happy！！！2', '12345672gk', 1, '2018-06-04 22:17:58', '2018-06-04 22:17:58', 0, 4);

-- --------------------------------------------------------

--
-- 表的结构 `mCommentGood`
--

CREATE TABLE `mCommentGood` (
  `id` int(11) NOT NULL COMMENT '评论点赞id',
  `comment_id` int(11) NOT NULL COMMENT '评论id',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='评论点赞';

--
-- 转存表中的数据 `mCommentGood`
--

INSERT INTO `mCommentGood` (`id`, `comment_id`, `open_id`) VALUES
(2, 1, 'svsdvsdvdsvsdvds28000'),
(3, 1, '12345675232510052'),
(4, 6, '123456'),
(5, 7, '123456'),
(7, 7, '1234565'),
(8, 9, '1234565');

-- --------------------------------------------------------

--
-- 表的结构 `mCommentSave`
--

CREATE TABLE `mCommentSave` (
  `id` int(11) NOT NULL COMMENT '评论收藏id',
  `comment_id` int(11) NOT NULL COMMENT '评论id',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='评论收藏';

--
-- 转存表中的数据 `mCommentSave`
--

INSERT INTO `mCommentSave` (`id`, `comment_id`, `open_id`) VALUES
(1, 1, 'svsdvsdvdsvsdvds28000'),
(2, 1, '12345675232510052');

-- --------------------------------------------------------

--
-- 表的结构 `mMessage`
--

CREATE TABLE `mMessage` (
  `id` int(11) NOT NULL COMMENT '消息id',
  `type` int(11) NOT NULL COMMENT '消息类型',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id',
  `has_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '已读 - 0未读；1已读',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '消息内容',
  `link1` int(11) NOT NULL DEFAULT '-1' COMMENT '链接id',
  `link2` varchar(100) NOT NULL DEFAULT '-1' COMMENT '链接id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='消息';

--
-- 转存表中的数据 `mMessage`
--

INSERT INTO `mMessage` (`id`, `type`, `create_time`, `open_id`, `has_read`, `content`, `link1`, `link2`) VALUES
(1, 0, '2018-06-04 19:31:02', 'onwg346GDE92Dy5332l6XZXpX2eI', 0, '这是一条系统消息', -1, '-1'),
(2, 0, '2018-06-04 19:33:05', 'onwg346GDE92Dy5332l6XZXpX2eI', 1, '这是一条系统消息2', -1, '-1'),
(3, 2, '2018-06-04 20:14:52', '213000-10086', 0, '您的话题池收获了一个赞', 1, '12345675232510052'),
(4, 4, '2018-06-04 20:15:24', 'svsdvsdvdsvsdvds28000', 0, '您的评论收获了一个赞', 1, '12345675232510052'),
(5, 5, '2018-06-04 20:15:38', 'svsdvsdvdsvsdvds28000', 0, '您的评论收获了一个收藏', 1, '12345675232510052'),
(6, 3, '2018-06-04 21:23:28', 'svsdvsdvdsvsdvds28000', 0, '您的话题被选中为日话题', 7, '-1'),
(7, 3, '2018-06-04 21:26:34', '21856216321', 0, '您的话题被选中为日话题', 8, '-1'),
(8, 3, '2018-06-04 21:32:35', '21856216321', 0, '您的话题被选中为日话题', 9, '-1'),
(9, 3, '2018-06-04 21:36:10', '21856216321', 0, '您的话题被选中为周话题', 11, '-1'),
(10, 3, '2018-06-04 21:39:34', '213000-10086-2', 0, '您的话题被选中为周话题', 12, '-1'),
(11, 3, '2018-06-04 21:39:52', '21856216321', 0, '您的话题被选中为周话题', 13, '-1'),
(12, 3, '2018-06-04 21:40:45', 'svsdvsdvdsvsdvds28000', 0, '您的话题被选中为周话题', 14, '-1'),
(13, 4, '2018-06-04 21:49:17', '123456', 0, '您的评论收获了一个赞', 6, '123456'),
(14, 4, '2018-06-04 21:51:57', '1234567', 0, '您的评论收获了一个赞', 7, '123456'),
(15, 4, '2018-06-04 21:52:05', '1234567', 0, '您的评论收获了一个赞', 7, '1234565'),
(16, 4, '2018-06-04 21:54:50', '1234567', 0, '您的评论收获了一个赞', 7, '1234565'),
(17, 3, '2018-06-04 22:02:25', '21856216321', 0, '您的话题被选中为周话题', 15, '-1'),
(18, 3, '2018-06-04 22:03:48', '21856216321', 0, '您的话题被选中为周话题', 16, '-1'),
(19, 4, '2018-06-04 22:18:40', '12345672gk', 0, '您的评论收获了一个赞', 9, '1234565'),
(20, 3, '2018-06-04 22:19:09', '21856216321', 0, '您的话题被选中为周话题', 17, '-1'),
(21, 3, '2018-06-04 22:23:45', '21856216321', 0, '您的话题被选中为周话题', 18, '-1'),
(22, 1, '2018-06-04 22:25:32', '1234567', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(23, 1, '2018-06-04 22:25:32', '1234567', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(24, 1, '2018-06-04 22:25:32', '1234567', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(25, 1, '2018-06-04 22:25:32', '123456', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(26, 1, '2018-06-04 22:25:32', '123456', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(27, 1, '2018-06-04 22:25:32', '12345672gk', 0, '您的获得一次向话题池添加话题的机会', 4, '-1'),
(28, 3, '2018-06-04 22:25:32', '21856216321', 0, '您的话题被选中为周话题', 19, '-1');

-- --------------------------------------------------------

--
-- 表的结构 `mPool`
--

CREATE TABLE `mPool` (
  `id` int(11) NOT NULL COMMENT '话题池id',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id',
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '话题图片',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '话题内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `good_point` int(11) NOT NULL COMMENT '好评数'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='话题池';

--
-- 转存表中的数据 `mPool`
--

INSERT INTO `mPool` (`id`, `open_id`, `image`, `content`, `create_time`, `update_time`, `good_point`) VALUES
(1, '213000-10086', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '论xxx的前世今生', '2018-05-28 19:10:24', '2018-05-29 19:10:32', 7),
(2, '213000-10086', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '论xxx的前世今生2', '2018-05-28 19:10:32', '2018-05-29 19:10:32', 4),
(3, '213000-10086', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫', '2018-05-28 19:14:14', '2018-05-29 19:10:32', 0),
(5, 'svsdvsdvdsvsdvds28000', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫，这到底是道德的详细，还是yy的zz，尽情欣赏', '2018-05-28 19:15:59', '2018-05-29 19:10:32', 9),
(6, '213000-10086', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫，这到底是道德的详细，还是yy的zz，尽情欣赏oo', '2018-05-28 19:17:08', '2018-05-29 19:10:32', 0),
(7, '213000-10086-2', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫，这到底是道德的沦丧，还是薛志键的扭曲', '2018-05-28 19:19:25', '2018-05-29 19:10:32', 0),
(8, '213000-10086-2', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫?', '2018-05-28 20:11:07', '2018-05-29 19:10:32', 10),
(9, 'svsdvsdvdsvsdvds28000', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫，23333333333333333333', '2018-05-28 20:19:21', '2018-05-29 19:10:32', 0),
(10, '21856216321', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫？?????????', '2018-05-28 20:33:45', '2018-05-28 20:33:45', 5),
(11, '21856216321', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫4399', '2018-06-03 15:30:52', '2018-06-03 15:53:25', 0),
(12, 'svsdvsdvdsvsdvds28000', 'https://avatar.csdn.net', '薛志键为何半夜惨叫996', '2018-06-03 15:46:42', '2018-06-04 03:53:37', 0),
(13, '21856216321', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫13333', '2018-06-03 15:50:10', '2018-06-03 15:50:10', 0),
(15, 'svsdvsdvdsvsdvds28000', 'https://avatar.csdn.net/D/1/E/3_thepatterraining.jpg', '薛志键为何半夜惨叫15', '2018-06-03 15:52:39', '2018-06-03 15:52:39', 0);

-- --------------------------------------------------------

--
-- 表的结构 `mPoolGood`
--

CREATE TABLE `mPoolGood` (
  `id` int(11) NOT NULL COMMENT '话题池点赞id',
  `pool_id` int(11) NOT NULL COMMENT '话题id',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `mPoolGood`
--

INSERT INTO `mPoolGood` (`id`, `pool_id`, `open_id`) VALUES
(4, 1, '123456'),
(5, 1, '1234567'),
(6, 1, '12345675'),
(7, 1, '1234567523'),
(8, 1, '12345675232510'),
(9, 1, '123456752325100'),
(10, 1, '12345675232510052');

-- --------------------------------------------------------

--
-- 表的结构 `mRank`
--

CREATE TABLE `mRank` (
  `id` int(11) NOT NULL COMMENT '排行id',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id',
  `point` int(11) NOT NULL COMMENT '点数',
  `rank_id` int(11) NOT NULL COMMENT '排行组id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `mRank`
--

INSERT INTO `mRank` (`id`, `open_id`, `point`, `rank_id`) VALUES
(1, '123456', 1, 4),
(2, '1234567', 2, 4),
(4, '12345672gk', 1, 4);

-- --------------------------------------------------------

--
-- 表的结构 `mSystem`
--

CREATE TABLE `mSystem` (
  `id` int(11) NOT NULL COMMENT '系统信息标识',
  `day_topic_id` int(11) NOT NULL COMMENT '日话题',
  `week_topic_id` int(11) NOT NULL COMMENT '周话题',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '官方账号',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '管理员密码',
  `rank_id` int(11) NOT NULL COMMENT '排序组id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='系统信息';

--
-- 转存表中的数据 `mSystem`
--

INSERT INTO `mSystem` (`id`, `day_topic_id`, `week_topic_id`, `open_id`, `password`, `rank_id`) VALUES
(1, 9, 19, 'hellokitty', '123456', 5);

-- --------------------------------------------------------

--
-- 表的结构 `mTopic`
--

CREATE TABLE `mTopic` (
  `id` int(11) NOT NULL COMMENT '话题id',
  `type` int(11) NOT NULL COMMENT '话题类型',
  `pool_id` int(11) NOT NULL COMMENT '话题池id',
  `time` datetime NOT NULL COMMENT '执行时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `mTopic`
--

INSERT INTO `mTopic` (`id`, `type`, `pool_id`, `time`) VALUES
(1, 1, 11, '2018-06-14 13:56:30'),
(3, 0, 12, '2018-06-14 13:56:30'),
(4, 1, 13, '2018-06-14 13:56:30'),
(5, 0, 15, '2009-06-25 04:15:12'),
(9, 0, 11, '2018-06-04 21:32:35'),
(10, 0, 9, '2018-06-04 21:35:09'),
(11, 0, 11, '2018-06-04 21:36:10'),
(12, 0, 8, '2018-06-04 21:39:34'),
(13, 0, 10, '2018-06-04 21:39:52'),
(14, 0, 9, '2018-06-04 21:40:45'),
(19, 0, 10, '2018-06-04 22:25:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cSessionInfo`
--
ALTER TABLE `cSessionInfo`
  ADD PRIMARY KEY (`open_id`),
  ADD KEY `openid` (`open_id`) USING BTREE,
  ADD KEY `skey` (`skey`) USING BTREE;

--
-- Indexes for table `mCallback`
--
ALTER TABLE `mCallback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mComment`
--
ALTER TABLE `mComment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mCommentGood`
--
ALTER TABLE `mCommentGood`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mCommentSave`
--
ALTER TABLE `mCommentSave`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mMessage`
--
ALTER TABLE `mMessage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mPool`
--
ALTER TABLE `mPool`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `mPoolGood`
--
ALTER TABLE `mPoolGood`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `mRank`
--
ALTER TABLE `mRank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mSystem`
--
ALTER TABLE `mSystem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mTopic`
--
ALTER TABLE `mTopic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `mCallback`
--
ALTER TABLE `mCallback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '意见反馈id', AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `mComment`
--
ALTER TABLE `mComment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id', AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `mCommentGood`
--
ALTER TABLE `mCommentGood`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论点赞id', AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `mCommentSave`
--
ALTER TABLE `mCommentSave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论收藏id', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `mMessage`
--
ALTER TABLE `mMessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息id', AUTO_INCREMENT=29;
--
-- 使用表AUTO_INCREMENT `mPool`
--
ALTER TABLE `mPool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '话题池id', AUTO_INCREMENT=16;
--
-- 使用表AUTO_INCREMENT `mPoolGood`
--
ALTER TABLE `mPoolGood`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '话题池点赞id', AUTO_INCREMENT=11;
--
-- 使用表AUTO_INCREMENT `mRank`
--
ALTER TABLE `mRank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '排行id', AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `mSystem`
--
ALTER TABLE `mSystem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统信息标识', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `mTopic`
--
ALTER TABLE `mTopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '话题id', AUTO_INCREMENT=20;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
