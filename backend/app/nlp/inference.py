# ------------------------------
# Loan Prediction with Text Explanations
# ------------------------------

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
from sklearn.calibration import CalibratedClassifierCV
import shap
import joblib
import os

# ------------------------------
# 1. Load Dataset
# ------------------------------
df = pd.read_csv("loan_dataset_30k_optionA.csv")

# ------------------------------
# 2. Preprocess & Feature Engineering
# ------------------------------

if df['approved'].dtype == 'object':
    df['approved'] = LabelEncoder().fit_transform(df['approved'])

df['monthly_income'] = df['salary'] / 12
df['loan_to_income'] = df['loan_amount'] / df['monthly_income']
df['debt_to_income'] = df['existing_emi'] / df['monthly_income']

# FINAL FEATURES
features = [
    'age', 'salary', 'credit_score', 'existing_emi', 'loan_amount',
    'default_history', 'debt_to_income', 'loan_to_income'
]

X = df[features]
y = df['approved']

# ------------------------------
# 3. Always Retrain (avoid mismatch)
# ------------------------------

if os.path.exists("loan_model.pkl"):
    os.remove("loan_model.pkl")
if os.path.exists("calibrated_model.pkl"):
    os.remove("calibrated_model.pkl")

# ------------------------------
# 4. Train Fresh Model
# ------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

scale_pos_weight = len(y_train[y_train == 0]) / len(y_train[y_train == 1])

model = XGBClassifier(
    eval_metric='logloss',
    n_estimators=200,
    learning_rate=0.1,
    max_depth=5,
    scale_pos_weight=scale_pos_weight
)

model.fit(X_train, y_train)
joblib.dump(model, "loan_model.pkl")

# Calibrated model
calibrated_model = CalibratedClassifierCV(model, method='isotonic', cv='prefit')
calibrated_model.fit(X_train, y_train)
joblib.dump(calibrated_model, "calibrated_model.pkl")

# ------------------------------
# 5. Evaluation
# ------------------------------

y_prob = model.predict_proba(X_test)[:, 1]
threshold = 0.4
y_pred = (y_prob > threshold).astype(int)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("ROC-AUC:", roc_auc_score(y_test, y_prob))

# ------------------------------
# 6. SHAP Explainer
# ------------------------------
explainer = shap.TreeExplainer(model)

# ------------------------------
# Auto Reject Rules
# ------------------------------
def check_auto_reject(applicant_df):
    reasons = []
    age = applicant_df['age'].iloc[0]
    credit = applicant_df['credit_score'].iloc[0]
    emi = applicant_df['existing_emi'].iloc[0]
    salary = applicant_df['salary'].iloc[0]
    loan = applicant_df['loan_amount'].iloc[0]

    if age < 18 or age > 70:
        reasons.append("Applicant age is not within 18–70.")
    if credit < 550:
        reasons.append("Credit score below 550.")
    if emi > 0.6 * (salary / 12):
        reasons.append("EMI exceeds 60% of monthly income.")
    if loan > 6 * salary:
        reasons.append("Requested loan exceeds 6× annual income.")

    return (len(reasons) > 0, reasons)

# ------------------------------
# 7. Explanation Function
# ------------------------------
def explain_loan(applicant_df, threshold=0.4):

    # add engineered fields
    applicant_df = applicant_df.copy()
    applicant_df['monthly_income'] = applicant_df['salary'] / 12
    applicant_df['loan_to_income'] = applicant_df['loan_amount'] / applicant_df['monthly_income']
    applicant_df['debt_to_income'] = applicant_df['existing_emi'] / applicant_df['monthly_income']

    # reorder
    applicant_df = applicant_df[features]

    # auto reject check
    auto_reject, reasons = check_auto_reject(applicant_df)
    if auto_reject:
        return {"decision": "Rejected", "probability": 0.0, "explanation": reasons}

    # ML probability
    prob = calibrated_model.predict_proba(applicant_df)[:, 1][0]

    # soft adjustments
    age = applicant_df['age'].iloc[0]
    credit = applicant_df['credit_score'].iloc[0]
    salary = applicant_df['salary'].iloc[0]
    emi_ratio = applicant_df['existing_emi'].iloc[0] / (salary / 12)
    loan_ratio = applicant_df['loan_amount'].iloc[0] / salary
    dti = applicant_df['debt_to_income'].iloc[0]
    lti = applicant_df['loan_to_income'].iloc[0]
    default = applicant_df['default_history'].iloc[0]

    if age > 65: prob *= 0.70
    elif age > 60: prob *= 0.80

    if emi_ratio > 0.5: prob *= 0.60
    elif emi_ratio > 0.4: prob *= 0.75

    if loan_ratio > 4: prob *= 0.60
    elif loan_ratio > 3: prob *= 0.75

    if default == 1: prob *= 0.50

    prob = max(0.10, min(prob, 0.85))
    decision = "Approved" if prob > threshold else "Rejected"

    # --------------------------
    # SHAP Explanation
    # --------------------------
    shap_values = explainer.shap_values(applicant_df)[0]

    abs_order = np.argsort(np.abs(shap_values))[-3:]

    explanation = []

    if default == 1:
        explanation.append("Past default reduces approval probability.")

    # detailed explanation
    for idx in abs_order:
        feat = features[idx]
        shap_effect = shap_values[idx]

        if feat == 'age':
            if age < 25: explanation.append("Young age supports repayment ability.")
            elif age <= 45: explanation.append("Age is ideal for loan approval.")
            elif age <= 60: explanation.append("Age slightly above ideal, minor risk.")
            else: explanation.append("Age above 60 increases lending risk.")

        elif feat == 'credit_score':
            if credit >= 750:
                explanation.append("Excellent credit score increases approval chances.")
            elif credit >= 700:
                explanation.append("Good credit score supports approval.")
            elif credit >= 600:
                explanation.append("Fair credit score moderately impacts approval.")
            else:
                explanation.append("Poor credit score reduces approval probability.")

        elif feat == 'loan_amount':
            if loan_ratio > 6:
                explanation.append("Loan amount extremely high relative to income.")
            elif loan_ratio > 3:
                explanation.append("Loan amount moderately high compared to income.")
            else:
                explanation.append("Loan amount acceptable relative to income.")

        elif feat == 'existing_emi':
            if emi_ratio > 0.6:
                explanation.append("High existing EMI burden reduces repayment capacity.")
            elif emi_ratio > 0.4:
                explanation.append("Moderate EMI burden slightly increases risk.")
            else:
                explanation.append("Existing EMI manageable.")

        elif feat == 'debt_to_income':
            if dti > 0.6:
                explanation.append("High debt-to-income ratio increases rejection risk.")
            elif dti > 0.4:
                explanation.append("Moderate DTI slightly risky.")
            else:
                explanation.append("Healthy debt-to-income ratio.")

        elif feat == 'loan_to_income':
            if lti > 18:
                explanation.append("Loan-to-income ratio extremely high.")
            elif lti > 12:
                explanation.append("Loan-to-income ratio moderately high.")
            else:
                explanation.append("Loan-to-income ratio stable.")

        elif feat == 'salary':
            if salary < 200000:
                explanation.append("Low income increases repayment risk.")
            elif salary < 500000:
                explanation.append("Moderate income supports approval.")
            else:
                explanation.append("Strong income stability supports approval.")

    return {
        "decision": decision,
        "probability": round(prob, 2),
        "explanation": explanation
    }