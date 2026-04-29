Simple Blog — SEC035 Experiment 5
Course: Web Programming with Python and JavaScript Lab (SEC035)
Program: B.Tech CSE | Semester II | Session 2025-26
Faculty: Mr. Aryan Sharma

Project Structure
simple_blog/
├── app.py                  # Flask application (routes, CRUD logic)
├── requirements.txt        # Python dependencies
├── README.md               # This file
├── templates/
│   ├── base.html           # Master layout (navbar, footer)
│   ├── index.html          # Home page — list all posts
│   ├── create.html         # Create a new post
│   └── edit.html           # Edit an existing post
└── static/
    ├── style.css           # All CSS styling
    └── script.js           # JavaScript (confirm delete, char counter, toasts)
How to Run
# 1. Navigate to project folder
cd simple_blog

# 2. (Optional) Create & activate virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # macOS / Linux

# 3. Install Flask
pip install -r requirements.txt

# 4. Run the Flask app
python app.py

# 5. Open in browser
http://127.0.0.1:5000
Features Implemented
Task	Description	Status
Task 1	Project setup & folder structure	✅
Task 2	Flask app initialization & home route	✅
Task 3	Create blog post (form + POST route)	✅
Task 4	Read & display all posts	✅
Task 5	Edit / update existing post	✅
Task 6	Delete post with confirmation	✅
Task 7	CSS styling + JavaScript interactivity	✅
References
Flask Documentation: https://flask.palletsprojects.com/
Jinja2 Templating: https://jinja.palletsprojects.com/
