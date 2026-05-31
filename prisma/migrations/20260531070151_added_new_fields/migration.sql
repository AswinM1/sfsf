-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "content" TEXT,
ADD COLUMN     "icon" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'untitled';
