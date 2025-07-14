## Gres System API – Certificates, Billing and Client Management (FastAPI + PostgreSQL)

This repository contains the **refactored frontend** of a real-world production system originally developed in raw PHP for a private environmental services company in Colombia. The refactor is being carried out using **React + Vite**, with **Axios** used to communicate with a backend built in **FastAPI** (hosted in a separate repository).

---

## 🧩 Project Context

The original legacy system has been used for years by the client and continues to operate in production. It handles the full lifecycle of customer interactions related to environmental service certification and billing.

This repository represents the **modernized frontend**, rebuilt from scratch using modern JavaScript technologies, with API integration ready and in use.

---

## ✅ Current Status

- 🔄 Migrated from: Legacy PHP (version 1)
- ⚙️ This repo: React + Vite frontend (in-progress but functional)
- 🔗 Backend: FastAPI + PostgreSQL (available in separate repository)
- ☁️ Integration: Axios is already implemented for API communication

---

## 🚀 Core Features

- Built with **React + Vite** for fast development and modern SPA performance
- Uses **Axios** for communication with FastAPI backend
- Enables real-time customer and document handling
- Frontend handles:
  - Listing and searching of generated certificates
  - Invoice issuance interface
  - Client management UI
- Backend handles:
  - PDF generation and email delivery (triggered automatically from UI)
  - Database and logic for certificates and accounts receivable

---

## 🛠️ Tech Stack

- React (Functional Components + Hooks)
- Vite (Fast dev server and optimized build)
- Axios (API consumption)
- JavaScript (ES6+)
- ESLint + Prettier

---

## 📁 Structure

src/ 
├── assets/ # Static assets (images, logos, etc.) 
├── components/ # Reusable UI components (e.g. buttons, cards) 
├── layouts/ # General layout wrappers (e.g. sidebar, nav) 
├── pages/ # Top-level views or screens (e.g. Clients, Invoices) 
├── scripts/ # Utility functions and helper logic 
├── styles/ # CSS or styling modules 
├── App.jsx # Root app component 
├── App.css # Global styles 
└── main.jsx # Vite entry point

## 🛑 License

This repository is **not open source** and does **not grant any license** for reproduction, distribution, or modification.  
All content belongs to **Gres Del Eje** and the original developer.  
Use is strictly prohibited without explicit permission.



