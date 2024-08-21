# Clean Architecture Project with Expo Go and React Native

This project uses React Native with Expo Go to create a mobile app using clean architecture principles. Clean architecture allows for the creation of modular, scalable and maintainable applications by separating the responsibilities of each layer of the application.

## Table of Contents

- [Project Description](#Project-Description)
- [Project Structure](#Project-Structure)
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)


## Project description

The app aims to demonstrate how to implement clean architecture in a React Native project using Expo Go. It focuses on separating the concerns of business logic, application logic and user interface logic into different layers

## Project Structure

```plaintext
/Proyecto
|-- /src
|   |-- /domain       # Contains entities and use cases
|   |   |-- entities  # Business entities
|   |   |-- usecases  # Use cases (business logic)
|   |
|   |-- /data         # Data management
|   |   |-- models    # Data models
|   |   |-- sources   # Data sources (API, local storage, etc.)
|   |   |-- repositories # Repository implementations
|   |
|   |-- /presentation # Presentation logic
|   |   |-- components # UI components
|   |   |-- screens    # Application screens
|   |   |-- viewmodels # UI Logic
|   |
|   |-- /core         # Shared functionalities and utilities
|   |   |-- utils     # General Utilities
|   |   |-- styles    # Global styles
|
|-- App.js            # Application entry point
|-- package.json      # NPM configuration
|-- README.md         # This file

```

 ## System requirements:

- Node.js (LTS).
- macOS, Windows (Powershell and WSL 2), and Linux are supported.

 ## Installation

Follow these steps to configure the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kuzan-dev/clean_arch_react_native_expo_workflow.git

2. **Installs the project dependencies:**
   
   ```bash
   npm install
4. **Start the project with Expo:**

   ```bash
   expo start
 ## Screenshot

 <img src="./screenshot/app_workflow.png" alt="application" width="300"/>