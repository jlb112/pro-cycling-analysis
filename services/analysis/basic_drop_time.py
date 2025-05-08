import streamlit as st

st.title("Finestre with the best in the world")

url = "https://lanternerouge.com/2024/08/24/greatest-teenager-performance-of-all-time-tour-de-lavenir-2024-stage-6/"

st.markdown("""This year, the Giro will take on the iconic Colle delle Finestre climb, but how long could you stick with the best pros on this climb before being dropped?
          Using the tool below, you can estimate how long you could remain with Pablo Torres during his [incredible climb](%s) of Colle delle Finestre in the Tour de l'Avenir 2024.""" % url)

rider_type_options = {
    "Climber": 0.06,
    "All-rounder": 0.07,
    "Punchy": 0.09
}

# 1. Inputs
ftp       = st.number_input("Your FTP (W)", min_value=1, value=250, max_value=600)
weight    = st.number_input("Weight (kg)", min_value=1.0, value=75.0, max_value=200.0)
draft_pct = st.slider("Drafting bonus (%)", 0, 40, 30) / 100
label = st.selectbox("Rider type", list(rider_type_options.keys()))



# 2. Constants
P0 = 6.34          # Torres’s sea-level W/kg
aero_share = 0.08  # ≈8% of power is aero on steep climb

# 3. Adjust target for drafting
P_adj_wkg = P0 * (1 - draft_pct * aero_share)
P_adj_abs = P_adj_wkg * weight

# 4. Compute drop time (s)
k = rider_type_options[label]  
ratio = ftp / P_adj_abs
t_drop = 3600 * (ratio ** (1/k))
user_wkg = ftp / weight

# 5. Output
if ratio >= 1:
    st.success(f"🔥 You’d hang on for the full 60m 45s! Your calculated W/kg is {user_wkg:.2f}")
else:
    mins = t_drop // 60
    secs = t_drop % 60
    st.write(f"⏱ You’d be dropped after about {int(mins)} m {int(secs)} s. Your calculated W/kg is {user_wkg:.2f}")

st.title("Why is my time so short?")


import plotly.graph_objects as go
import numpy as np

# Range of W/kg to plot
x = np.linspace(3.0, 6.2, 300)

fig = go.Figure()

# Plot a line for each rider type
for label, k_val in rider_type_options.items():
    y = 3600 * ((x / P_adj_wkg) ** (1 / k_val))
    y = np.minimum(y, 3645)  # cap at max climb duration (60:45)
    fig.add_trace(go.Scatter(
        x=x,
        y=y / 60,  # convert to minutes
        mode='lines',
        name=label,
        hovertemplate="W/kg: %{x:.2f}<br>Drop time: %{y:.1f} min"
    ))

# Plot user's point
user_k = rider_type_options.get(label, 0.07)  # fallback to 0.07 if missing
t_user = 3600 * ((user_wkg / P_adj_wkg) ** (1 / user_k))
t_user = min(t_user, 3645)

fig.add_trace(go.Scatter(
    x=[user_wkg],
    y=[t_user / 60],
    mode='markers+text',
    marker=dict(size=10, color='black'),
    text=["You"],
    textposition="top center",
    name="Your W/kg"
))

# Layout
fig.update_layout(
    title="How drop time varies with W/kg",
    xaxis_title="Sustainable W/kg",
    yaxis_title="Drop Time (minutes)",
    legend_title="Rider Type",
    template="plotly_white"
)

# Show in Streamlit
st.plotly_chart(fig, use_container_width=True)

