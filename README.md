# Service Center Management System

A web-based application designed to streamline the management of service centers, including handling job sheets, inventory management, customer data, and technician assignments. This system aims to improve efficiency, reduce errors, and enhance the overall service experience for both customers and technicians.

## Features

- **Job Sheet Management:** Create, update, and manage job sheets for repair and service requests.
- **Inventory Tracking:** Manage spare parts and accessory stock levels.
- **Technician Assignment:** Assign technicians to jobs based on availability and expertise.
- **Customer Management:** Maintain records of customer details and service history.
- **Dashboard:** View real-time status updates and performance analytics.
# Data Models Overview

This project uses Prisma ORM to define and manage the database schema. Below is a summary of the key data models and their relationships within the system.

## Models

### 1. User
The `User` model represents the primary user of the system. Each user can:
- Create multiple **Job Sheets**.
- Maintain an **Inventory** of products.
- Record multiple **Sales**.

### 2. JobSheet
The `JobSheet` model captures details about repair jobs or service tasks.

**Key Fields:**
- **Customer Details**: Name, Contact, Email.
- **Device Information**: Type, Name, IMEI.
- **Service Charge and Job Status**.

**Relationships:**
- Linked to a `User` via a foreign key (`userId`).
- Can be associated with multiple **Sales**.

### 3. Inventory
The `Inventory` model manages product details for the user.

**Key Fields:**
- **Product Name, Barcode, Price, Stock**.

**Relationships:**
- Linked to a `User` via a foreign key (`userId`).
- Can be part of multiple **Sales**.

### 4. Sales
The `Sales` model tracks transactions for services or product sales.

**Key Fields:**
- **Sale Type**: Service or Accessory.
- **Description, Total Amount, Date**.

**Relationships:**
- Linked to a `User` who made the sale (`userId`).
- Can include multiple **JobSheet** entries (e.g., related services).
- Can include multiple **Inventory** items (e.g., sold products).

## Relationships Summary

### One-to-Many Relationships:
- `User → JobSheet`: A user can create multiple job sheets.
- `User → Inventory`: A user can maintain multiple products in inventory.
- `User → Sales`: A user can make multiple sales.

### Many-to-Many Relationships:
- `Sales ↔ Inventory`: A single sale can involve multiple products, and each product can be part of multiple sales.
- `Sales ↔ JobSheet`: A single sale can involve multiple jobs, and each job can be part of multiple sales.
