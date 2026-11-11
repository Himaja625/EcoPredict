# EcoPredict AI: Carbon Footprint Prediction and Sustainability Recommendations

Understanding our impact on the environment is the first step towards reducing it.

**EcoPredict AI** is a machine learning based web application that helps individuals understand their carbon footprint through their everyday lifestyle choices. It analyzes factors such as transportation, diet, household energy consumption, shopping habits, and other daily activities to estimate an individual's carbon emissions.

The main idea behind this project is simple: make environmental awareness more personal, understandable, and useful.

## About the Project

Carbon emissions are influenced by many of the choices we make every day. However, most people are not aware of how their lifestyle contributes to their overall environmental impact.

EcoPredict AI aims to bridge this gap by using machine learning to estimate carbon emissions based on individual lifestyle information.

Along with predicting carbon emissions, the project focuses on providing practical recommendations that can help users make more environmentally friendly decisions.

## Key Features

- **Carbon Footprint Prediction:** Estimates an individual's carbon emissions based on lifestyle information.
- **Lifestyle Analysis:** Examines transportation, diet, energy consumption, shopping habits, and other lifestyle factors.
- **Personalized Recommendations:** Provides suggestions based on the user's lifestyle choices to encourage sustainable habits.
- **Visual Insights:** Presents carbon footprint information through charts, graphs, and interactive visualizations.
- **Model Comparison:** Compares multiple machine learning algorithms to identify a suitable prediction model.
- **User-Friendly Interface:** Provides a simple and accessible experience for exploring personal environmental impact.

## Machine Learning Approach

The project follows a typical machine learning workflow, starting with data exploration and ending with model evaluation.

1. **Data Collection:** Used a carbon footprint dataset obtained from Kaggle.
2. **Data Preprocessing:** Handled missing values, prepared categorical variables, and organized the dataset for model training.
3. **Exploratory Data Analysis:** Studied carbon emission distributions and relationships between lifestyle factors and emissions using visualizations.
4. **Feature Encoding:** Converted categorical lifestyle information into numerical representations.
5. **Feature Scaling:** Applied StandardScaler to scale the input features.
6. **Model Training:** Trained and evaluated multiple regression algorithms.
7. **Model Evaluation:** Compared the models using MAE, RMSE, and R² score.

## Algorithms Used

The following machine learning algorithms were implemented and compared:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor

### Model Performance

Based on the initial model evaluation:

| Algorithm | MAE | RMSE | R² Score |
|---|---:|---:|---:|
| Linear Regression | 518.83 | 647.29 | 0.5970 |
| Decision Tree | 355.09 | 473.55 | 0.7843 |
| Random Forest | 230.00 | 306.81 | 0.9095 |

Random Forest Regressor achieved the best performance among the three models, with an R² score of approximately 0.91.

## Technology Stack

**Programming and Machine Learning**
- Python
- Pandas
- NumPy
- Scikit-learn

**Data Visualization**
- Matplotlib
- Seaborn

**Development Tools**
- Google Colab
- Visual Studio Code
- Git and GitHub

**Web Application**
- React
- CSS
- JavaScript

## Project Structure

The project consists of two main parts:

- **Machine Learning:** Data preprocessing, exploratory analysis, model training, and evaluation.
- **Web Application:** User interface, lifestyle questionnaire, prediction experience, results dashboard, and sustainability recommendations.

## Getting Started

To run the web application locally:

1. Clone this repository:

```bash
git clone https://github.com/YOUR-USERNAME/EcoPredict-AI.git
```

2. Navigate to the project folder:

```bash
cd EcoPredict-AI
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## Current Development Status

The web application includes the landing page, lifestyle questionnaire, results dashboard, visual insights, and recommendation features.

The initial machine learning experiments and model comparison have also been completed in Google Colab.

The current web application uses a clearly identified demo prediction mode. Connecting the trained machine learning model and integrating the prediction API are part of the remaining development work.

## Future Improvements

There is still plenty of scope to improve EcoPredict AI. Some of the features I would like to explore include:

- Integrating the trained Random Forest model with the web application.
- Developing a Flask API for real-time predictions.
- Improving personalized recommendations using individual prediction results.
- Adding historical carbon footprint tracking.
- Introducing monthly progress comparisons.
- Providing more detailed insights into individual emission contributors.

## What I Learned

Working on EcoPredict AI has helped me understand how machine learning can be applied to a real-world environmental problem.

From exploring datasets and preprocessing data to training different regression models and developing a web application, this project has given me an opportunity to work through different stages of the machine learning development process.

It has also helped me understand that a prediction alone is not always enough. Presenting the results in a meaningful way and helping users understand what they can do with that information is equally important.

## A Small Note

EcoPredict AI is an academic project developed as part of my learning journey in Data Science and Machine Learning. The predictions are estimates based on the dataset and trained model, not official carbon audits.

I hope this project encourages people to pay a little more attention to their everyday choices and the impact those choices have on our environment.

**Small changes can make a difference.**

---

**Developed with curiosity and a little love for our planet.**
