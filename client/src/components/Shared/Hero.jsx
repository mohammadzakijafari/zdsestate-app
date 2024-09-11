import React, { useState } from 'react'
import HeroImage from '../../../assets/rs.jpg'

const Hero = () => {
    // Mock property data, that will be replaced with our database data
    const propertyData = [
        { id: 1, name: "Luxury Apartment", location: "New York", price: 500000 },
        { id: 2, name: "Cozy Cottage", location: "Los Angeles", price: 300000 },
        { id: 3, name: "Beach House", location: "Miami", price: 750000 },
        { id: 4, name: "Urban Loft", location: "Chicago", price: 450000 },
        { id: 5, name: "Modern Villa", location: "San Francisco", price: 900000 },
    ];

    // State for search query and filters
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000000]);

    // Filtering function
    const filterProperties = () => {
        return propertyData.filter(property => {
        // Filter by search query (property name)
        const matchesSearchQuery = property.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by location
        const matchesLocation = property.location.toLowerCase().includes(locationFilter.toLowerCase());

        // Filter by price range
        const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];

        return matchesSearchQuery && matchesLocation && matchesPriceRange;
        });
    };

    // Get the filtered properties
    const filteredProperties = filterProperties();
  return (
    <div>
        <div className='flex flex-row justify-center items-center m-10'>
            <div className=''>
                <h1 className='text-7xl pl-20'> With ZDS Estate Simply Feel Home  </h1>
                <h1 className='text-5xl pl-20 my-16'> The No. One Real Estate   </h1>
                <div className='bg-green-100 w-full h-28 ml-20 mt-16 rounded-xl flex justify-center items-center gap-10'>
                    <div className="mt-2">
                        <input id="email" 
                        name="property-name" 
                        type="text" 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        autoComplete="text"
                        placeholder='Property Name'
                        required className="block w-48 rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>

                    <div className="mt-2">
                        <input id="location" 
                        name="location" 
                        type="text" 
                        onChange={(e) => setLocationFilter(e.target.value)}
                        value={locationFilter}
                        autoComplete="text"
                        placeholder='location'
                        required className="block w-48 rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>

                    <div className="mt-2">
                        <input id="min-price" 
                        name="min-price" 
                        type="text" 
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        autoComplete="text"
                        placeholder='Min Price'
                        required className="block w-48 rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className="mt-2">
                        <input id="max-price" 
                        name="max-price" 
                        type="text" 
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        autoComplete="text"
                        placeholder='Max Price'
                        required className="block w-48 rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>

                    <div className=''>
                        <button 
                            type="submit" 
                            // onClick = { handleSearch }
                            className="flex w-20 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Search
                        </button>
                    </div>
                    
                </div>
            
            </div>
            <div className='flex justify-center items-center p-10'>
                <img src = {HeroImage} alt='Hero Image' className='w-4/6 rounded-xl'/>
            </div>
        </div>
      
        <ul>
            {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                    <li key={property.id}>
                        <strong>{property.name}</strong> - {property.location} - ${property.price.toLocaleString()}
                    </li>
                ))
                ) : (
                <p>No properties found.</p>
            )}
        </ul>
    </div>
  )
}

export default Hero