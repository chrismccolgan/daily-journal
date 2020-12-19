USE [master]
GO

IF db_id('DailyJournal') IS NULL
  CREATE DATABASE [DailyJournal]
GO

USE [DailyJournal]
GO

DROP TABLE IF EXISTS [Mood];
DROP TABLE IF EXISTS [Entry];

CREATE TABLE [Mood] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Mood] NVARCHAR(50) NOT NULL,
  [Emoji] NVARCHAR(10)
);

CREATE TABLE [Entry] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Title] NVARCHAR(100) NOT NULL,
  [Date] DATETIME NOT NULL,
  [Entry] NVARCHAR(MAX) NOT NULL,
  [MoodId] INTEGER NOT NULL,
  CONSTRAINT [FK_Entry_Mood] FOREIGN KEY ([MoodId]) REFERENCES [Mood] ([Id])
);

SET IDENTITY_INSERT [Mood] ON
INSERT INTO [Mood]
  ([Id], [Mood], [Emoji])
VALUES 
  (1, 'Happy', N'😊'),
  (2, 'Sad', N'😢'),
  (3, 'Frustrated', N'🤬'),
  (4, 'Accomplished', N'💪'),
  (5, 'Excited', N'😁'),
  (6, 'Burned out', N'💀');
SET IDENTITY_INSERT [Mood] OFF
    
SET IDENTITY_INSERT [Entry] ON
INSERT INTO [Entry] 
  ([Id], [Title], [Date], [Entry], [MoodId])
VALUES 
  (1, 'Group Project', '2020-05-28', 'Today my group presented the website we were working on. My group was awesome. I learned a lot about Git with this project.', 1), 
  (2, 'Full Stack', '2020-12-18', 'Today I start the process of converting this journal into a full stack application. It started as a hardcoded HTML site!', 4);
SET IDENTITY_INSERT [Entry] OFF