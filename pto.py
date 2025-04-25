import tkinter as tk
from tkinter import messagebox
import json
from datetime import datetime

# File to store data
DATA_FILE = "pto_data.json"

# Default values
DEFAULT_DAYS = {
    "vacation": 10,
    "floater": 4,
    "sick": 7,
    "fmla": 60
}

# Function to load PTO data from file
def load_data():
    try:
        with open(DATA_FILE, "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        data = DEFAULT_DAYS
    return data

# Function to save PTO data
def save_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file)

# Function to check and reset PTO days based on the date
def reset_days():
    today = datetime.today()
    data = load_data()

    last_reset_year = data.get("last_reset_year", 0)

    if last_reset_year < today.year:
        if today.month == 1 and today.day == 1:
            data["floater"] = DEFAULT_DAYS["floater"]
            data["sick"] = DEFAULT_DAYS["sick"]
        if today.month == 6 and today.day == 1:
            data["vacation"] = DEFAULT_DAYS["vacation"]

        data["last_reset_year"] = today.year
        save_data(data)

# Function to deduct PTO day
def take_day(day_type):
    data = load_data()
    if data[day_type] > 0:
        data[day_type] -= 1
        save_data(data)
        update_ui()
    else:
        messagebox.showwarning("Warning", f"You have no {day_type} days left!")

# Function to reset PTO manually
def reset_manual():
    save_data(DEFAULT_DAYS)
    update_ui()

# Function to update GUI labels
def update_ui():
    data = load_data()
    vacation_label.config(text=f"Vacation: {data['vacation']} days")
    floater_label.config(text=f"Floaters: {data['floater']} days")
    sick_label.config(text=f"Sick: {data['sick']} days")
    fmla_label.config(text=f"FMLA: {data['fmla']} days")

# Initialize Tkinter window
root = tk.Tk()
root.title("PTO and Sick Days")
root.geometry("300x320")
root.configure(bg="#b9acac")

# PTO Labels
vacation_label = tk.Label(root, text="", bg="#b9acac", font=("Arial", 12))
floater_label = tk.Label(root, text="", bg="#b9acac", font=("Arial", 12))
sick_label = tk.Label(root, text="", bg="#b9acac", font=("Arial", 12))
fmla_label = tk.Label(root, text="", bg="#b9acac", font=("Arial", 12))

# Buttons
btn_vacation = tk.Button(root, text="Take Vacation", command=lambda: take_day("vacation"), bg="#4d3a3a", fg="#bebbbb")
btn_floater = tk.Button(root, text="Take Floater", command=lambda: take_day("floater"), bg="#4d3a3a", fg="#bebbbb")
btn_sick = tk.Button(root, text="Take Sick", command=lambda: take_day("sick"), bg="#4d3a3a", fg="#bebbbb")
btn_fmla = tk.Button(root, text="Take FMLA", command=lambda: take_day("fmla"), bg="#4d3a3a", fg="#bebbbb")
btn_reset = tk.Button(root, text="Reset PTO", command=reset_manual, bg="#959292", fg="#4d3a3a")

# Place elements
vacation_label.pack(pady=5)
floater_label.pack(pady=5)
sick_label.pack(pady=5)
fmla_label.pack(pady=5)

btn_vacation.pack(pady=5)
btn_floater.pack(pady=5)
btn_sick.pack(pady=5)
btn_fmla.pack(pady=5)
btn_reset.pack(pady=10)

# Run reset logic and update UI
reset_days()
update_ui()

root.mainloop()