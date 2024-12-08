export default function Widgets() {
    const widgets = [
      { title: 'Investor Database', description: 'Explore potential investors and their portfolios.' },
      { title: 'Networking Events', description: 'Join upcoming events tailored to your interests.' },
      { title: 'Market Trends', description: 'Stay ahead with the latest industry insights.' },
    ];
  
    return (
      <section className="widgets">
        <h2>Quick Actions</h2>
        <div className="widget-grid">
          {widgets.map((widget, index) => (
            <div key={index} className="widget-card">
              <h3>{widget.title}</h3>
              <p>{widget.description}</p>
              <button className="widget-action">View More</button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  