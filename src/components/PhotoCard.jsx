import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Card({ p, onLk }) {
  const { id, author: nm, download_url: src, width: w, height: h, lk } = p;
  return (
    <div className="photo">
      <img src={src} alt={`Photo by ${nm}`} width={200} height={Math.round((200 * h) / w)} loading="lazy" />
      <span className="author">Author: {nm}</span>
      <button type="button" className="like" onClick={() => onLk(id)} aria-label={`Like photo by ${nm}`}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <span className="count">{lk}</span>
    </div>
  );
}

export default memo(Card);
