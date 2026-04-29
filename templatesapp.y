# ============================================================
# Project Title : Simple Blog Platform (Experiment 5)
# Student Name  : [Your Name Here]
# Course        : SEC035 - Web Programming with Python & JS Lab
# Semester      : II (2025-26 Even)
# Faculty       : Mr. Aryan Sharma
# Date          : 2025
# ============================================================

from flask import Flask, render_template, request, redirect, url_for

# Initialize the Flask application
app = Flask(__name__)

# -------------------------------------------------------
# In-memory storage for blog posts (no database required)
# Each post is a dictionary with: id, title, content
# -------------------------------------------------------
posts = [
    {
        "id": 1,
        "title": "Welcome to Simple Blog!",
        "content": "This is your first blog post. You can create, edit, and delete posts using this platform. Built with Flask, HTML, CSS, and JavaScript."
    },
    {
        "id": 2,
        "title": "Getting Started with Flask",
        "content": "Flask is a lightweight Python web framework. It is easy to learn and perfect for building small web applications like this blog."
    }
]

# Counter to generate unique IDs for new posts
next_id = 3


# -------------------------------------------------------
# HOME ROUTE — Read: Display all blog posts
# -------------------------------------------------------
@app.route("/")
def index():
    """Home page: shows all blog posts in reverse order (newest first)."""
    return render_template("index.html", posts=list(reversed(posts)))


# -------------------------------------------------------
# CREATE ROUTE — Add a new blog post
# -------------------------------------------------------
@app.route("/create", methods=["GET", "POST"])
def create():
    """
    GET  → Show the create form.
    POST → Accept form data, append new post, redirect to home.
    """
    global next_id

    if request.method == "POST":
        title   = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        # Basic validation: both fields must be non-empty
        if title and content:
            new_post = {
                "id": next_id,
                "title": title,
                "content": content
            }
            posts.append(new_post)
            next_id += 1

        return redirect(url_for("index"))

    return render_template("create.html")


# -------------------------------------------------------
# EDIT ROUTE — Update an existing blog post
# -------------------------------------------------------
@app.route("/edit/<int:post_id>", methods=["GET", "POST"])
def edit(post_id):
    """
    GET  → Show the edit form pre-filled with existing data.
    POST → Save updated title/content, redirect to home.
    """
    # Find the post by its id
    post = next((p for p in posts if p["id"] == post_id), None)

    if post is None:
        # If post not found, redirect to home
        return redirect(url_for("index"))

    if request.method == "POST":
        title   = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        # Update only if both fields are non-empty
        if title and content:
            post["title"]   = title
            post["content"] = content

        return redirect(url_for("index"))

    return render_template("edit.html", post=post)


# -------------------------------------------------------
# DELETE ROUTE — Remove a blog post
# -------------------------------------------------------
@app.route("/delete/<int:post_id>", methods=["POST"])
def delete(post_id):
    """
    POST → Remove the post with the given id, redirect to home.
    Only POST is accepted to prevent accidental deletions via URL.
    """
    global posts
    posts = [p for p in posts if p["id"] != post_id]
    return redirect(url_for("index"))


# -------------------------------------------------------
# Run the Flask development server
# -------------------------------------------------------
if __name__ == "__main__":
    # debug=True enables auto-reload and better error messages
    app.run(debug=True)
