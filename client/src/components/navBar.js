import React, { useState } from 'react';
import { Link } from "react-router-dom";
import HeaderDropdown from './headerDropdown'
import UmlLogo from '../images/uml.png'
import ToggleButton from './toggleButton'

const Navbar = () => {
  const [enabled, setEnabled] = useState(false);
  return (

    <nav className='m-auto grid auto-rows-auto grid-flow-row grid-cols-2 px-2 sm:px-6 lg:px-8 bg-[#0067b1] w-full '>
      <div className='flex items-center'>
        <div className='grid grid-cols-4'>
          <div className='flex justify-end mr-3' >
            <img src={UmlLogo} className='h-16'></img>
          </div>
          <div className='grid grid-rows-1 col-span-3 '>
            <p className='font-serif font-bold text-white text-lg'>
              University of Massachusetts Lowell<br></br>
              Blackboard Learning Management System
            </p>
          </div>
        </div>


      </div>
      <div className='sticky justify-end'>
        <div className='flex h-16 items-center justify-end p-10 list-none
          md:space-x-6 md:space-y-0 '>
          <HeaderDropdown profEnabled={enabled}></HeaderDropdown>
          <ToggleButton _enabled={enabled} onEnabled={setEnabled}></ToggleButton>
        </div>
        
      </div>
    </nav>




  );
}
export default Navbar;

// import { useState } from 'react';

// export default function Accordion() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   return (
//     <>
//       <h2>Almaty, Kazakhstan</h2>
//       <Panel
//         title="About"
//         isActive={activeIndex === 0}
//         onShow={() => setActiveIndex(0)}
//       >
//         With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
//       </Panel>
//       <Panel
//         title="Etymology"
//         isActive={activeIndex === 1}
//         onShow={() => setActiveIndex(1)}
//       >
//         The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
//       </Panel>
//     </>
//   );
// }

// function Panel({
//   title,
//   children,
//   isActive,
//   onShow
// }) {
//   return (
//     <section className="panel">
//       <h3>{title}</h3>
//       {isActive ? (
//         <p>{children}</p>
//       ) : (
//         <button onClick={onShow}>
//           Show
//         </button>
//       )}
//     </section>
//   );
// }
