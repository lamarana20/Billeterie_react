import React, { } from 'react';
import Cart from '../Components/cart';
import BilletLists from '../Components/BilletLists'; 

const Events = () => {
  //const [showCart, setShowCart] = useState(false);
  //const [showBillet, setShowBillet] = useState(true);

  return (
    <>
      {/*<div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowBillet(!showBillet)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showBillet ? 'Fermer la liste' : '🎟️ Voir les billets'}
        </button>
      </div>

      {showBillet && <BilletLists />}*/}
      <BilletLists />
    </>
  );
};

export default Events;