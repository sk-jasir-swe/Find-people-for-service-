export default function Avatar({ person, size = 'md' }) {
  return (
    <div className={`avatar avatar-${person?.color || 'blue'} avatar-${size}`}>
      {person?.initials ||
        person?.avatar ||
        (person?.name || 'U')
          .split(/\s+/)
          .map((s) => s[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
    </div>
  );
}
