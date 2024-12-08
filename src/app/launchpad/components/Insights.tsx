export default function Insights() {
    const insights = [
      { title: 'Funding Progress', value: '80%', description: 'Projects reaching funding goals' },
      { title: 'New Connections', value: '15', description: 'New matches this month' },
      { title: 'Trending Pitches', value: '5', description: 'Hot pitches in your industry' },
    ];
  
    return (
      <section className="insights">
        <h2>Insights</h2>
        <div className="insights-grid">
          {insights.map((insight, index) => (
            <div key={index} className="insight-card">
              <h3>{insight.title}</h3>
              <p className="insight-value">{insight.value}</p>
              <p className="insight-description">{insight.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  