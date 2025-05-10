import pandas as pd
import plotly.graph_objects as go

# Load the CSV file
file_path = "services/analysis/data/gpx_climbs_parsed/colle-delle-finestre.csv"
data = pd.read_csv(file_path)

# Group the data into 1km (1000m) sections
data['km_section'] = (data['cum_distance'] // 1000).astype(int)  # Create a column for 1km sections

# Calculate the average elevation and gradient for each section
section_data = data.groupby('km_section').agg(
    avg_elevation=('elevation', 'mean'),
    start_distance=('cum_distance', 'min'),
    end_distance=('cum_distance', 'max'),
    elevation_gain=('elevation', lambda x: x.iloc[-1] - x.iloc[0])
).reset_index()

# Calculate the gradient for each section
section_data['gradient'] = (section_data['elevation_gain'] / 
                            (section_data['end_distance'] - section_data['start_distance'])) * 100

# Create the base figure
fig = go.Figure()

# Add filled areas for each section
for i, row in section_data.iterrows():
    gradient = row['gradient']
    alpha = max(0, min(gradient / 10, 1))  # Ensure alpha is between 0 and 1
    color_intensity = f"rgba(0, 0, 255, {alpha:.2f})"  # Darker blue for higher gradients
    fig.add_trace(go.Scatter(
        x=[row['start_distance'], row['end_distance'], row['end_distance'], row['start_distance']],
        y=[0, 0, row['avg_elevation'], row['avg_elevation']],
        fill='toself',
        fillcolor=color_intensity,
        line=dict(width=0),
        hoverinfo='skip',
        showlegend=False
    ))

# Add the elevation profile line
fig.add_trace(go.Scatter(
    x=section_data['end_distance'],
    y=section_data['avg_elevation'],
    mode='lines+markers',
    line=dict(color='black', width=2),
    name='Elevation Profile'
))

# Add gradient annotations
for i, row in section_data.iterrows():
    fig.add_annotation(
        x=row['end_distance'],
        y=row['avg_elevation'],
        text=f"{row['gradient']:.1f}%",
        showarrow=False,
        font=dict(size=10, color="blue")
    )

# Update layout
fig.update_layout(
    title='Smoothed Elevation Profile with Gradient Shading: Colle delle Finestre',
    xaxis_title='Cumulative Distance (m)',
    yaxis_title='Elevation (m)',
    template='plotly_white'
)

# Show the chart
fig.show()