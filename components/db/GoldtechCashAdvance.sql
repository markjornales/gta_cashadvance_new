USE [master]
GO
/****** Object:  Database [GoldtechCashAdvance]    Script Date: 11/17/2020 11:14:33 ******/
CREATE DATABASE [GoldtechCashAdvance]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GoldtechCashAdvance', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\GoldtechCashAdvance.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'GoldtechCashAdvance_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\GoldtechCashAdvance_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [GoldtechCashAdvance] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GoldtechCashAdvance].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GoldtechCashAdvance] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET ARITHABORT OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [GoldtechCashAdvance] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GoldtechCashAdvance] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GoldtechCashAdvance] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET  ENABLE_BROKER 
GO
ALTER DATABASE [GoldtechCashAdvance] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GoldtechCashAdvance] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GoldtechCashAdvance] SET  MULTI_USER 
GO
ALTER DATABASE [GoldtechCashAdvance] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GoldtechCashAdvance] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GoldtechCashAdvance] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GoldtechCashAdvance] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [GoldtechCashAdvance] SET DELAYED_DURABILITY = DISABLED 
GO
USE [GoldtechCashAdvance]
GO
/****** Object:  Table [dbo].[cash_advanceForms]    Script Date: 11/17/2020 11:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[cash_advanceForms](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[unique_id] [varchar](50) NULL,
	[ca_number] [varchar](50) NULL,
	[car_parts] [varchar](max) NULL,
	[freight] [varchar](max) NULL,
	[quantity] [int] NULL,
	[description_ca] [varchar](max) NULL,
	[plateno] [varchar](50) NULL,
	[unitPrice] [money] NULL,
	[totalAmount] [money] NULL,
	[requestByDep] [varchar](max) NULL,
	[name] [varchar](50) NULL,
	[purpose] [varchar](50) NULL,
	[ca_amount] [money] NULL,
	[date_needed] [date] NULL,
	[date_of_ca] [date] NULL,
 CONSTRAINT [PK__cash_adv__3213E83F04B2594A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[cash_advances]    Script Date: 11/17/2020 11:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[cash_advances](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[unique_id] [varchar](50) NULL,
	[ca_number] [varchar](50) NULL,
	[date_of_ca] [date] NULL,
	[date_needed] [date] NULL,
	[ca_status] [varchar](20) NULL,
 CONSTRAINT [PK__cash_adv__3213E83F920014B6] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[company_names]    Script Date: 11/17/2020 11:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[company_names](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[unique_id] [varchar](50) NULL,
	[listnames] [varchar](max) NULL,
	[totalca] [money] NULL,
	[datecreated] [varchar](50) NULL,
	[lastupdate] [varchar](50) NULL,
 CONSTRAINT [PK__company___3213E83F23C5EB69] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[liquidation]    Script Date: 11/17/2020 11:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[liquidation](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[unique_id] [varchar](50) NULL,
	[liqd_refno] [varchar](20) NULL,
	[liqd_description] [varchar](max) NULL,
	[liqd_date] [date] NULL,
	[liqd_amount] [money] NULL,
	[ca_number] [varchar](25) NULL,
 CONSTRAINT [PK__liquidat__3213E83F23CA9A09] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[loginform_tbl]    Script Date: 11/17/2020 11:14:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[loginform_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](max) NULL,
	[date_expire] [date] NULL,
	[valid_hash] [varchar](max) NULL,
 CONSTRAINT [PK__loginfor__3213E83F552A99E5] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[cash_advanceForms] ON 

INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (1, N'_eaqkfw9', N'20-00001', N'wheels', N'on going', 2, N'for delivery', N'WPP406', 6000.0000, 12000.0000, N'cloudlink', N'', N'', 0.0000, CAST(N'2020-11-30' AS Date), CAST(N'2020-11-06' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (2, N'_eaqkfw9', N'20-00002', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloudlink systems', N'for marivic', N'car parts', 25000.0000, CAST(N'2020-10-20' AS Date), CAST(N'2020-10-20' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (3, N'_eaqkfw9', N'20-00003', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'Cloudlink Systems', N'marivic ching', N'for registration MV', 65000.0000, CAST(N'2020-11-09' AS Date), CAST(N'2020-11-06' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (4, N'_eaqkfw9', N'20-00004', N'Engine break', N'for deliver July 20, 2020', 5, N'urgent for repairing', N'TK2050', 5000.0000, 25000.0000, N'', N'', N'', 0.0000, CAST(N'2020-12-06' AS Date), CAST(N'2020-11-06' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (5, N'_eaqkfw9', N'20-00005', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'GTC aldis', N'nanette', N'for accounting', 250200.0000, CAST(N'2020-10-20' AS Date), CAST(N'2020-12-20' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (7, N'_6b24gxc', N'20-00001', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'for reg', N'for me', N'for expense', 12500.0000, CAST(N'2020-11-09' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (8, N'_6b24gxc', N'20-00002', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'for reg', N'for reg', N'reg', 1000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (9, N'_gmhprrf', N'20-00001', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloudlink systems', N'marivic', N'for reg', 15000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (10, N'_eaqkfw9', N'20-00006', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloud', N'marivic', N'for reg', 15000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (11, N'_eaqkfw9', N'20-00007', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'for asiawide', N'imee', N'for cash', 15000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (12, N'_eaqkfw9', N'20-00008', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'accounting', N'madam', N'for expenses', 15060.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (13, N'_eaqkfw9', N'20-00009', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'accounting', N'nanette', N'for reg', 15000.0000, CAST(N'2020-11-09' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (14, N'_eaqkfw9', N'20-00010', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'accounting', N'for reg', N'fore reg', 16111.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-20' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (15, N'_eaqkfw9', N'20-00011', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloudlink', N'marivic', N'for reg', 15000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-09' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (16, N'_gmhprrf', N'20-00002', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloudlink systems inc', N'marivic ching', N'vehicle registrator', 65000.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-16' AS Date))
INSERT [dbo].[cash_advanceForms] ([id], [unique_id], [ca_number], [car_parts], [freight], [quantity], [description_ca], [plateno], [unitPrice], [totalAmount], [requestByDep], [name], [purpose], [ca_amount], [date_needed], [date_of_ca]) VALUES (17, N'_h1q5x3y', N'20-00001', N'', N'', 0, N'', N'', 0.0000, 0.0000, N'cloudlink systems ', N'for marivic ching', N'for reg', 15300.0000, CAST(N'2020-11-20' AS Date), CAST(N'2020-11-17' AS Date))
SET IDENTITY_INSERT [dbo].[cash_advanceForms] OFF
SET IDENTITY_INSERT [dbo].[cash_advances] ON 

INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (1, N'_eaqkfw9', N'20-00001', CAST(N'2020-11-06' AS Date), CAST(N'2020-11-30' AS Date), N'partial payment')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (2, N'_eaqkfw9', N'20-00002', CAST(N'2020-10-20' AS Date), CAST(N'2020-10-20' AS Date), N'paid')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (3, N'_eaqkfw9', N'20-00003', CAST(N'2020-11-06' AS Date), CAST(N'2020-11-09' AS Date), N'partial payment')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (4, N'_eaqkfw9', N'20-00004', CAST(N'2020-11-06' AS Date), CAST(N'2020-12-06' AS Date), N'paid')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (5, N'_eaqkfw9', N'20-00005', CAST(N'2020-12-20' AS Date), CAST(N'2020-10-20' AS Date), N'partial payment')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (7, N'_6b24gxc', N'20-00001', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-09' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (8, N'_6b24gxc', N'20-00002', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (9, N'_gmhprrf', N'20-00001', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'partial payment')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (10, N'_eaqkfw9', N'20-00006', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (11, N'_eaqkfw9', N'20-00007', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (12, N'_eaqkfw9', N'20-00008', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (13, N'_eaqkfw9', N'20-00009', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-09' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (14, N'_eaqkfw9', N'20-00010', CAST(N'2020-11-20' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (15, N'_eaqkfw9', N'20-00011', CAST(N'2020-11-09' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (16, N'_gmhprrf', N'20-00002', CAST(N'2020-11-16' AS Date), CAST(N'2020-11-20' AS Date), N'pending...')
INSERT [dbo].[cash_advances] ([id], [unique_id], [ca_number], [date_of_ca], [date_needed], [ca_status]) VALUES (17, N'_h1q5x3y', N'20-00001', CAST(N'2020-11-17' AS Date), CAST(N'2020-11-20' AS Date), N'partial payment')
SET IDENTITY_INSERT [dbo].[cash_advances] OFF
SET IDENTITY_INSERT [dbo].[company_names] ON 

INSERT [dbo].[company_names] ([id], [unique_id], [listnames], [totalca], [datecreated], [lastupdate]) VALUES (1, N'_eaqkfw9', N'GGC', 11.0000, N'Nov 06, 2020 10:02 AM', N'Nov 17, 2020 10:09 AM')
INSERT [dbo].[company_names] ([id], [unique_id], [listnames], [totalca], [datecreated], [lastupdate]) VALUES (2, N'_6b24gxc', N'digichive', 2.0000, N'Nov 06, 2020 10:02 AM', N'Nov 09, 2020 01:07 PM')
INSERT [dbo].[company_names] ([id], [unique_id], [listnames], [totalca], [datecreated], [lastupdate]) VALUES (3, N'_gmhprrf', N'cloudlink systems', 2.0000, N'Nov 06, 2020 07:30 PM', N'Nov 16, 2020 07:10 PM')
INSERT [dbo].[company_names] ([id], [unique_id], [listnames], [totalca], [datecreated], [lastupdate]) VALUES (4, N'_h1q5x3y', N'web development dept', 1.0000, N'Nov 17, 2020 08:50 AM', N'Nov 17, 2020 08:57 AM')
SET IDENTITY_INSERT [dbo].[company_names] OFF
SET IDENTITY_INSERT [dbo].[liquidation] ON 

INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (4, N'_eaqkfw9', N'LIQ-F18ux', N'for reg', CAST(N'2020-10-20' AS Date), 25022.0000, N'20-00002')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (5, N'_eaqkfw9', N'LIQ-F28r5', N'for reg', CAST(N'2020-11-09' AS Date), 12250.0000, N'20-00002')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (6, N'_gmhprrf', N'LIQ-F1cfs', N'for reg', CAST(N'2020-11-20' AS Date), 10000.0000, N'20-00001')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (7, N'_eaqkfw9', N'LIQ-F1k2o', N'for payment', CAST(N'2020-11-13' AS Date), 25000.0000, N'20-00004')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (8, N'_eaqkfw9', N'LIQ-F2gys', N'update payment add 15060', CAST(N'2020-11-13' AS Date), 64060.0000, N'20-00003')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (9, N'_eaqkfw9', N'LIQ-F13x8', N'for reg', CAST(N'2020-11-16' AS Date), 200000.0000, N'20-00005')
INSERT [dbo].[liquidation] ([id], [unique_id], [liqd_refno], [liqd_description], [liqd_date], [liqd_amount], [ca_number]) VALUES (10, N'_h1q5x3y', N'LIQ-F12ny', N'for initial payment', CAST(N'2020-11-17' AS Date), 5000.0000, N'20-00001')
SET IDENTITY_INSERT [dbo].[liquidation] OFF
SET IDENTITY_INSERT [dbo].[loginform_tbl] ON 

INSERT [dbo].[loginform_tbl] ([id], [username], [password], [date_expire], [valid_hash]) VALUES (1, N'admin', N'$2b$15$czv.beoFhmHXI0Hvx3Wvt.suU7DsIp.8zMtM/C551E/T8zBaKgHc2', CAST(N'2020-11-13' AS Date), N'$2b$15$dw147zW2vp1roQOKE6/KouD3hRH5gTpaTvqt3QN.P9D/UDaTFzQmm')
SET IDENTITY_INSERT [dbo].[loginform_tbl] OFF
USE [master]
GO
ALTER DATABASE [GoldtechCashAdvance] SET  READ_WRITE 
GO
