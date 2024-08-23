import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

# Load your collected data
data = pd.read_csv('user_data.csv')

# Feature engineering
data['scrollSpeed'] = data['scrollEvents'] / data['idleTime']
data['clickFrequency'] = data['clickPositions'] / data['idleTime']

# Drop any unnecessary or redundant features
data.drop(['idleTime'], axis=1, inplace=True)

# Split the data
X = data.drop('label', axis=1)
y = data['label']

# Normalize the data
scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test the model
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f'Accuracy: {accuracy * 100:.2f}%')

# Save the model
import joblib
joblib.dump(model, 'bot_detection_model.pkl')




from sklearn.metrics import confusion_matrix, classification_report

# Evaluate the model
print("Confusion Matrix:")
print(confusion_matrix(y_test, predictions))

print("Classification Report:")
print(classification_report(y_test, predictions))




from sklearn.model_selection import GridSearchCV

# Define the parameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Set up the grid search
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2)
grid_search.fit(X_train, y_train)

# Output the best parameters
print(f'Best Parameters: {grid_search.best_params_}')

# Train the model with the best parameters
best_model = grid_search.best_estimator_
best_model.fit(X_train, y_train)
