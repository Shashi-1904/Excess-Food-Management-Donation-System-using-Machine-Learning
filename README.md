## ServeSurplus - A Web-Based Food Donation System

**Project Status**: In Development

---

## Project Overview

**ServeSurplus** is a web-based platform designed to reduce food wastage by connecting donors, such as hotels, restaurants, and individuals, with NGOs that distribute surplus food to those in need. The platform facilitates easy and efficient food donations while promoting sustainability and community support.

This system aims to tackle the issue of increasing food wastage, especially in highly populated countries like India, where hunger persists despite the availability of edible surplus food. The platform ensures that surplus food reaches those who need it most, minimizing wastage and promoting environmental sustainability.

---

## Key Features

1. **Location-Based Recommendation System**:
   - We are implementing an Item-Based Collaborative Filtering (IBCF) recommendation system to suggest optimal food donation locations based on the donor's proximity and volunteer availability.

2. **Admin Dashboard for Hotels**:
   - The system provides an analytics dashboard for hotels and other food donors to monitor food donations and wastage, offering insights and suggestions for reducing excess food.

3. **Path Optimization for Volunteers**:
   - Volunteers are given optimized routes to collect and deliver food efficiently, minimizing transportation time and costs.

---

## Technology Stack

- **Frontend**: React (MERN stack)
- **Backend**: Node.js, Express.js, MongoDB
- **Machine Learning**: Flask (IBCF model)
- **Path Optimization**: Python-based algorithms for route planning

---

## Future Enhancements

- **Mobile App Integration**: Extend the web-based platform to mobile applications for easier access and real-time tracking.
- **Advanced Analytics**: Implement more sophisticated data analysis for predicting food wastage trends.
- **Volunteer Management**: Automate volunteer assignments based on location and availability.
  
---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/ServeSurplus.git

2. Navigate to the project directory:

    ```bash
    cd ServeSurplus


3. Install dependencies:


    ```bash
    npm install

4. Set up the backend (Flask for ML model):

    ```bash
    cd flask-backend
    pip install -r requirements.txt
    python app.py


5. Start the development server:

    ```bash
    npm start

## Current Development Progress
- Completed the login and registration modules
- Implemented basic user roles: Donor, Volunteer, and Admin
- Developed initial schema for data management
- Integrated the basic functionality of IBCF model for location recommendation (in progress)



## Contact
- For any queries, please contact us at: shashikantp2302@email.com


