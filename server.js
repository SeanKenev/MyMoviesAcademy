const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Dummy API endpoint (placeholder for real movie API)
app.get("/api/movies", (req, res) => {
    res.json({
        banner: {
            title: "Featured Movie Title",
            description: "This is a placeholder synopsis loaded dynamically from an API.",
            meta: ["Action", "2025", "2h 10m", "⭐ 8.5"]
        },
        sections: {
            recentlyUpdated: Array(8).fill({}),
            trending: Array(10).fill({}),
            newMovies: Array(10).fill({}),
            newSeries: Array(10).fill({}),
            recommended: Array(10).fill({})
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
