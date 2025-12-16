fetch("dashboard_data/kpi.json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalSales").textContent =
            `$${data.total_sales.toLocaleString()}`;

        document.getElementById("totalProfit").textContent =
            `$${data.total_profit.toLocaleString()}`;

        document.getElementById("orderCount").textContent =
            data.order_count.toLocaleString();

        document.getElementById("customerCount").textContent =
            data.customer_count.toLocaleString();
    });





fetch("dashboard_data/monthly_sales.json")
    .then(res => res.json())
    .then(data => {
        const months = data.map(d => d.Month);
        const sales = data.map(d => d.Sales);

        Plotly.newPlot("salesTrend", [{
            x: months,
            y: sales,
            type: "scatter",
            mode: "lines+markers"
        }], {
            title: "Monthly Sales Trend"
        });
    });


fetch("dashboard_data/category_profit.json")
    .then(res => res.json())
    .then(data => {
        Plotly.newPlot("categoryProfit", [{
            x: data.map(d => d.Category),
            y: data.map(d => d.Profit),
            type: "bar"
        }], {
            title: "Profit by Category"
        });
    });





fetch("dashboard_data/subcategory_profit.json")
    .then(res => res.json())
    .then(data => {

        // Step 1：依 Profit 由大到小排序
        const sortedData = [...data].sort((a, b) => b.Profit - a.Profit);

        // Step 2：切 Top 5 / Bottom 5
        const top5 = sortedData.slice(0, 5);
        const bottom5 = sortedData.slice(-5);

        // ===== Top 5 圖 =====
        Plotly.newPlot("top5SubCategory", [{
            x: top5.map(d => d["Sub-Category"]),
            y: top5.map(d => d.Profit),
            type: "bar",
            marker: {
                color: top5.map(d => d.Profit < 0 ? "#ef4444" : "#22c55e")
            }
        }], {
            title: "Top 5 Sub-Categories by Profit",
            xaxis: { tickangle: -30 },
            yaxis: { title: "Profit" }
        });

        // ===== Bottom 5 圖 =====

        bottom5.sort((a, b) => a.Profit - b.Profit);

        Plotly.newPlot("bottom5SubCategory", [{
            x: bottom5.map(d => d.Profit),                 // ← Profit 放 X
            y: bottom5.map(d => d["Sub-Category"]),        // ← 類別放 Y
            type: "bar",
            orientation: "h",                              // ⭐ 關鍵
            marker: {
                color: bottom5.map(d => d.Profit < 0 ? "#ef4444" : "#6366f1")
            }
        }], {
            title: "Bottom 5 Sub-Categories by Profit",
            xaxis: {
                title: "Profit"
            },
            yaxis: {
                automargin: true                             // ⭐ 防止字被切掉
            },
            shapes: [
                {
                    type: "line",
                    xref: "x",
                    x0: 0,
                    x1: 0,
                    yref: "paper",
                    y0: 0,
                    y1: 1,
                    line: {
                        color: "#9ca3af",
                        width: 2,
                        dash: "dash"
                    }
                }
            ]
        });


    });






fetch("dashboard_data/region_sales.json")
    .then(res => res.json())
    .then(data => {
        Plotly.newPlot("regionSales", [
            {
                x: data.map(d => d.Region),
                y: data.map(d => d.Sales),
                name: "Sales",
                type: "bar"
            },
            {
                x: data.map(d => d.Region),
                y: data.map(d => d.Profit),
                name: "Profit",
                type: "bar"
            }
        ], {
            title: "Sales & Profit by Region",
            barmode: "group"
        });
    });


fetch("dashboard_data/product_scatter.json")
    .then(res => res.json())
    .then(data => {
        Plotly.newPlot("productScatter", [{
            x: data.map(d => d.Sales),
            y: data.map(d => d.Profit),
            mode: "markers",
            type: "scatter",
            text: data.map(d => d["Sub-Category"]),
            marker: {
                size: 10,
                color: data.map(d => d.Profit),
                colorscale: "RdYlGn",
                showscale: true
            }
        }], {
            title: "High Sales vs Profit Risk (Sub-Category)",
            xaxis: { title: "Sales" },
            yaxis: { title: "Profit" }
        });
    });





