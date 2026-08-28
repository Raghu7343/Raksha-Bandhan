from pathlib import Path

from flask import Flask, render_template, send_from_directory


ROOT_DIR = Path(__file__).parent
VIDEO_DIR = ROOT_DIR / "static" / "video"
VIDEO_FILENAME = "raksha bandhan.mp4"
VIDEO_PATH = VIDEO_DIR / VIDEO_FILENAME

app = Flask(
	__name__,
	template_folder=ROOT_DIR / "templates",
	static_folder=None,
)


@app.route("/")
def index():
	return render_template("index.html")


@app.route("/surprise")
def surprise():
	return render_template(
		"surprise.html",
		video_available=VIDEO_PATH.is_file(),
		video_filename=VIDEO_FILENAME,
	)


@app.get("/static/video/<path:filename>")
def video_file(filename):
	return send_from_directory(VIDEO_DIR, filename)


@app.get("/static/<path:filename>", endpoint="static")
def static_file(filename):
	return send_from_directory(ROOT_DIR / "static", filename)


if __name__ == "__main__":
	app.run(host="127.0.0.1", port=5000, debug=True)
