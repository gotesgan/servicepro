-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL ,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSheet" (
    "jobID" SERIAL NOT NULL,
    "cutomer_name" TEXT NOT NULL,
    "cutomer_Contact" TEXT NOT NULL,
    "cutomer_email" TEXT,
    "device_Type" TEXT NOT NULL,
    "device_name" TEXT,
    "device_IMIE" BIGINT,
    "problemDescription" TEXT NOT NULL,
    "serviceCharge" DOUBLE PRECISION NOT NULL,
    "jobStatus" TEXT NOT NULL DEFAULT 'Pending',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateCompleted" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobSheet_pkey" PRIMARY KEY ("jobID")
);

-- CreateTable
CREATE TABLE "inventory" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_barcode" TEXT,
    "product_price" DOUBLE PRECISION NOT NULL,
    "product_stock" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "saleID" SERIAL NOT NULL,
    "saleType" TEXT NOT NULL,
    "description" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleID")
);

-- CreateTable
CREATE TABLE "_SalesJobSheets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SalesProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "inventory_product_id_idx" ON "inventory"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "_SalesJobSheets_AB_unique" ON "_SalesJobSheets"("A", "B");

-- CreateIndex
CREATE INDEX "_SalesJobSheets_B_index" ON "_SalesJobSheets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SalesProducts_AB_unique" ON "_SalesProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_SalesProducts_B_index" ON "_SalesProducts"("B");

-- AddForeignKey
ALTER TABLE "JobSheet" ADD CONSTRAINT "JobSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesJobSheets" ADD CONSTRAINT "_SalesJobSheets_A_fkey" FOREIGN KEY ("A") REFERENCES "JobSheet"("jobID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesJobSheets" ADD CONSTRAINT "_SalesJobSheets_B_fkey" FOREIGN KEY ("B") REFERENCES "Sales"("saleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesProducts" ADD CONSTRAINT "_SalesProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Sales"("saleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesProducts" ADD CONSTRAINT "_SalesProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "inventory"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
