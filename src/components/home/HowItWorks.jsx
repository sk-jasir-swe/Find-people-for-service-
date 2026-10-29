import {
  ArrowUpRight,
  Search,
  MessageCircle,
  MapPin,
  Check,
} from 'lucide-react';
const steps = [
  {
    n: '01',
    I: Search,
    title: 'Find your person',
    desc: 'Search by skill, explore profiles, and find someone who gets what you’re trying to do.',
  },
  {
    n: '02',
    I: MessageCircle,
    title: 'Start a conversation',
    desc: 'Unlock a focused chat with a simple demo checkout. No awkward cold introductions.',
  },
  {
    n: '03',
    I: MapPin,
    title: 'Take it further',
    desc: 'When a conversation needs a room, book a curated space and meet face-to-face.',
  },
];
export default function HowItWorks() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">A BETTER WAY TO CONNECT</span>
            <h2>
              From “I need help”
              <br />
              to <span className="gradient-text">“let’s do this.”</span>
            </h2>
          </div>
          <p>
            Less noise. More signal. A simple path from finding the right person
            to getting something meaningful done.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map(({ n, I, title, desc }) => (
            <article className="step-card" key={n}>
              <div className="step-top">
                <span className="step-number">{n}</span>
                <span className="step-icon">
                  <I size={19} />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="step-bottom">
                <span>
                  <Check size={13} /> Simple by design
                </span>
                <ArrowUpRight size={16} />
              </div>
            </article>
          ))}
        </div>
        <div className="how-note">
          <span className="note-icon">
            <Check size={17} />
          </span>
          <p>
            <strong>Built around trust, not transactions.</strong> Every profile
            gives you the context to make a confident choice before you connect.
          </p>
          <span className="note-lines">/ / /</span>
        </div>
      </div>
    </section>
  );
}
