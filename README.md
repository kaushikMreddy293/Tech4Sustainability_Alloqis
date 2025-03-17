# Siemens Tech Hackathon

# **Sustainable Additive Manufacturing: Carbon Footprint Calculator**

## **Overview**
This project was developed as part of the **Siemens Tech for Sustainability Hackathon 2024**, where our team, **Alloqis**, secured **1st place**. The prototype is a **React-based web application** that leverages **Siemens additive manufacturing data** and multiple open APIs to calculate the **material, manufacturing, and logistics carbon footprint**. The goal is to make sustainability a decisive factor in additive manufacturing material selection, helping customers make **eco-friendly choices**.

## **Key Features**
- **Material Footprint Calculation**: Computes the environmental impact of material procurement.
- **Manufacturing Footprint Analysis**: Estimates carbon emissions during the additive manufacturing process.
- **Logistics Footprint Computation**: Evaluates emissions from transportation and supply chain.
- **Seamless API Integration**: Fetches and processes relevant data from multiple sources to generate an accurate carbon footprint report.

## **Technology Stack**
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **APIs Used**:
  - **API Ocean**: Industry-related sustainability data
  - **Gravity API**: Environmental impact analysis
  - **Position Stack**: Geolocation services for logistics calculations
  - **Carbon Interface**: Carbon footprint estimation
- **Database**: MongoDB (for storing calculation results and user selections)
- **Hosting & Deployment**: AWS EC2

## **Hackathon Leadership & My Role**
As the **Lead Developer**, my responsibilities included:
- Understanding the project vision and aligning development with feasibility constraints.
- **Building a custom API** to efficiently fetch Siemens additive manufacturing data.
- **Integrating Open APIs** for comprehensive carbon footprint calculations.
- **Coordinating across time zones (PST, EST, IST, CET)** with a team comprising a UI/UX designer, two developers, a mechanical engineer, and a project lead.
- Leading the team through technical challenges and ensuring smooth collaboration.
- Presenting the final prototype to judges, explaining its implementation and real-world impact.

## **Challenges Overcome**
- **Cross-Time Zone Coordination**: Managed communication and scheduling with team members across **four time zones**.
- **Diverse Team Experience**: Led a team including **two sophomore students and two senior professionals (15+ years of experience)**.
- **Gaining Leadership Buy-in**: Established credibility by solving key technical issues and adapting my approach to suit each team member's expertise.

## **Outcome**
- **Successfully delivered a functional prototype within the deadline**.
- Demonstrated real-world applicability by showcasing how companies can reduce their carbon footprint.
- Won **1st place** in the Siemens Tech for Sustainability Hackathon 2024.

## **Setup & Installation**
### **Prerequisites**
Ensure you have the following installed:
- Node.js & npm
- MongoDB (if using locally)
- API keys for the integrated APIs

### **Installation Steps**
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/sustainable-additive-manufacturing.git
   cd sustainable-additive-manufacturing
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_API_OCEAN_KEY=your_api_ocean_key
   REACT_APP_GRAVITY_API_KEY=your_gravity_api_key
   REACT_APP_POSITION_STACK_KEY=your_position_stack_key
   REACT_APP_CARBON_INTERFACE_KEY=your_carbon_interface_key
   ```

4. **Run the Application**
   ```sh
   npm start
   ```

5. Glimpse of Project

    <img width="1097" alt="image" src="https://github.com/user-attachments/assets/dbb1b586-b3e7-4a3a-a8bf-4b2bb752fbba" />

    <img width="1097" alt="image" src="https://github.com/user-attachments/assets/a387ff6b-8d1d-454a-a0a2-c2cb8215581e" />

## **Future Enhancements**
- **Enhanced Data Visualization**: Interactive charts to illustrate carbon footprint reduction over time.
- **User Profiles & Recommendations**: Personalized suggestions for material selection.
- **Integration with Siemens Digital Twin**: Provide deeper insights into sustainability metrics.

## **Contributors**
- **Your Name** (Lead Developer)
- Team Members: UI/UX Designer, Developer, Mechanical Engineer, Project Lead

## **License**
This project is licensed under the MIT License.

---
### **Acknowledgments**
Special thanks to **Siemens** for providing valuable datasets and organizing the **Tech for Sustainability Hackathon 2024**. Our victory underscores the importance of **sustainability in additive manufacturing** and the potential for **data-driven decision-making** to create a greener future.

