import React from 'react'

const MapSection = () => {
  return (
      <section className="h-[400px] relative">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.9075818309752!2d85.2894905!3d27.6957313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194ccc828abd%3A0x7d12a9969a54bdf!2sVedanga%20International%20School!5e1!3m2!1sen!2snp!4v1744974129380!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </section>  )
}

export default MapSection