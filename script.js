window.addEventListener("DOMContentLoaded", () => {

  console.log("INIT OK");

  /* =========================
     SAFE WRAPPER
  ========================= */

  function safe(id, fn) {
    try {
      fn(document.getElementById(id));
    } catch (e) {
      console.warn("Error in:", id, e);
    }
  }

  /* =========================
     1. LIVE STAGE (이미 있음)
  ========================= */
  safe("liveGraph", (el) => {
    if (!el) return;

    const btn = document.getElementById("generateBtn");

    if (btn) {
      btn.onclick = () => {

        el.innerHTML = "Generating...";

        setTimeout(() => {

          const values = Array.from({length: 12}, () =>
            Math.random() * 10
          );

          Plotly.newPlot("liveGraph", [{
            x: values.map((_, i) => i),
            y: values,
            mode: "lines+markers"
          }], {
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent"
          });

        }, 500);

      };
    }
  });

  /* =========================
     2. 3D PLOT (SAFE)
  ========================= */
  safe("plot3d", () => {

    if (!document.getElementById("plot3d")) return;
    if (typeof Plotly === "undefined") return;

    const x = [], y = [], z = [];

    for (let i = -5; i <= 5; i += 0.5) {
      x.push(i);
      y.push(i);
    }

    for (let i = 0; i < x.length; i++) {
      const row = [];
      for (let j = 0; j < y.length; j++) {
        row.push(Math.sin(Math.sqrt(x[i]*x[i] + y[j]*y[j])));
      }
      z.push(row);
    }

    Plotly.newPlot("plot3d", [{
      z,
      x,
      y,
      type: "surface"
    }], {
      paper_bgcolor: "transparent"
    });

  });

  /* =========================
     3. PIE CHART (SAFE)
  ========================= */
  safe("pieChart", () => {
    if (typeof Plotly === "undefined") return;

    Plotly.newPlot("pieChart", [{
      values: [30, 20, 25, 25],
      labels: ["A", "B", "C", "D"],
      type: "pie"
    }], {
      paper_bgcolor: "transparent"
    });
  });

  /* =========================
     4. LINE CHART (SAFE)
  ========================= */
  safe("lineChart", () => {
    if (typeof Plotly === "undefined") return;

    const x = [], y = [];

    for (let i = 0; i < 20; i++) {
      x.push(i);
      y.push(Math.exp(-i / 5));
    }

    Plotly.newPlot("lineChart", [{
      x, y,
      mode: "lines"
    }], {
      paper_bgcolor: "transparent"
    });
  });

  /* =========================
     5. TABLE (SAFE)
  ========================= */
  safe("dataTable", () => {

    const tbody = document.querySelector("#dataTable tbody");
    if (!tbody) return;

    const data = [
      [1,0.8,0.5],
      [2,0.6,0.6],
      [3,0.4,0.7]
    ];

    tbody.innerHTML = "";

    data.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td>`;
      tbody.appendChild(tr);
    });

  });

  /* =========================
     CSV DOWNLOAD
  ========================= */
  const dl = document.getElementById("downloadCSV");

  if (dl) {
    dl.onclick = () => {

      const csv = "Epoch,Loss,Acc\n1,0.8,0.5\n2,0.6,0.6\n3,0.4,0.7";

      const blob = new Blob([csv], {type:"text/csv"});
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      a.click();
    };
  }

});