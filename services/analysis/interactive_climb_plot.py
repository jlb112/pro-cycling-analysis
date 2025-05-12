import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 1. Load your parsed CSV
df = pd.read_csv('services/analysis/data/gpx_climbs_parsed/colle-delle-finestre.csv')

# Convert cum_distance (m) to km
df['distance_km'] = df['cum_distance'] / 1000.0

# 2. Compute 1-km gradient segments
df['km_bin'] = df['distance_km'].astype(int)
segments = (
    df
    .groupby('km_bin')
    .agg(
        start_km=('distance_km', 'min'),
        end_km=('distance_km', 'max'),
        start_elev=('elevation', 'first'),
        end_elev=('elevation', 'last')
    )
    .reset_index(drop=True)
)
segments['gradient'] = (
    (segments['end_elev'] - segments['start_elev'])
    / ((segments['end_km'] - segments['start_km']) * 1000)
) * 100  # % gradient

# 3. Gradient → color
gradient_colour_mappings = {
    1:  '#fcd86eff',
    2:  '#f9b242ff',
    4:  '#f68e34ff',
    6:  '#f9b242ff',
    8:  '#da231cff',
    10: '#b60e27ff',
    12: '#920920ff',
    15: '#4c0318ff',
    20: '#22010bff'
}
thresholds = sorted(gradient_colour_mappings.keys())
def gradient_color(g):
    for thr in thresholds:
        if g <= thr:
            return gradient_colour_mappings[thr]
    return gradient_colour_mappings[thresholds[-1]]
segments['color'] = segments['gradient'].apply(gradient_color)

# 4. Use Inter font (if installed)
try:
    inter_font = fm.FontProperties(fname=fm.findfont("Ubuntu Mono"))
except:
    inter_font = None  # fallback to default

# 5. Plot
fig, ax = plt.subplots(figsize=(12, 4))

for _, row in segments.iterrows():
    ax.fill_between(
        [row['start_km'], row['end_km']],
        [row['start_elev'], row['end_elev']],
        color=row['color']
    )
    mid_x = (row['start_km'] + row['end_km']) / 2
    top_elev = max(row['start_elev'], row['end_elev'])
    y_offset = (df['elevation'].max() - df['elevation'].min()) * 0.02
    ax.text(
        mid_x,
        top_elev - y_offset,
        f"{row['gradient']:.1f}%",
        ha='center', va='bottom',
        fontsize=9,
        fontproperties=inter_font,
        weight='bold',
        color='black'
    )

# 6. Vertical lines at km splits
max_km = int(df['distance_km'].max())
for km in range(1, max_km + 1):
    closest_point = df.iloc[(df['distance_km'] - km).abs().argmin()]
    ax.vlines(
        x=km,
        ymin=0,
        ymax=closest_point['elevation'],
        color='white',
        linewidth=0.8,
        linestyle='-'
    )

# 7. Styling: no grid, clean spines, custom ticks
ax.set_xlabel('Distance (km)', fontproperties=inter_font, fontsize=11)
ax.set_ylabel('Elevation (m)', fontproperties=inter_font, fontsize=11)
ax.set_title('Climb Profile',
             fontproperties=inter_font, fontsize=13, weight='bold')

ax.set_xticks([i for i in range(0, max_km + 1)])
ax.set_xticklabels([f"{i}.0" for i in range(0, max_km + 1)],
                   fontproperties=inter_font, fontsize=10)
ax.tick_params(axis='y', labelsize=9)

ax.grid(False)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.show()
