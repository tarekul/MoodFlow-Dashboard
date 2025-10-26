[![Coverage Status](https://coveralls.io/repos/github/tarekul/MoodFlow-Dashboard/badge.svg?branch=main)](https://coveralls.io/github/tarekul/MoodFlow-Dashboard?branch=main)
# MoodFlow Dashboard

MoodFlow is a personalized analytics dashboard that helps users understand the relationship between their daily habits, mood, and productivity. By visualizing correlations and trends from logged data, it provides actionable insights and a tailored action plan to boost well-being and performance.

## ✨ Features

- **User Personas**: Switch between different user profiles (e.g., Mood-Driven, High Performer) to see varied data patterns.
- **At-a-Glance Summary**: Key metrics like average productivity, mood, sleep, and stress are displayed in summary cards.
- **Key Factor Highlight**: The dashboard automatically identifies and highlights the most influential factor affecting your productivity.
- **Multiple Data Views**:
  - **Dashboard**: An overview of your most significant productivity boosters and drainers.
    - **Correlation Analysis**: A bubble chart visualizing the strength and relationship of various factors on productivity.
  - **Time Series**: Line charts showing how your metrics have trended over time.
  - **Action Plan**: A concrete, prioritized list of daily actions to improve your productivity, complete with success metrics.
- **Responsive Design**: Built with Tailwind CSS for a clean, modern, and responsive user interface.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Linting**: [ESLint](https://eslint.org/)

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https.nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Running

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tarekul/MoodFlow-Dashboard.git
   cd MoodFlow-Dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
/src
├── assets/         # Static assets (images, svgs)
├── components/     # Reusable React components
├── data/           # User data in JSON format
├── utils/          # Helper functions
├── App.jsx         # Main application component
├── index.css       # Global styles
└── main.jsx        # Application entry point
```

## 📊 Data Source

The analysis and data processing logic behind this dashboard can be found in the accompanying Jupyter Notebook:

[**mood_productivity_analysis.ipynb on GitHub**](https://github.com/tarekul/mood-productivity-analyzer/blob/main/mood_productivity_analysis.ipynb)
