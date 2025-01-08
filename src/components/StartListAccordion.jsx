import React, { useState } from 'react';
import moment from 'moment';
import { Icon } from '@iconify/react';

const StartListAccordion = ({ question, date, answers, isOpen, toggleAccordion }) => {
  return (
    <div className="mb-[1px]">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center bg-secondary p-2 focus:outline-none"
      >
        <div className="text-left px-2">
            <span className='block lg:text-xl'>{question}</span>
            <span className='block text-xs'>{moment(date).locale('id').format('dddd DD/MM/YYYY')}</span>
        </div>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180 mr-2' : ''}`}>
          {/* &#x25BE; */}
          <Icon icon='ep:arrow-up' className='lg:h-[1.5rem] w-auto mr-2' />
        </span>
      </button>
      {isOpen && (
        <div className="overflow-x-auto bg-white shadow">
          <table className="w-full whitespace-no-wrap bg-white overflow-auto table-striped">
            <thead>
              <tr className='text-left'>
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Athlete ID</th>
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Name</th>
                {/* <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Last Name</th> */}
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Gender</th>
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Number</th>
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Seed</th>
                <th className='px-2 py-3 text-gray-500 font-bold tracking-wider uppercase bg-gray-200 lg:text-xs md:text-xs text-[0.5rem]'>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, index) => (
                <tr className='focus-within:bg-gray-200 overflow-hidden' key={index}>
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.athleteId}</span></td>
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.firstName} {answer.lastName}</span></td>
                  {/* <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.lastName}</span></td> */}
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.gender}</span></td>
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.number}</span></td>
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.seed}</span></td>
                  <td className='border-t'>
                    <span className='text-gray-700 px-2 py-2 flex text-[0.6rem] lg:text-sm md:text-sm items-center'>{answer.teamName}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StartListAccordion;
