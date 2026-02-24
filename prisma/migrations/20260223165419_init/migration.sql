-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `heure` VARCHAR(191) NOT NULL,
    `message` TEXT NULL,
    `statut` VARCHAR(191) NOT NULL DEFAULT 'en_attente',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
