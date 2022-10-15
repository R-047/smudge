/*
  Warnings:

  - Added the required column `public_key` to the `websites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `websites` ADD COLUMN `public_key` VARCHAR(255) NOT NULL;
