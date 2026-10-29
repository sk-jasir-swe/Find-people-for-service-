export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="container dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">YOUR CONNEXT WORKSPACE</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
