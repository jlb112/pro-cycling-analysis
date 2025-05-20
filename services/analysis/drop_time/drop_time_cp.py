import streamlit as st
import plotly.graph_objects as go
import numpy as np
import time

st.title("Finestre with the best in the world")

url = "https://lanternerouge.com/2024/08/24/greatest-teenager-performance-of-all-time-tour-de-lavenir-2024-stage-6/"

st.markdown("""This year, the Giro will take on the iconic Colle delle Finestre climb, but how long could you stick with the best pros on this climb before being dropped?
          Using the tool below, you can estimate how long you could remain with Pablo Torres during his [incredible climb](%s) of Colle delle Finestre in the Tour de l'Avenir 2024.""" % url)


# 1. Constants
P0 = 6.34          # Torres’s sea-level W/kg
aero_share = 0.08  # ≈8% of power is aero on steep climb


#Sprinters should have a higher W' than climbers, but lower CP fraction, so they can output high intensity in short term, but can't sustain it for long.
rider_type_options = {
    "Endurance climber": (0.8, 8000),  # (CP fraction, W prime)
    "Puncheur": (0.4, 12000),
    "Sprinter": (0.2, 18000)
}

climb_distance = 17880 #metres (Finestre climb)
climb_duration = 3645 #seconds (60m 45s)

# Helper to format seconds as mm:ss
def format_time(seconds: float) -> str:
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m}m {s:02d}s"

# 2. Inputs
ftp       = st.number_input("Your FTP (W)", min_value=1, value=250, max_value=600)
weight    = st.number_input("Weight (kg)", min_value=30.0, value=75.0, max_value=200.0)
draft_pct = st.slider("Drafting bonus (%)", 0, 40, 30) / 100
#label = st.selectbox("Rider type", list(rider_type_options.keys()))

cp_frac, W_prime = 0.9, 12000
CP = cp_frac * ftp


# 3. Compute absolute target power to stay with Torres
P_torres = P0 * weight
# Apply drafting benefit (simplified linear reduction)
P_req = P_torres * (1 - draft_pct)

# 4. Compute drop time
if P_req <= CP:
    t_drop = climb_duration
else:
    t_drop = W_prime / (P_req - CP)


# 5. Speeds: leader and fan
v_leader = climb_distance / climb_duration
# Fan speed at FTP (assuming all power against gravity)
v_fan = climb_distance / (climb_distance / ftp)  # placeholder: will refine with real slope data
# Instead, approximate fan speed by D / predicted climb time if they never drop
# but here we use FTP-based speed on same climb gradient
# We can approximate v_fan = (ftp / P_torres) * v_leader
v_fan = (ftp / P_torres) * v_leader

# 6. Compute remaining distance and finish time
d_caught = v_leader * min(t_drop, climb_duration)
d_remaining = max(0, climb_distance - d_caught)
t_remain = d_remaining / v_fan
total_finish = (t_drop + t_remain) if t_drop < climb_duration else climb_duration

# 7. Output
if t_drop >= climb_duration:
    st.success(f"🔥 You’d hang on for the full 60m 45s!")
    
else:
    mins = t_drop // 60
    secs = t_drop % 60
    st.write(f"⏱ You’d be dropped after about {format_time(t_drop)}. Your calculated Critical Power is {CP}W")
    st.write(f"📈 If dropped, your projected finish time is ~{format_time(total_finish)}.")


st.title("How far you got before being dropped")



st.title("Why is my time so short?")

# 6. Plot drop time vs CP for each rider type
ftp_values = np.linspace(0.1 * ftp, (P_req/cp_frac), 100)
fig = go.Figure()

t_drops = []
for ftp_val in ftp_values:
    #if P_req <= ftp_val * cp_frac:
    #    t = climb_duration
    #else:
    t = W_prime / (P_req - (cp_frac * ftp_val))
    t_drops.append(t / 60)  # convert to minutes
fig.add_trace(go.Scatter(
    x=ftp_values,
    y=t_drops,
    mode='lines',
    name="Drop time",
    hovertemplate="W: %{x}<br>Drop time: %{y:.1f} min"
))

# Recalculate "You" marker's drop time using the same logic

if P_req <= ftp * cp_frac:
    you_t_drop = climb_duration
else:
    you_t_drop = W_prime / (P_req - (cp_frac * ftp))

# Add the "You" marker
fig.add_trace(go.Scatter(
    x=[ftp],
    y=[you_t_drop / 60],  # Convert to minutes
    mode='markers+text',
    marker=dict(size=10, color='black'),
    text=["You"],
    textposition="top center",
    name="Your CP",
    hovertemplate="W: %{x}<br>Drop time: %{y:.1f} min"
))

# Layout
fig.update_layout(
    title="How drop time varies with Critical Power",
    xaxis_title="Critical Power (W)",
    yaxis_title="Theoretical 'Hang' Time (minutes)",
    legend_title="Rider Type",
    template="plotly_white"
)

# Show in Streamlit
st.plotly_chart(fig, use_container_width=True)

