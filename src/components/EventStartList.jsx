import React, { useEffect, useState } from 'react';
import StartListAccordion from './StartListAccordion';
import { config } from '../service/api';
import axios from 'axios';

function EventStartList() {
  const [eventStartList, setEventStartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const fetchEventStartList = async () => {
    try {
      setLoading(true);
      const result = await axios.get(BASE_URL+'Api/Event/GetStartingListPublic?EventPvid=61', {
        headers: await config()
      });
      setEventStartList(result.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch event start list error:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEventStartList();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start List
        </button>
      </div>

      {/* Tambahkan modal */}
      {isModalOpen && (
        <div>
            <div className="fixed inset-0 bg-black opacity-50 z-[9999]"></div> {/* Overlay hitam */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="modal">
                <div className="bg-white rounded-lg p-8 shadow-lg lg:w-[1000px] h-[600px] overflow-y-auto relative"> {/* Tambahkan relative */}
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    Close {/* Tombol Close */}
                </button>
                <h1 className="text-2xl font-semibold mb-4">Event Name</h1>
                {eventStartList.map((faq, index) => (
                    <StartListAccordion
                    key={index}
                    question={faq.schName}
                    date={faq.eventDate}
                    answers={faq.athletes}
                    isOpen={openIndex === index}
                    toggleAccordion={() => toggleAccordion(index)}
                    />
                ))}
                </div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default EventStartList;
