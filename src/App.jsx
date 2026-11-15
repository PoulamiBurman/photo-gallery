import usePics, { useScrl } from './usePhotos.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from './components/PhotoCard.jsx';

export default function App() {
  const { pics, ld, more, err, load, like } = usePics();
  const end = useScrl(load, more && !err, pics.length);

  return (
    <div className="gallery">
      <h1>Photo gallery</h1>

      {pics.map((p) => (
        <Card key={p.id} p={p} onLk={like} />
      ))}

      <div ref={end} className="status">
        {ld && (
          <p className="ldr">
            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
          </p>
        )}
        {err && (
          <p>
            Couldn&apos;t load photos ({err}).{' '}
            <button type="button" onClick={load}>Retry</button>
          </p>
        )}
        {!more && <p>No more photos.</p>}
      </div>
    </div>
  );
}
