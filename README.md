# ⏱️ Pomodoro+

https://snazzy-dieffenbachia-0bf0b4.netlify.app/

### Projeto da disciplina **Engenharia de Software e Arquitetura de Sistemas**  
**Curso:** Ciência da Computação – FECAP  
**Professora:** Lucy Mari  
**Ano:** 2025  

---
## 👥 Integrantes do Grupo

| Nome | RA |
|------|------|
| Antônio Petri Oliveira | 24026144 |
| Caroliny Rossi Bittencourt | 24025959 |
| Rafael Alves dos Santos Guimarães | 24025724 |
| **Duda Lucena Miguel** | **24025889** |
| Isadora Teixeira Santoma | 24026458 |

---

## 📘 Introdução

O **método Pomodoro** é uma técnica de gerenciamento de tempo desenvolvida para aumentar a produtividade e o foco nos estudos ou no trabalho.  
Baseia-se em ciclos curtos de **concentração intensa**, seguidos de **pequenos intervalos de descanso**, ajudando a reduzir distrações e melhorar a retenção do conteúdo estudado.  

O **Pomodoro+** traz esse conceito para um **aplicativo web interativo**, permitindo que o próprio usuário crie **ciclos personalizados de foco e descanso**, adaptando a técnica às suas necessidades de rotina e estudo.

---

## 🎯 Objetivo do Projeto

A proposta do **Pomodoro+** é oferecer uma ferramenta que auxilie estudantes e profissionais a **organizar o tempo de forma eficiente**, por meio de:

- Ciclos de **foco e descanso configuráveis** pelo usuário;  
- **Histórico de uso** para acompanhar o desempenho;  
- **Gestão de temas e assuntos de estudo**;  
- Interface intuitiva e amigável, desenvolvida a partir de protótipos no Figma.  

🔗 [Veja o protótipo no Figma](https://www.figma.com/design/bKKPgFvdPlByNw07LeXmvO/Pomodoro-?node-id=0-1&t=CKAjKLGLNqbc1D18-1)

---

## 🧩 Tecnologias Utilizadas

### 💻 **Front-end**
- **React.js** – Criação da interface e componentes reutilizáveis.  
- **Vite** – Ferramenta de build e ambiente de desenvolvimento rápido.  

### ⚙️ **Back-end**
- **Flask (Python)** – Framework leve e eficiente para criação das APIs e integração com o banco de dados.  
- **SQLite** – Banco de dados local para armazenamento das informações de usuários, ciclos e sessões.  

---

## 📂 Estrutura do Projeto

```
pomodoro_plus/
├── backend/
│   ├── app.py
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── database/
├── frontend/
│   ├── src/
│   │   ├── app.jsx          
│   │   ├── components/      
│   │   ├── pages/           
│   │   ├── hooks/           
│   │   ├── routes/          
│   │   └── services/        
└── README.md
```


---

## 🚀 Como Executar

### 🔧 Back-end (Flask)
```bash
cd backend
python app.py
```
### 💻 Front-end (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
