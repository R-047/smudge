/*
  Warnings:

  - You are about to drop the column `x_coord` on the `websites` table. All the data in the column will be lost.
  - You are about to drop the column `y_coord` on the `websites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `websites` DROP COLUMN `x_coord`,
    DROP COLUMN `y_coord`;
