import { School, Calendar, Phone, MapPin } from 'lucide-react'
import React from 'react'

const Info = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                <div className="flex items-center space-x-4 p-6 rounded-lg bg-white shadow-lg transition-all">
                    <MapPin className="h-8 w-8 md:h-10 md:w-10 text-[#D41D33]" />
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-1">Location</h3>
                        <p className="text-gray-900 font-semibold text-xl ">Rabi Bhawan</p>
                    </div>
                </div> 

                <div className="flex items-center space-x-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-lg transition-all">
                    <Calendar className="h-8 w-8 md:h-10 md:w-10 text-[#D41D33]" />
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-1">Established</h3>
                        <p className="text-gray-900 font-semibold text-xl ">2017 AD</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-lg transition-all">
                    <Phone className="h-8 w-8 md:h-10 md:w-10 text-[#D41D33]" />
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-1">Contact</h3>
                        <p className="text-gray-900 font-semibold text-xl ">01-5372578</p>
                    </div>
                </div>

               
                <div className="flex items-center space-x-4 p-6 rounded-lg bg-white shadow-lg hover:shadow-lg transition-all">
                    <School className="h-8 w-8 md:h-10 md:w-10 text-[#D41D33]" />
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-1">Type</h3>
                        <p className="text-gray-900 font-semibold text-xl ">Private Institution</p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Info