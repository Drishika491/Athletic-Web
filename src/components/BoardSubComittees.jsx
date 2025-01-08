import React, { useEffect, useState } from 'react'
import ImageCommittee from '../assets/img-comittee.jpg'
import { getCompanyMember } from '../service/api';
import { BASE_URL, BASE_URL_ } from '../service/config';
function BoardSubComittees() {
    const [companyMember, setCompanyMember] = useState([]);

    const fetchCompanyMember = async () => {
        const result = await getCompanyMember()
        setCompanyMember(result.data.data)
        // console.log('cek member',result.data.data)
    }

    useEffect(() => {
        fetchCompanyMember()
    }, [])

    // Kelompokkan data berdasarkan nilai yang sama dari member.companyMemberRole?.name
    const groupedMembers = companyMember.reduce((groups, member) => {
        const roleName = member.companyMemberRole?.name;
        if (roleName) {
            if (!groups[roleName]) {
                groups[roleName] = [];
            }
            groups[roleName].push(member);
        }
        return groups;
    }, {});

    // Mengurutkan anggota dalam setiap kelompok berdasarkan peringkat peran
    for (const roleName in groupedMembers) {
        groupedMembers[roleName].sort((a, b) => {
            const rankA = a.companyMemberRole?.rank || 0; // Jika peringkat tidak ada, berikan nilai default 0
            const rankB = b.companyMemberRole?.rank || 0;
            return rankA - rankB;
        });
    }
  return (
    <div>
        <div className='pb-2'>
            <div className="border-b-[3px] flex border-dotted border-primary">
                <h2 className='p-5 flex mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Board Members 
                    {/* <span className='text-gray-700 font-normal px-2'>(4 years, 2022-2026)</span> */}
                </h2>
            </div>
        </div>

        <div className='bg-[#d9d9cb]'>
            <div className='container my-2 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                <div className='py-4'>
                    <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4'>
                        {companyMember
                        .filter((member) => member.companyMemberType.name === "Board Member")
                        .sort((a, b) => a.rank - b.rank)
                        .map((member) => (
                            <div key={member.id}>
                                <div className='flex justify-center py-2'>
                                    <img
                                    className='rounded-3xl max-w-[120px] object-cover h-[120px]'
                                    src={member.photoUrl ? BASE_URL_+`${member.photoUrl}` : ImageCommittee}
                                    />
                                </div>
                                <div className='text-center text-primary font-bold'>{member.name}</div>
                                <div className='text-center'>{member.title1}</div>
                                <div className='text-center'>{member.title2}</div>
                                {/* <div className='text-center'>{member.rank}</div> */}
                                {/* <div className='text-center'>{member.companyMemberType.name}</div> */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className='py-4 pb-12'>
                    <p>This page was last updated at 9 Nov 22</p>
                    <p className='pt-2'>Please forward any matter to the Board Members using this <button className='p-1 px-3 bg-secondary mt-0 lg:mt-0 text-white w-fit lg:w-fit'>Contact Form</button></p>
                </div> */}
            </div>
        </div>

        <div className='pb-2'>
            <div className="border-b-[3px] flex border-dotted border-primary">
                <h2 className='p-5 flex mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Sub-Committees</h2>
            </div>
        </div>

        <div className='bg-[#d9d9cb]'>
            <div className='container my-2 mx-auto px-4 md:px-10 lg:px-0 max-w-[1240px]'>
                {/* <div className='py-4'>
                    <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4'>
                        {companyMember.filter((member) => member.companyMemberType.name === "Sub-Committies").map((member) => (
                            <div key={member.id}>
                                <div className='flex justify-center py-2'>
                                    <img className='rounded-3xl max-w-[120px] object-cover h-[120px]' src={member.photoUrl ? BASE_URL_+`${member.photoUrl}` : ImageCommittee} />
                                </div>
                                <div className='text-center text-primary font-bold'>{member.name}</div>
                                <div className='text-center'>{member.title1}</div>
                                <div className='text-center'>{member.title2}</div>
                                <div className='text-center'>{member.companyMemberType.name}</div>
                            </div>
                        ))}
                    </div>
                </div> */}
                <div className='py-4'>
                    {Object.keys(groupedMembers).map((roleName) => {
                    const members = groupedMembers[roleName]
                    .filter((member) => member.companyMemberType.name === "Sub-Committies")
                    .sort((a, b) => a.rank - b.rank);
                    if (members.length === 0) {
                        return null; // Jika tidak ada anggota perusahaan yang cocok, lewati rendering roleName
                    }
                    return (
                        <div key={roleName}>
                            <div className='font-bold text-[1.5rem] py-4'>{roleName}</div>
                            <table className="table-auto w-full">
                                <tbody>
                                {members.map((member) => (
                                    <tr key={member.id}>
                                    <td className='border-2 border-gray-500 w-[50%] px-2'>{member.name}</td>
                                    <td className='border-2 border-gray-500 w-[50%] px-2'>{member.title1} {member.title2}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    );
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BoardSubComittees