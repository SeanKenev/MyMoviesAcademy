fetch("/api/movies")
    .then(res => res.json())
    .then(data => {

        document.getElementById("bannerTitle").textContent = data.banner.title;
        document.getElementById("bannerDesc").textContent = data.banner.description;

        data.banner.meta.forEach(m => {
            const span = document.createElement("span");
            span.textContent = m;
            document.getElementById("bannerMeta").appendChild(span);
        });

        function fillRow(id, count) {
            const row = document.getElementById(id);
            for (let i = 0; i < count; i++) {
                const card = document.createElement("div");
                card.className = "card";
                row.appendChild(card);
            }
        }

        fillRow("recent", 8);
        fillRow("trending", 10);
        fillRow("movies", 10);
        fillRow("series", 10);
        fillRow("recommended", 10);
    });
