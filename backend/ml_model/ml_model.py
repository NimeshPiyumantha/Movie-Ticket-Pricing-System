import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import sklearn.metrics as metrics


def ml_model():
    # ============================
    # Data Exploration
    # ============================

    # Read the CSV file into a DataFrame
    df = pd.read_csv('data/cinemaTicket_Ref.csv')
    # print(df.head())

    # Display value counts for film codes and quarters
    # print(df['film_code'].value_counts())
    # print(df['quarter'].value_counts())

    # Plotting various exploratory visualizations
    # Heatmap for correlation matrix
    numeric_df = df.select_dtypes(include=['float64', 'int64'])
    correlation_matrix = numeric_df.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
    plt.title('Correlation Heatmap')
    plt.show()

    sns.lineplot(x=df['month'], y=df['total_sales'])
    plt.title("Sales of Ticket Movie")
    plt.xlabel("Month")
    plt.ylabel("Total of Sale")
    plt.show()

    # Plotting Barplot for film codes vs total sales
    plt.figure(figsize=(44, 14))
    sns.barplot(x=df['film_code'], y=df['total_sales'])
    plt.title('Film Code vs Total Sales')
    plt.xlabel('Film Code')
    plt.ylabel('Total Sales')
    plt.show()

    # ============================
    # Data Preprocessing
    # ============================

    # Drop rows with missing values
    df.dropna(axis=0, inplace=True)

    # Extract year and month from the 'date' column
    df['year'] = pd.DatetimeIndex(df['date']).year
    df['month'] = pd.DatetimeIndex(df['date']).month

    # ... (any additional preprocessing steps)

    # ============================
    # Model Development
    # ============================

    # Define features and target variable
    X = df[['ticket_price', 'occu_perc', 'show_time', 'tickets_sold']]
    y = df['total_sales']

    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=100)

    # Initialize and train the linear regression model
    lr = LinearRegression()
    lr.fit(X_train, y_train)

    # ============================
    # Model Evaluation
    # ============================

    # Make predictions and evaluate the model
    y_pred = lr.predict(X_test)

    r_squared = r2_score(y_test, y_pred)
    print(f"R-squared: {r_squared}")

    print(f'MAE: {metrics.mean_absolute_error(y_test, y_pred)}')
    print(f'MSE: {metrics.mean_squared_error(y_test, y_pred)}')
    print(f'RMSE: {np.sqrt(metrics.mean_squared_error(y_test, y_pred))}')

    # ============================
    # Predictions
    # ============================

    # Calculate and print the average ticket price value
    average_ticket_price = df['ticket_price'].mean()
    print(f"Average Ticket Price Value: ${average_ticket_price:.2f}")  # Assuming ticket_price is in dollars

    # Plot actual vs. predicted values
    c = [i for i in range(1, len(y_test) + 1, 1)]
    plt.plot(c, y_test, color='g', linestyle='-')
    plt.plot(c, y_pred, color='b', linestyle='-')
    plt.xlabel('Feature')
    plt.ylabel('Price')
    plt.title('Prediction')
    plt.show()

    # Scatter plot for actual vs. predicted values
    plt.figure(figsize=(12, 6))
    plt.scatter(y_test, y_pred, color='b', linestyle='-')
    plt.show()

if __name__ == "__main__":
    ml_model()
