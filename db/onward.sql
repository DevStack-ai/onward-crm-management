-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2024 a las 17:40:34
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `onward`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `containers`
--

CREATE TABLE `containers` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `reference_alt` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `docto_no` varchar(255) DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `status_bpo` varchar(255) DEFAULT NULL,
  `bpo_livemapurl` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `LiveMapUrl` varchar(255) DEFAULT NULL,
  `order_time` varchar(255) DEFAULT NULL,
  `close_date` varchar(255) DEFAULT NULL,
  `checkout_date` varchar(255) DEFAULT NULL,
  `departure_data` varchar(255) DEFAULT NULL,
  `trans_type` varchar(255) DEFAULT NULL,
  `entry_number` varchar(255) DEFAULT NULL,
  `total_amount` varchar(255) DEFAULT NULL,
  `fda` varchar(255) DEFAULT NULL,
  `cbp` varchar(255) DEFAULT NULL,
  `usda` varchar(255) DEFAULT NULL,
  `lfd` varchar(255) DEFAULT NULL,
  `lfd_fee` varchar(255) DEFAULT NULL,
  `estimated_date` varchar(255) DEFAULT NULL,
  `delivery_date` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `ContainerNumber` varchar(255) DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `StatusId` varchar(255) DEFAULT NULL,
  `ReferenceNo` varchar(255) DEFAULT NULL,
  `ShippingLine` varchar(255) DEFAULT NULL,
  `FromCountry` varchar(255) DEFAULT NULL,
  `Pol` varchar(255) DEFAULT NULL,
  `Pod` varchar(255) DEFAULT NULL,
  `Vessel` varchar(255) DEFAULT NULL,
  `VesselIMO` varchar(255) DEFAULT NULL,
  `GateOutDate` varchar(255) DEFAULT NULL,
  `FormatedTransitTime` varchar(255) DEFAULT NULL,
  `last_api_request` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `container` varchar(255) DEFAULT NULL,
  `arrival_date` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `containers`
--

INSERT INTO `containers` (`id`, `uid`, `reference`, `reference_alt`, `source`, `company`, `docto_no`, `customer`, `status_bpo`, `bpo_livemapurl`, `Status`, `LiveMapUrl`, `order_time`, `close_date`, `checkout_date`, `departure_data`, `trans_type`, `entry_number`, `total_amount`, `fda`, `cbp`, `usda`, `lfd`, `lfd_fee`, `estimated_date`, `delivery_date`, `obs`, `ContainerNumber`, `Message`, `StatusId`, `ReferenceNo`, `ShippingLine`, `FromCountry`, `Pol`, `Pod`, `Vessel`, `VesselIMO`, `GateOutDate`, `FormatedTransitTime`, `last_api_request`, `createdAt`, `updatedAt`, `container`, `arrival_date`, `country`) VALUES
(10, 'f5ae6b65-323a-4cb0-b8ff-daa26083618d', 'WA-0019', '0007', 'EUFORIA', 'CGI', '7', 'EL QUETZAL TIENDA LATINA MINI MARKET', 'ENTREGADO', NULL, 'Discharged', 'https://shipsgo.com/live-map-container-tracking?query=TRHU5233853', '2023-07-11T14:57:11.5949388Z', '2023-05-03', '2023-05-04', '2023-05-21', '7', 'HG8-1592667-7', '70134.57', 'OK', 'OK', 'OK', NULL, NULL, '2023-06-26', NULL, '', 'TRHU5233853', 'Success', '50', 'WA-0019 / EL QUETZAL TIENDA LATINA MINI MART', 'SEALAND', 'GUATEMALA', 'PUERTO QUETZAL', 'OAKLAND', 'SEALAND BALBOA', '9376012', '2023-06-13', '19 days', '2024-11-23 18:33', '2023-08-16 15:01:28', '2024-11-23 17:33:59', 'TRHU5233853', NULL, NULL),
(36, '0f07d05a-ff66-4e06-a17a-ecf0a1f6f22c', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-09 22:53:26', '2024-09-05 14:52:37', NULL, NULL, NULL),
(39, '5cc27e40-c918-4259-8318-1d9d1e512a8e', ' DE-0235', '0235', ' GTO FM', ' CGI ', '235', ' E.N.D. IMPORTS, INC.', 'EN PROCESO', NULL, NULL, NULL, NULL, '2024-11-22', '2024-12-10', '2024-12-14', NULL, '-', '26952.71', 'PENDIENTE', 'PENDIENTE', 'PENDIENTE ', '', '', '2024-12-21', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-11-22 17:31:24', '2024-12-02 21:07:12', '-', '2024-12-16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `reference_alt` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `docto_no` varchar(255) DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `status_bpo` varchar(255) DEFAULT NULL,
  `bpo_livemapurl` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `LiveMapUrl` varchar(255) DEFAULT NULL,
  `order_time` varchar(255) DEFAULT NULL,
  `close_date` varchar(255) DEFAULT NULL,
  `checkout_date` varchar(255) DEFAULT NULL,
  `departure_data` varchar(255) DEFAULT NULL,
  `trans_type` varchar(255) DEFAULT NULL,
  `entry_number` varchar(255) DEFAULT NULL,
  `total_amount` varchar(255) DEFAULT NULL,
  `fda` varchar(255) DEFAULT NULL,
  `cbp` varchar(255) DEFAULT NULL,
  `usda` varchar(255) DEFAULT NULL,
  `lfd` varchar(255) DEFAULT NULL,
  `lfd_fee` varchar(255) DEFAULT NULL,
  `estimated_date` varchar(255) DEFAULT NULL,
  `delivery_date` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `container` varchar(255) DEFAULT NULL,
  `ContainerNumber` varchar(255) DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `StatusId` varchar(255) DEFAULT NULL,
  `ReferenceNo` varchar(255) DEFAULT NULL,
  `ShippingLine` varchar(255) DEFAULT NULL,
  `FromCountry` varchar(255) DEFAULT NULL,
  `Pol` varchar(255) DEFAULT NULL,
  `Pod` varchar(255) DEFAULT NULL,
  `Vessel` varchar(255) DEFAULT NULL,
  `VesselIMO` varchar(255) DEFAULT NULL,
  `GateOutDate` varchar(255) DEFAULT NULL,
  `FormatedTransitTime` varchar(255) DEFAULT NULL,
  `last_api_request` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `arrival_date` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `histories`
--

INSERT INTO `histories` (`id`, `uid`, `reference`, `reference_alt`, `source`, `company`, `docto_no`, `customer`, `status_bpo`, `bpo_livemapurl`, `Status`, `LiveMapUrl`, `order_time`, `close_date`, `checkout_date`, `departure_data`, `trans_type`, `entry_number`, `total_amount`, `fda`, `cbp`, `usda`, `lfd`, `lfd_fee`, `estimated_date`, `delivery_date`, `obs`, `container`, `ContainerNumber`, `Message`, `StatusId`, `ReferenceNo`, `ShippingLine`, `FromCountry`, `Pol`, `Pod`, `Vessel`, `VesselIMO`, `GateOutDate`, `FormatedTransitTime`, `last_api_request`, `createdAt`, `updatedAt`, `arrival_date`, `country`) VALUES
(1, '675284e2-469a-4fc4-9215-86135d2cbf5e', 'FL-20031', '_012', 'EUFORIA', 'CGI', NULL, 'SURTIDORA EL MANA LCC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4513268', NULL, '2023-06-01', '2023-06-22', '2023-06-26', NULL, 'HG8-1593311-1', NULL, 'OK', 'OK', 'OK', '2023-07-03', '', '2023-07-03', '2023-07-03', 'Se realizo la entrega el día lunes 03/07 de 19 pallets/ 20 pallets.  Pallet restante 20/20 fue entregada el 11/07 ', 'KOSU4513268', 'KOSU4513268', 'Success', '60', 'FL-20031 / SURTIDORA EL MANA LCC', 'OTHERS', '', '', '', '', '', '', '', '2023-08-12 17:32', '2023-08-03 21:38:05', '2023-08-12 15:32:09', NULL, NULL),
(2, '79598203-da9f-4cbb-9eb8-266be8826894', 'WA-0025', '_011', 'EUFORIA', 'CGI', NULL, 'EL QUETZAL TIENDA LATINA MINI MART', 'ANULADO', NULL, NULL, NULL, NULL, '2023-05-19', '', '', NULL, '', NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-03 21:38:58', '2023-08-03 21:38:58', NULL, NULL),
(3, 'b4865400-0c28-47cc-a1e5-dc4699114f12', 'MD-0024', '_013', 'EUFORIA', 'CGI', NULL, 'ALFA INTERNATIONAL FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, NULL, '2023-06-03', '', '', NULL, '', NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-03 21:39:26', '2023-08-03 21:39:26', NULL, NULL),
(4, 'f90b2702-00d5-4513-9866-e21428f4dd83', 'FL-0012', '_003', 'EUFORIA', 'CGI', '3', 'SURTIDORA EL MANA LCC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4931000', NULL, '2023-03-22', '2023-04-18', '2023-04-21', NULL, 'HG8-1592447-4', NULL, 'LIBERADO', 'OK', 'OK', '2023-05-01', '', '2023-04-28', '2023-04-28', '', 'KOSU4931000', 'KOSU4931000', 'Success', '60', 'FL-0012 / SURTIDORA EL MANA LCC', 'OTHERS', '', '', '', '', '', '', '', '2023-09-14 15:03', '2023-08-03 21:39:53', '2023-09-14 13:03:47', NULL, NULL),
(5, '875013f5-10e5-4f41-a458-8b5cb18fc0da', 'DE-0018', '_004', 'EUFORIA', 'CGI', NULL, 'EL NOPALITO DISTRIBUTORS INC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4942175', NULL, '2023-03-22', '2023-04-14', '2023-04-18', NULL, 'HG8-1592421-9', NULL, 'LIBERADO', 'OK', 'OK', '2023-04-29', '', '2023-04-27', '2023-04-27', '', 'KOSU4942175', 'KOSU4942175', 'Success', '60', 'DE-0018 / EL NOPALITO DISTRIBUTORS INC', 'OTHERS', '', '', '', '', '', '', '', '2024-06-25 18:21', '2023-08-03 21:40:30', '2024-06-25 16:21:44', NULL, NULL),
(6, '39914929-e2f6-4a8b-bd17-599011726a8d', 'MD-0015', '_001', 'EUFORIA', 'CGI', NULL, 'ALFA INTERNATIONAL FOOD DISTRIBUTION  LLC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4956939', NULL, '2023-03-24', '2023-04-14', '2023-04-18', NULL, 'HG8-1592421-9', NULL, 'LIBERADO', 'OK', 'OK', '2023-04-29', '', '2023-04-27', '2023-04-27', '', 'KOSU4956939', 'KOSU4956939', 'Success', '60', 'MD-0015 / ALFA INTERNATIONAL FOOD DISTRIBUTION, LLC.', 'OTHERS', '', '', '', '', '', '', '', '2023-08-03 15:41', '2023-08-03 21:41:39', '2023-08-03 21:41:39', NULL, NULL),
(7, '83ad53cd-da71-4b1a-81b7-486fe97fccc3', 'FL-0021', '_009', 'EUFORIA', 'CGI', NULL, 'ANTIGUA FOOD DISTRIBUTION LLC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4971548', NULL, '2023-05-18', '2023-05-18', '2023-05-21', NULL, 'HG8-1592855-8', NULL, 'LIBERADO', 'OK', 'OK', '2023-05-30', '', '2023-05-31', '2023-05-31', '', 'KOSU4971548', 'KOSU4971548', 'Success', '60', 'FL-0021 / ANTIGUA FOOD DISTRIBUTION LLC', 'OTHERS', '', '', '', '', '', '', '', '2023-08-03 15:42', '2023-08-03 21:42:04', '2023-08-03 21:42:04', NULL, NULL),
(8, 'd2ba71d5-6c12-4805-8d68-affff64425a2', 'CA-0022', '_010', 'EUFORIA', 'CGI', NULL, 'DEL VALLE IMPORT & EXPORT 3  INC', 'PAGADO', NULL, 'Discharged', 'https://shipsgo.com/live-map-container-tracking?query=MRSU3978607', NULL, '2023-05-09', '2023-05-30', '2023-06-10', NULL, 'HG8-1593106-5', NULL, 'LIBERADO', 'OK', 'OK', '2023-07-03', '', '2023-07-03', '2023-07-03', '', 'MRSU3978607', 'MRSU3978607', 'Success', '50', 'CA-0022 / DEL VALLE IMPORT & EXPORT 3, INC', 'SEALAND', 'GUATEMALA', 'PUERTO QUETZAL', 'LOS ANGELES', 'MAERSK NEWCASTLE', '9215878', '2023-07-01', '12 days', '2023-08-03 15:42', '2023-08-03 21:42:45', '2023-08-03 21:42:45', NULL, NULL),
(9, 'd345ae92-c04c-4919-81c8-281d04a96f63', 'DE-0023', '_008', 'EUFORIA', 'CGI', NULL, 'EL NOPALITO DISTRIBUTORS INC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4923792', NULL, '2023-05-05', '2023-05-18', '2023-05-21', NULL, 'HG8-1592855-8', NULL, 'LIBERADO', 'OK', 'OK', '2023-05-30', '', '2023-06-02', '2023-06-02', '', 'KOSU4923792', 'KOSU4923792', 'Success', '60', 'DE-0023 / EL NOPALITO DISTRIBUTORS INC', 'OTHERS', '', '', '', '', '', '', '', '2023-08-03 15:43', '2023-08-03 21:43:11', '2023-08-03 21:43:11', NULL, NULL),
(10, '915fde8b-7418-44e2-848b-9ddab5c710af', 'DE-20035', '_014', 'EUFORIA', 'CGI', NULL, 'EL NOPALITO DISTRIBUTORS INC', 'ANULADO', NULL, NULL, NULL, NULL, '2023-06-07', '', '', NULL, '', NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-03 21:43:33', '2023-08-03 21:43:33', NULL, NULL),
(11, '07bcc1b3-61da-4fdf-8a0e-72972435efae', 'MD-20036 ', '_015', 'EUFORIA', 'CGI', NULL, 'ALFA INTERNATIONAL FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, NULL, '2023-06-08', '', '', NULL, '', NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-03 21:44:00', '2023-09-13 20:46:11', NULL, NULL),
(12, '84bded38-96a0-418c-99c3-8469f57dc013', 'CA-0010', '0010', 'EUFORIA', 'CGI', '10', 'ROYAL LYC DISTRIBUTION INC', 'PAGADO', NULL, 'Discharged', 'https://shipsgo.com/live-map-container-tracking?query=MRSU5103923', '2023-07-11T14:57:11.5949388Z', '2023-03-01T00:00:00', '2023-05-02', '2023-05-12', '7', 'HG8-1592622-2', '53260.54', 'LIBERADO', 'LIBERADO', 'LIBERADO', '2023-05-26', NULL, '2023-06-14', '2023-06-14', NULL, 'MRSU5103923', 'MRSU5103923', 'Success', '50', 'CA-0010 / ROYAL L&C DISTRIBUTION INC', 'SEALAND', 'GUATEMALA', 'PUERTO QUETZAL', 'LOS ANGELES', 'MAERSK NORTHAMPTON', '9215919', '2023-06-02', '10 days', '2023-09-14 00:39', '2023-08-21 19:31:51', '2023-09-13 22:40:57', '2023-05-22', NULL),
(13, '3f3a1cbd-5856-4117-a8fc-dee6b73ee028', '0016_TN_ELMANA_FL_2023', '0016', 'EUFORIA', 'CGI', '16', 'SURTIDORA EL MANA LLC', 'PAGADO', NULL, NULL, NULL, '2023-07-11T14:57:11.5949388Z', '2023-06-30', '2023-07-28', '2023-08-07', '7', 'HG8-1593814-4', '', 'OK', 'OK', 'OK', NULL, NULL, '2023-08-10', '2023-08-10', 'Recolectado por parte del cliente el 10 de Agosto ', 'SMLU4604177', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-17 19:26:31', '2024-01-08 22:07:54', '2023-08-09', NULL),
(14, '3088b1e1-9f58-4127-8d8d-491c6353a6ce', 'FL-20037', '', 'EUFORIA', 'CGI', '11', 'ANTIGUA FOOD DISTRIBUTION LLC', 'PAGADO', NULL, NULL, NULL, NULL, '2023-06-28', '2023-07-28', '2023-08-07', NULL, 'HG8-1593821-9', NULL, 'OK', 'OK', 'OK', '', '', '2023-08-10', '2023-08-10', '', 'SMLU7917030', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-03 18:48:17', '2023-09-18 19:07:15', '2023-08-09', NULL),
(15, 'ab33976a-f58b-4a2d-8394-1eb6a7138e61', 'RI-0036', '0036', 'EUFORIA', 'CGI', '36', 'EJ CENTROAMERICA DISTRIBUIDORES LLC', 'ANULADO', NULL, NULL, NULL, '2023-09-16T20:58:44.3855718Z', '2023-09-14T00:00:00', NULL, NULL, '7', NULL, '50822.7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-16 20:58:45', '2023-12-29 22:07:32', NULL, NULL),
(16, 'e74c7f22-0b49-4c05-8570-1c097db86267', 'DE-0032', '0032', 'EUFORIA', 'CGI', '32', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2023-09-22T18:31:32.3225326Z', '2023-08-17T00:00:00', NULL, NULL, '7', NULL, '12000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-22 18:31:33', '2023-12-29 22:09:22', NULL, NULL),
(17, '76623938-1b6a-4ab7-b77a-e8a8a0710e5e', 'GA-0033', '0033', 'EUFORIA', 'CGI', '33', 'EL BOQUERON IMPORTS, LLC', 'ANULADO', NULL, NULL, NULL, '2023-08-26T04:03:30.1581991Z', '2023-08-22T00:00:00', NULL, NULL, '7', NULL, '54103', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-26 04:03:31', '2023-12-29 22:09:50', NULL, NULL),
(18, '0028', 'DE_0028', '0028', 'EUFORIA', 'CGI', '28', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2023-08-15T00:47:34.9204146Z', '2023-08-09T00:00:00', NULL, NULL, '7', NULL, '53606.45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-08-15 00:47:36', '2023-12-29 22:10:06', '', NULL),
(19, '98e7085a-1be7-4447-9980-dfb18ec62495', 'FL-0035', '0035', 'EUFORIA', 'CGI', '35', 'ANTIGUA FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, '2023-09-13T22:35:08.6467257Z', '2023-08-24T00:00:00', NULL, NULL, '7', NULL, '57270.4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-13 22:35:10', '2023-12-29 22:46:42', NULL, NULL),
(20, 'e9bc91c6-1dec-4986-9d45-a3752113e262', 'DE-0032', '0032', 'EUFORIA', 'CGI', '32', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2023-12-29T23:32:05.5640166Z', '2023-08-17T00:00:00', NULL, NULL, '7', NULL, '12000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-12-29 23:32:06', '2023-12-30 00:24:00', NULL, NULL),
(21, '8b833598-477d-4b32-a58b-bff4e69247f2', 'MX-00118', '0041', 'EUFORIA', 'CGI', '41', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2024-01-02T22:02:44.2962849Z', '2023-12-22T00:00:00', NULL, NULL, '7', NULL, '70572.74', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-02 22:02:45', '2024-06-25 16:26:00', NULL, NULL),
(22, 'b5a0435b-2c14-41a7-b2dd-987f6f14e6b4', 'FL-0035', '0035', 'EUFORIA', 'CGI', '35', 'ANTIGUA FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, '2024-01-02T21:24:28.7056965Z', '2023-12-20T00:00:00', NULL, NULL, '7', NULL, '57270.4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-02 21:24:30', '2024-01-04 21:18:50', NULL, NULL),
(23, '504ae3c3-32d0-4345-89df-63f0b3b9b7b2', 'MX-00118', '0041', 'EUFORIA', 'CGI', '41', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2024-02-24T16:44:28.5702281Z', '2023-12-22T00:00:00', NULL, NULL, '7', NULL, '70572.74', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-24 16:44:30', '2024-02-25 22:32:55', NULL, 'Mexico'),
(24, 'ffae3f14-0690-4a5f-848b-626fefd3d9e8', 'FL-0035', '0035', 'EUFORIA', 'CGI', '35', 'ANTIGUA FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, '2024-01-04T21:19:16.4031046Z', '2023-12-20T00:00:00', NULL, NULL, '7', NULL, '57270.4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-04 21:19:18', '2024-03-08 20:26:40', NULL, 'Guatemala'),
(25, '1137597f-d124-4d19-9eef-6eb3de3e84fd', 'MX-00118', '0041', 'EUFORIA', 'CGI', '41', 'E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, '2024-01-04T21:19:25.63839Z', '2023-12-22T00:00:00', '2024-03-17', '2024-03-22', '7', NULL, '70572.74', NULL, NULL, NULL, NULL, NULL, '2024-04-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-04 21:19:27', '2024-04-11 22:55:40', '2024-04-09', 'Mexico'),
(26, 'a2fe25f5-b92c-4294-8714-1f5ffb1365e0', 'FL-0043', '0043', 'GTO FM', 'CGI', '43', 'ANTIGUA FOOD DISTRIBUTION LLC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4991415', '2024-03-18T15:41:15.4459294Z', '2024-03-06T00:00:00', '2024-04-11', '2024-04-14', '7', 'HG8-1596981-8', '50803.41', 'OK', 'OK', 'OK', NULL, NULL, '2024-05-03', '2024-05-03', '3 productos pendientes de liberación de FDA. El contenedor se entrego el 05/03. ', 'KOSU4991415', 'KOSU4991415', 'Success', '60', 'FL-0043 / ANTIGUA FOOD DISTRIBUTION LLC', 'MAERSK LINE', '', '', '', '', '', '', '', '2024-08-02 18:02', '2024-03-18 15:41:17', '2024-08-02 16:02:29', '2024-04-18', 'Guatemala'),
(27, '987db94b-6b4e-41fb-8e82-625559c196ba', 'DE-0047', '0178', 'GTO FM', 'CGI', '0178', 'E.N.D. IMPORTS, INC.', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=UESU5228877', '2024-03-26T16:09:16.3393201Z', '2024-03-18T00:00:00', '2024-04-11', '2024-04-14', '7', 'HG8-1596981-8', '45826.1', 'OK', 'OK', 'OK', NULL, NULL, '2024-05-09', '2024-05-09', '1 producto pendiente de liberación con FDA. ', 'UESU5228877', 'UESU5228877', 'Success', '60', 'DE-0047/ E.N.D. IMPORTS, INC', 'MAERSK LINE', '', '', '', '', '', '', '', '2024-09-20 22:43', '2024-03-26 16:09:18', '2024-09-20 20:43:50', '2024-04-18', 'Guatemala'),
(28, 'e6e17c5b-3a3a-4f24-88bd-08207cc8b8fb', 'SO-0189', 'SO-0189', 'GTO FM', 'CGI', '189', 'ANTIGUA FOOD DISTRIBUTION LLC', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4921090', '2024-03-20T15:07:35.7089196Z', '2024-03-19T00:00:00', '2024-05-09', '2024-05-12', '7', 'HG8-1597317-4', '19784.8', 'OK', 'OK', 'OK', '2024-05-23', NULL, '2024-06-13', '2024-06-13', 'CONTENEDOR RECOLECTADO POR ANTIGUA EN BODEGAS DE INTERPORT. 450 CAJAS JUGO LA GRANJA 990ML DETENIDO POR FDA; 1320 CAJAS JUGO DE LA GRANJA  500ML RETENIDO POR FDA.  ', 'KOSU4921090', 'KOSU4921090', 'Success', '60', 'GA-0050/ EL BOQUERON IMPORTS, LLC.', 'OTHERS', '', '', '', '', '', '', '', '2024-09-20 22:48', '2024-03-20 15:07:37', '2024-09-20 20:48:36', '2024-05-16', 'Guatemala'),
(29, '5778cfcc-0979-439b-a9f9-816cff32e0a0', 'DE-0196', '0196', 'GTO FM', 'CGI', '196', ' E.N.D. IMPORTS, INC.', 'PAGADO', NULL, 'Untracked', 'https://shipsgo.com/live-map-container-tracking?query=KOSU4921336', '2024-03-20T15:07:55.54723Z', '2024-03-17T00:00:00', '2024-05-17', '2024-05-19', '7', 'HG8-1597370-3', '33612.9', 'OK', 'OK', 'OK', '2024-05-30', NULL, '2024-06-14', '2024-06-14', '', 'KOSU4921336', 'KOSU4921336', 'Success', '60', 'RI-0196/E.N.D. IMPORTS, INC.', 'OTHERS', '', '', '', '', '', '', '', '2024-09-20 22:44', '2024-03-20 15:07:56', '2024-09-20 20:44:57', '2024-05-23', 'Guatemala'),
(30, '38b51a47-cdde-4e5d-8d7e-8bdec22a0722', 'DE-0186', '0186', 'GTO FM', ' CGI', '186', ' E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, NULL, '2024-06-07', '', '', NULL, '-', '53669.48', 'PENDIENTE', 'PENDIENTE ', 'PENDIENTE ', '', '', '', '', '', '-', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-09 12:55:41', '2024-09-20 20:43:43', '', NULL),
(31, '03f347b5-d86d-4738-b751-0d75fa6a7a6f', 'FL-0200', '0200', 'GTO FM', 'CGI', '200', 'ANTIGUA FOOD DISTRIBUTION LLC', 'PAGADO', NULL, 'Discharged', 'https://shipsgo.com/live-map-container-tracking?query=MRKU5150753', NULL, '2024-06-26', '2024-07-25', '2024-07-29', NULL, 'E4W-0031865-0', '53336.42', 'OK', 'OK', 'OK', '2024-08-05', '', '2024-08-08', '2024-08-08', 'PAGO CON NOTA DE CREDITO PENDIENTE', 'MRKU5150753', 'MRKU5150753', 'Success', '50', 'FL-0200/ANTIGUA FOOD DISTRIBUTION LLC', 'MAERSK LINE', 'GUATEMALA', 'SANTO TOMAS DE CASTILLA', 'FORT LAUDERDALE (PORT EVERGLADES)', 'SEASPAN LOGA', '9320001', '2024-08-05', '2 days', '2024-09-06 23:15', '2024-07-10 18:54:42', '2024-09-06 21:15:51', '2024-07-31', NULL),
(32, 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'ANULADO', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', '2024-08-01 17:14:27', '2024-08-27 19:42:39', NULL, NULL),
(33, '03daf272-1e55-4a1c-8d99-770592f60c8a', 'DE-0201', '0201', ' GTO FM', 'CGI ', '201', ' E.N.D. IMPORTS, INC.', 'ANULADO', NULL, NULL, NULL, NULL, '2024-07-19', '', '', NULL, '-', '61257.1', 'PENDIENTE', 'PENDIENTE', 'PENDIENTE', '', '', '', '', '', '-', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-05 15:05:56', '2024-11-22 18:14:46', '', NULL),
(34, '7bdd078e-acbe-43a0-abef-b4de48e42d0b', 'FL-0213', '0213', 'GTO FM', 'CGI', '213', ' ANTIGUA FOOD DISTRIBUTION LLC', 'ANULADO', NULL, NULL, NULL, NULL, '2024-08-28', '', '', NULL, '-', '58279.92', 'PENDIENTE ', 'PENDIENTE', 'PENDIENTE', '', '', '', '', '', '-', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-09-05 15:01:40', '2024-11-22 18:15:04', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `uid`, `name`, `email`, `role`, `password`, `last_login`, `createdAt`, `updatedAt`) VALUES
(20, 'Z4mY509CawXaejjPjpm8faqaNb83', NULL, 'admin@onward.com', 'admin', '1234567890', NULL, '2023-12-28 21:28:42', '2024-06-06 20:11:30'),
(23, '6hOeir65e4Y2YVHj5l7lpSzVEiw2', NULL, 'qa@onward.us', 'admin', '123456789', NULL, '2024-03-11 16:25:29', '2024-03-11 16:25:29'),
(24, 'd6Ez9AJaCUhnoolCvT53s0Kog6D2', NULL, 'carlosgodoy1118@gmail.com', 'admin', 'Sadesa18.', NULL, '2024-03-11 16:28:30', '2024-03-11 16:28:30'),
(25, 'ixdLswodXgQ8pSNDeIh217j2zy72', NULL, 'operations@onwardbpo.com', 'admin', '12345678', NULL, '2024-03-11 17:47:51', '2024-03-11 17:47:51'),
(26, 'TZHIe6IGMhNB30VJdXJBxfbTi6p1', NULL, 'paola.borgonovo@onwardbpo.com', 'admin', '12345678', NULL, '2024-03-25 17:53:55', '2024-03-25 17:53:55'),
(27, 'QBIFYOrpRdPadzzhe27VX9QsYP43', NULL, 'amner@gmail.com', 'admin', '12345678', NULL, '2024-04-18 21:28:17', '2024-04-18 21:28:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `containers`
--
ALTER TABLE `containers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `containers`
--
ALTER TABLE `containers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT de la tabla `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
