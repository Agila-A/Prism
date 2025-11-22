# parser.py
import re
import pandas as pd

def extract_number_after_keyword(tokens, keyword_list):
    for key in keyword_list:
        if key in tokens:
            idx = tokens.index(key)
            if idx + 1 < len(tokens):
                # next token maybe number with commas
                val = tokens[idx + 1].replace(",", "")
                try:
                    return float(re.sub(r"[^\d.]", "", val))
                except:
                    continue
    return None

def parse_transcript_to_applicant(transcript: str) -> (dict, list):
    """
    Try to extract fields: age, salary (annual), credit_score, existing_emi (monthly), loan_amount, default_history
    Returns dict (may be incomplete) and list of missing fields
    """
    text = transcript.lower().replace("rupees", "").replace("rs", "")
    tokens = re.split(r"\s+|,|\.", text)
    # keywords to search
    age = extract_number_after_keyword(tokens, ["age", "aged"])
    salary = extract_number_after_keyword(tokens, ["salary", "income", "annual", "annual_salary", "annually"])
    credit = extract_number_after_keyword(tokens, ["credit", "credit_score", "score"])
    emi = extract_number_after_keyword(tokens, ["emi", "existing_emi", "monthly_emi", "monthly"])
    loan = extract_number_after_keyword(tokens, ["loan", "loan_amount", "want", "want_to_borrow"])
    default = None
    if "default" in text or "previous default" in text or "had default" in text or "defaulted" in text:
        default = 1
    # heuristic: if user says "no default", set 0
    if "no default" in text or "no defaults" in text or "never defaulted" in text:
        default = 0

    result = {}
    if age is not None: result['age'] = int(age)
    if salary is not None: result['salary'] = float(salary)
    if credit is not None: result['credit_score'] = int(credit)
    if emi is not None: result['existing_emi'] = float(emi)
    if loan is not None: result['loan_amount'] = float(loan)
    if default is not None: result['default_history'] = int(default)

    required = ['age', 'salary', 'credit_score', 'existing_emi', 'loan_amount', 'default_history']
    missing = [f for f in required if f not in result]
    return result, missing

def make_dataframe_from_dict(d):
    import pandas as pd
    # fill missing fields with sensible defaults (0 for default_history)
    fields = {
        "age": int(d.get("age", 30)),
        "salary": float(d.get("salary", 360000.0)),
        "credit_score": int(d.get("credit_score", 650)),
        "existing_emi": float(d.get("existing_emi", 0.0)),
        "loan_amount": float(d.get("loan_amount", 100000.0)),
        "default_history": int(d.get("default_history", 0))
    }
    return pd.DataFrame([fields])
