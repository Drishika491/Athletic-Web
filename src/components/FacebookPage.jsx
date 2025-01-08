import React from 'react';

const FacebookPage = () => {
  return (
    <>
      <div className='hidden lg:block md:block'>
        <iframe
          title="Facebook Page"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsporeathletics&tabs=timeline&width=394&height=315&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=455626744768491"
          width="100%"
          height="600"
          style={{ border: 0 }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className='lg:hidden md:hidden'>
        <iframe
          title="Facebook Page"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsporeathletics&tabs=timeline&width=320&height=499&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=455626744768491"
          width="100%"
          height="600"
          style={{ border: 0 }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </>
  );
};

export default FacebookPage;
