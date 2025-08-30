"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Country, State, City } from 'country-state-city';
import Footer from "../reusable/footer";

// Reusable Searchable Select Component
const SearchableSelect = ({ 
  value, 
  onValueChange, 
  placeholder, 
  options, 
  renderOption, 
  renderSelected,
  emptyMessage = "No options found",
  error = "",
  valueKey = null // Add valueKey prop to specify which property to use for matching
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = React.createRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    renderOption(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find selected option based on valueKey or fallback logic
  const findSelectedOption = () => {
    if (!value) return null;
    
    if (valueKey) {
      return options.find(opt => opt[valueKey] === value);
    }
    
    // Fallback logic for different object types
    return options.find(opt => 
      opt.phoneCode === value || 
      opt.isoCode === value || 
      opt.id === value ||
      opt.name === value
    );
  };

  const selectedOption = findSelectedOption();

  return (
    <div className="relative w-full" ref={selectRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full rounded-lg bg-gray-50 border px-3 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100 hover:border-blue-600 transition-colors ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-200'
        }`}
      >
        {selectedOption ? (
          <span className="truncate">
            {renderSelected ? renderSelected(selectedOption) : renderOption(selectedOption)}
          </span>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg 
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const optionValue = valueKey ? option[valueKey] : (option.phoneCode || option.isoCode || option.id || option.name);
                return (
                  <div
                    key={optionValue || index}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      value === optionValue ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      onValueChange(optionValue, option); // Pass both value and full option object
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {renderOption(option)}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">{emptyMessage}</div>
            )}
          </div>
        </div>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from '../reusable/navbar';

const ContactUsPage = () => {
  const [serviceType, setServiceType] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedCountry, setSelectedCountry] = useState('juba');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [selectedCountryObj, setSelectedCountryObj] = useState(null);
  const [destinationState, setDestinationState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityObj, setSelectedCityObj] = useState(null);
  const [nationality, setNationality] = useState('');
  
  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Get all countries for the dropdowns
  const countries = Country.getAllCountries();
  
  // Get states based on selected country
  const getStates = (countryCode) => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode);
  };

  // Get cities based on selected country and state
  const getCities = (countryCode, stateCode) => {
    if (!countryCode || !stateCode) return [];
    return City.getCitiesOfState(countryCode, stateCode);
  };

  // Handle country change
  const handleCountryChange = (countryCode) => {
    setDestinationCountry(countryCode);
    setDestinationState('');
    setSelectedCity('');
    setSelectedCityObj(null);
    setCities([]);
    
    // Update selected country object
    const country = countries.find(c => c.isoCode === countryCode);
    if (country) {
      setSelectedCountryObj(country);
    }
  };

  // Handle state change
  const handleStateChange = (stateCode) => {
    setDestinationState(stateCode);
    setSelectedCity('');
    setSelectedCityObj(null);
    
    if (destinationCountry && stateCode) {
      const cityList = getCities(destinationCountry, stateCode);
      setCities(cityList);
    } else {
      setCities([]);
    }
  };

  // Handle city selection
  const handleCitySelection = (cityName, cityObj) => {
    setSelectedCity(cityName);
    setSelectedCityObj(cityObj);
    setHotelDestinationCity(cityName);
    if (errors.hotelDestinationCity) {
      setErrors(prev => ({ ...prev, hotelDestinationCity: '' }));
    }
  };
  
  // Get states for the selected country
  const states = destinationCountry ? getStates(destinationCountry) : [];
  
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === '') {
      return `${fieldName} is required`;
    }
    return '';
  };

  const validateLength = (value, min, max, fieldName) => {
    if (value && (value.length < min || value.length > max)) {
      return `${fieldName} must be between ${min} and ${max} characters`;
    }
    return '';
  };

  const validateAge = (age) => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return 'Please enter a valid age between 1 and 120';
    }
    return '';
  };

  const validateDate = (date, fieldName, futureOnly = false) => {
    if (!date) return `${fieldName} is required`;
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (futureOnly && selectedDate < today) {
      return `${fieldName} must be a future date`;
    }
    return '';
  };

  const validateReturnDate = (departureDate, returnDate) => {
    if (!departureDate || !returnDate) return '';
    
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    
    if (returnD <= departure) {
      return 'Return date must be after departure date';
    }
    return '';
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Apply length limits and formatting
    let processedValue = value;
    switch (name) {
      case 'fullName':
        processedValue = value.slice(0, 100);
        break;
      case 'phone':
      case 'whatsappNumber':
        // Remove any non-digit characters
        processedValue = value.replace(/\D/g, '');
        break;
      case 'message':
        processedValue = value.slice(0, 1000);
        break;
      default:
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle visa details change with validation
  const handleVisaDetailsChange = (e) => {
    const { name, value } = e.target;
    
    // Apply length limits for visa details
    let processedValue = value;
    if (name === 'age') {
      processedValue = value.slice(0, 3);
    } else if (name === 'numberOfVisas') {
      processedValue = value.slice(0, 2);
    }

    setFormData(prev => ({
      ...prev,
      visaDetails: {
        ...prev.visaDetails,
        [name]: processedValue
      }
    }));

    // Clear error for this field
    const fieldKey = `visaDetails.${name}`;
    if (errors[fieldKey]) {
      setErrors(prev => ({
        ...prev,
        [fieldKey]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    const fullNameError = validateRequired(formData.fullName, 'Full Name') || 
                          validateLength(formData.fullName, 2, 100, 'Full Name');
    if (fullNameError) newErrors.fullName = fullNameError;

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneError = validateRequired(formData.phone, 'Phone Number');
    if (phoneError) newErrors.phone = phoneError;
    else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.whatsappNumber && !validatePhone(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number';
    }

    if (!nationality) {
      newErrors.nationality = 'Please select your nationality';
    }

    // Service Type Validation
    if (!serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    // Service-specific validation
    if (serviceType === 'visa') {
      const ageError = validateAge(formData.visaDetails.age);
      if (ageError) newErrors['visaDetails.age'] = ageError;

      const visasError = validateRequired(formData.visaDetails.numberOfVisas, 'Number of Visas');
      if (visasError) newErrors['visaDetails.numberOfVisas'] = visasError;
      else {
        const visasNum = parseInt(formData.visaDetails.numberOfVisas);
        if (isNaN(visasNum) || visasNum < 1 || visasNum > 50) {
          newErrors['visaDetails.numberOfVisas'] = 'Number of visas must be between 1 and 50';
        }
      }

      if (!visaType) {
        newErrors.visaType = 'Please select a visa type';
      }

      if (!visaCountry) {
        newErrors.visaCountry = 'Please select the country for visa application';
      }
    }

    if (serviceType === 'flights') {
      if (!departureCity.trim()) {
        newErrors.departureCity = 'Departure city is required';
      }
      if (!arrivalCity.trim()) {
        newErrors.arrivalCity = 'Arrival city is required';
      }
      
      const depDateError = validateDate(flightDepartureDate, 'Departure Date', true);
      if (depDateError) newErrors.flightDepartureDate = depDateError;

      if (tripType === 'round-trip') {
        const retDateError = validateDate(flightReturnDate, 'Return Date', true);
        if (retDateError) newErrors.flightReturnDate = retDateError;
        
        const returnValidation = validateReturnDate(flightDepartureDate, flightReturnDate);
        if (returnValidation) newErrors.flightReturnDate = returnValidation;
      }

      if (flightAdults < 1) {
        newErrors.flightAdults = 'At least 1 adult passenger is required';
      }
    }

    if (serviceType === 'hotels') {
      if (!hotelDestinationCity) {
        newErrors.hotelDestinationCity = 'Hotel destination is required';
      }
      
      const checkInError = validateDate(checkInDate, 'Check-in Date', true);
      if (checkInError) newErrors.checkInDate = checkInError;
      
      const checkOutError = validateDate(checkOutDate, 'Check-out Date', true);
      if (checkOutError) newErrors.checkOutDate = checkOutError;
      
      const returnValidation = validateReturnDate(checkInDate, checkOutDate);
      if (returnValidation) newErrors.checkOutDate = returnValidation;

      if (!numberOfGuests || parseInt(numberOfGuests) < 1 || parseInt(numberOfGuests) > 50) {
        newErrors.numberOfGuests = 'Number of guests must be between 1 and 50';
      }

      if (!numberOfRooms || parseInt(numberOfRooms) < 1 || parseInt(numberOfRooms) > 20) {
        newErrors.numberOfRooms = 'Number of rooms must be between 1 and 20';
      }
    }

    if (serviceType === 'tours') {
      if (!checkInDate) {
        newErrors.toursDate = 'Departure date is required';
      }
      
      if (!numberOfNights || parseInt(numberOfNights) < 1 || parseInt(numberOfNights) > 365) {
        newErrors.numberOfNights = 'Number of nights must be between 1 and 365';
      }

      if (toursAdults < 1) {
        newErrors.toursAdults = 'At least 1 adult traveler is required';
      }
    }

    // Message validation
    const messageError = validateLength(formData.message, 10, 1000, 'Message');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-300, input[class*="border-red"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      // Ensure phone number is not empty and has required digits
      if (!formData.phone || formData.phone.length < 7) {
        throw new Error('Please enter a valid phone number (at least 7 digits)');
      }

      // Format phone numbers with country code
      const formatPhoneNumber = (phone, countryCode) => {
        if (!phone) return '';
        // Remove any non-digit characters
        const digits = phone.replace(/\D/g, '');
        // If the number already starts with the country code, return as is
        if (countryCode && phone.startsWith(countryCode.replace('+', ''))) {
          return `+${digits}`;
        }
        // Otherwise, prepend the country code (without the +)
        const countryCodeDigits = countryCode ? countryCode.replace(/\D/g, '') : '';
        return `+${countryCodeDigits}${digits}`;
      };

      const formattedPhone = formatPhoneNumber(formData.phone, formData.phoneCode);
      const formattedWhatsapp = formData.whatsappNumber 
        ? formatPhoneNumber(formData.whatsappNumber, formData.whatsappCode || formData.phoneCode)
        : formattedPhone;

      // Get full country and state names
      const getCountryName = (countryCode) => {
        if (!countryCode) return 'Not specified';
        const country = countries.find(c => c.isoCode === countryCode);
        return country ? country.name : countryCode;
      };

      const getStateName = (countryCode, stateCode) => {
        if (!countryCode || !stateCode) return 'Not specified';
        const states = State.getStatesOfCountry(countryCode);
        const state = states.find(s => s.isoCode === stateCode);
        return state ? state.name : stateCode;
      };

      // Base booking data
      const bookingData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formattedPhone,
        whatsappNumber: formattedWhatsapp,
        serviceType: serviceType,
        nationality: getCountryName(formData.nationality) || 'Not specified',
        destinationCountry: getCountryName(destinationCountry),
        destinationState: getStateName(destinationCountry, destinationState),
        message: formData.message
      };

      // Add service-specific data
      switch(serviceType) {
        case 'visa':
          bookingData.visaDetails = {
            age: formData.visaDetails.age,
            gender: formData.visaDetails.gender,
            numberOfVisas: formData.visaDetails.numberOfVisas,
            visaType: visaType,
            visaCountry: visaCountry
          };
          break;
          
        case 'flights':
          bookingData.flightDetails = {
            tripType: tripType,
            flightClass: flightClass,
            departureCity: departureCity,
            arrivalCity: arrivalCity,
            departureDate: flightDepartureDate,
            returnDate: tripType === 'round-trip' ? flightReturnDate : undefined,
            preferredAirline: preferredAirline,
            adults: flightAdults,
            children: flightChildren,
            infants: flightInfants
          };
          break;
          
        case 'hotels':
          bookingData.hotelDetails = {
            destinationCity: hotelDestinationCity,
            numberOfGuests: parseInt(numberOfGuests) || 1,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberOfRooms: parseInt(numberOfRooms) || 1,
            roomType: roomType,
            budget: hotelBudget
          };
          break;
          
        case 'tours':
          bookingData.toursDetails = {
            departureDate: checkInDate,
            numberOfNights: parseInt(numberOfNights) || 1,
            hotelStars: hotelStars,
            budget: toursBudget,
            adults: toursAdults,
            children: toursChildren,
            infants: toursInfants
          };
          break;
      }

      const response = await fetch('https://wwtravels.net/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        whatsappNumber: '',
        phoneCode: '',
        whatsappCode: '',
        serviceType: 'visa',
        nationality: '',
        visaDetails: {
          age: '',
          gender: 'male',
          numberOfVisas: '1',
          visaType: '',
          visaCountry: ''
        },
        message: ''
      });
      
      // Reset all service-specific states
      setServiceType('');
      setVisaType('');
      setVisaCountry('');
      setDestinationCountry('');
      setDestinationState('');
      setNationality('');
      
      // Reset flight states
      setTripType('round-trip');
      setFlightClass('economy');
      setDepartureCity('');
      setArrivalCity('');
      setFlightDepartureDate('');
      setFlightReturnDate('');
      setPreferredAirline('');
      setFlightAdults(1);
      setFlightChildren(0);
      setFlightInfants(0);
      
      // Reset hotel states
      setHotelDestinationCity('');
      setCheckInDate('');
      setCheckOutDate('');
      setNumberOfGuests('');
      setNumberOfRooms('');
      setRoomType('');
      setHotelBudget('');
      setSelectedCity('');
      setSelectedCityObj(null);
      
      // Reset tours states
      setNumberOfNights('');
      setHotelStars('');
      setToursBudget('');
      setToursAdults(1);
      setToursChildren(0);
      setToursInfants(0);

      // Clear all errors
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update cities when service type or location changes
  useEffect(() => {
    if (serviceType === 'hotels' && destinationCountry && destinationState) {
      const cityList = getCities(destinationCountry, destinationState);
      setCities(cityList);
    }
  }, [serviceType, destinationCountry, destinationState]);
  
  // States will be fetched and used directly in the JSX where needed
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    phoneCode: '',
    whatsappCode: '',
    serviceType: 'visa',
    nationality: '',
    visaDetails: {
      age: '',
      gender: 'male',
      numberOfVisas: '1',
      visaType: '',
      visaCountry: ''
    },
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [visaType, setVisaType] = useState('');
  const [visaCountry, setVisaCountry] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Flight reservation states
  const [tripType, setTripType] = useState('round-trip');
  const [flightClass, setFlightClass] = useState('economy');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
  const [flightDepartureDate, setFlightDepartureDate] = useState('');
  const [flightReturnDate, setFlightReturnDate] = useState('');
  const [preferredAirline, setPreferredAirline] = useState('');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightInfants, setFlightInfants] = useState(0);

  // Get city suggestions
  const getCitySuggestions = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const allCities = [];
    countries.forEach(country => {
      const cities = City.getCitiesOfCountry(country.isoCode) || [];
      allCities.push(...cities.map(city => ({
        ...city,
        countryCode: country.isoCode,
        countryName: country.name
      })));
    });

    return allCities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (city.state && city.state.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5);
  };

  // Handle departure city change
  const handleDepartureCityChange = (value) => {
    setDepartureCity(value.slice(0, 100)); // Length limit
    if (value.length > 1) {
      setDepartureSuggestions(getCitySuggestions(value));
      setShowDepartureSuggestions(true);
    } else {
      setShowDepartureSuggestions(false);
    }

    // Clear error
    if (errors.departureCity) {
      setErrors(prev => ({ ...prev, departureCity: '' }));
    }
  };

  // Handle arrival city change
  const handleArrivalCityChange = (value) => {
    setArrivalCity(value.slice(0, 100)); // Length limit
    if (value.length > 1) {
      setArrivalSuggestions(getCitySuggestions(value));
      setShowArrivalSuggestions(true);
    } else {
      setShowArrivalSuggestions(false);
    }

    // Clear error
    if (errors.arrivalCity) {
      setErrors(prev => ({ ...prev, arrivalCity: '' }));
    }
  };

  // Handle city selection for flights
  const handleCitySelect = (city, type) => {
    const cityText = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.countryName}`;
    if (type === 'departure') {
      setDepartureCity(cityText);
      setShowDepartureSuggestions(false);
      if (errors.departureCity) {
        setErrors(prev => ({ ...prev, departureCity: '' }));
      }
    } else {
      setArrivalCity(cityText);
      setShowArrivalSuggestions(false);
      if (errors.arrivalCity) {
        setErrors(prev => ({ ...prev, arrivalCity: '' }));
      }
    }
  };

  // Hotel reservation states
  const [hotelDestinationCity, setHotelDestinationCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [roomType, setRoomType] = useState('');
  const [hotelBudget, setHotelBudget] = useState('');

  // Tours and packages states
  const [toursAdults, setToursAdults] = useState(1);
  const [toursChildren, setToursChildren] = useState(0);
  const [toursInfants, setToursInfants] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState('');
  const [hotelStars, setHotelStars] = useState('');
  const [toursBudget, setToursBudget] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Passenger counter component
  const PassengerCounter = ({ label, value, setValue, min = 0, max = 20, description, error = "" }) => (
    <div className={`bg-gray-50 rounded-lg p-3 border ${error ? 'border-red-300' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-gray-800 font-medium text-sm">{label}</Label>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setValue(Math.max(min, value - 1))}
            disabled={value <= min}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center font-semibold text-gray-800">{value}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setValue(Math.min(max, value + 1))}
            disabled={value >= max}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );

  // Office locations data
  const officeLocations = {
    juba: {
      name: 'Juba, Republic of South Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+211 911544294',
      email: 'reservation.juba@holidaydreamz.net',
      address: 'Opp. Zain Building, Airport Ministry Road, Juba, Republic of South Sudan'
    },
    nairobi: {
      name: 'Nairobi-Kenya',
      company: 'Fly Holiday Dreamz Travel Mgt. Ltd.',
      phone: '+254 742449110',
      email: 'reservation.nbo@holidaydreamz.net',
      address: 'No 6, Ground Floor, Park Suit\'s, Parkland Road, Nairobi, Kenya'
    },
    khartoum: {
      name: 'Khartoum- Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+249 927992295',
      email: 'reservation.krt@holidaydreamz.net',
      address: 'Shop No 2, Bldg No 2, Block 2cg, Sylaphos Building, Jamuhiriya Street, Khartoum East, Sudan'
    },
    ajmer: {
      name: 'Ajmer- India',
      company: 'Fly Holiday Dreamz Travel Management Pvt. Ltd',
      phone: '+91 7300078037',
      email: 'reservation.ajm@holidaydreamz.net',
      address: '1 ch-19 Janta Colony, Vaishali Nagar Ajmer, Rajasthan, India, 305004'
    },
    kampala: {
      name: 'Kampala, Uganda',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+256 707009367, +254 707009366',
      email: 'reservation.kla@holidaydreamz.net',
      address: 'UG 07,Plot 18, Nalukwago Complex, George Street, Kampala, Uganda'
    }
  };

  // Social media links
  const socialMediaLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      url: 'https://facebook.com/holidaydreamztravel',
      username: '@holidaydreamztravel'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      url: 'https://instagram.com/holidaydreamztravel',
      username: '@holidaydreamztravel'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      url: 'https://linkedin.com/company/holiday-dreamz-travel',
      username: 'Holiday Dreamz Travel'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      url: 'https://wa.me/211911544294',
      username: '+211 911544294'
    }
  ];

  // Popular cities for flights
  const popularCities = [
    'New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Dubai', 'Istanbul', 'Singapore',
    'Hong Kong', 'Bangkok', 'Mumbai', 'Delhi', 'Cairo', 'Nairobi', 'Johannesburg', 'Lagos',
    'Sydney', 'Melbourne', 'Toronto', 'Vancouver', 'Berlin', 'Rome', 'Madrid', 'Amsterdam',
    'Zurich', 'Vienna', 'Brussels', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Warsaw',
    'Prague', 'Budapest', 'Athens', 'Lisbon', 'Barcelona', 'Milan', 'Frankfurt', 'Munich'
  ];

  // Popular airlines
  const popularAirlines = [
    'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways',
    'Air France', 'KLM', 'Turkish Airlines', 'Etihad Airways', 'Swiss International',
    'Delta Air Lines', 'United Airlines', 'American Airlines', 'Virgin Atlantic',
    'Ethiopian Airlines', 'Kenya Airways', 'South African Airways', 'Egypt Air'
  ];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',          
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative min-h-screen flex flex-col w-full">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1 
                  className={`text-4xl md:text-7xl mb-4 uppercase tracking-wider leading-tight text-white transition-all duration-1000 font-bold ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  CONTACT US
                </h1>

                {/* Description */}
                <p 
                  className={`text-sm md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto text-white transition-all duration-1200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Have questions? Ready to book your trip? Our travel experts are here to help you every step of the way. Whether you need flight options, visa help, or a full vacation plan—we're just a message away.
                </p>
              </div>
            </div>

            <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card className="bg-white border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-black mb-4 font-bold uppercase text-center">
                    Get In Touch With Us
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Personal Information Section - Reordered */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block">
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {/* Full Name - First */}
                          <div>
                            <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                              Full Name * <span className="text-gray-400 font-normal">(2-100 characters)</span>
                            </Label>
                            <Input
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                              required
                              maxLength={100}
                            />
                            {errors.fullName && (
                              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                            )}
                          </div>

                          {/* Email - Second */}
                          <div>
                            <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                              Email Address *
                            </Label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address"
                              className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                              required
                            />
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                          </div>

                          {/* Phone Numbers - Third */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Phone Number * <span className="text-gray-400 font-normal">(7-20 digits)</span>
                              </Label>
                              <div className="flex gap-2">
                                <div className="w-32">
                                  <SearchableSelect
                                    value={formData.phoneCode || ''}
                                    onValueChange={(value) => {
                                      setFormData(prev => ({
                                        ...prev,
                                        phoneCode: value
                                      }));
                                    }}
                                    placeholder="+1"
                                    options={countries.map(country => ({
                                      ...country,
                                      phoneCode: `+${country.phonecode}`,
                                      displayText: `${country.name} (${country.phonecode ? `+${country.phonecode}` : 'N/A'})`,
                                      selectedText: `+${country.phonecode}`
                                    }))}
                                    renderOption={(country) => country.displayText}
                                    renderSelected={(country) => country?.selectedText || ''}
                                    emptyMessage="No country found"
                                    valueKey="phoneCode"
                                  />
                                </div>
                                <Input
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="Phone Number"
                                  className={`flex-1 rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                  }`}
                                  required
                                  maxLength={20}
                                />
                              </div>
                              {errors.phone && (
                                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                WhatsApp Number <span className="text-gray-400 font-normal">(Optional)</span>
                              </Label>
                              <div className="flex gap-2">
                                <div className="w-32">
                                  <SearchableSelect
                                    value={formData.whatsappCode || ''}
                                    onValueChange={(value) => {
                                      setFormData(prev => ({
                                        ...prev,
                                        whatsappCode: value
                                      }));
                                    }}
                                    placeholder="+1"
                                    options={countries.map(country => ({
                                      ...country,
                                      phoneCode: `+${country.phonecode}`,
                                      displayText: `${country.name} (${country.phonecode ? `+${country.phonecode}` : 'N/A'})`,
                                      selectedText: `+${country.phonecode}`
                                    }))}
                                    renderOption={(country) => country.displayText}
                                    renderSelected={(country) => country?.selectedText || ''}
                                    emptyMessage="No country found"
                                    valueKey="phoneCode"
                                  />
                                </div>
                                <Input
                                  name="whatsappNumber"
                                  type="tel"
                                  value={formData.whatsappNumber}
                                  onChange={handleInputChange}
                                  placeholder="WhatsApp number (if different)"
                                  className={`flex-1 rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                    errors.whatsappNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                  }`}
                                  maxLength={20}
                                />
                              </div>
                              {errors.whatsappNumber && (
                                <p className="mt-1 text-xs text-red-600">{errors.whatsappNumber}</p>
                              )}
                            </div>
                          </div>

                          {/* Nationality - Fourth */}
                          <div>
                            <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                              Nationality *
                            </Label>
                            <SearchableSelect
                              value={nationality}
                              onValueChange={(value) => {
                                setNationality(value);
                                setFormData(prev => ({
                                  ...prev,
                                  nationality: value
                                }));
                                if (errors.nationality) {
                                  setErrors(prev => ({ ...prev, nationality: '' }));
                                }
                              }}
                              placeholder="Select your nationality"
                              options={countries}
                              renderOption={(country) => `${country.flag} ${country.name} (${country.isoCode})`}
                              emptyMessage="No countries found"
                              error={errors.nationality}
                              valueKey="isoCode"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Service Information Section */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block">
                          Service Information
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                              Service Type *
                            </Label>
                            <Select 
                              value={serviceType} 
                              onValueChange={(value) => {
                                setServiceType(value);
                                setFormData(prev => ({
                                  ...prev,
                                  serviceType: value
                                }));
                                if (errors.serviceType) {
                                  setErrors(prev => ({ ...prev, serviceType: '' }));
                                }
                              }}
                            >
                              <SelectTrigger 
                                className={`rounded-lg bg-gray-50 border w-full transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.serviceType ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              >
                                <SelectValue placeholder="What service do you need?" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                <SelectItem value="tours" className="hover:bg-blue-50 text-black">
                                  🌍 Tours and Packages
                                </SelectItem>
                                <SelectItem value="visa" className="hover:bg-blue-50 text-black">
                                  📋 Visa Assistance
                                </SelectItem>
                                <SelectItem value="flights" className="hover:bg-blue-50 text-black">
                                  ✈️ Flight Bookings
                                </SelectItem>
                                <SelectItem value="hotels" className="hover:bg-blue-50 text-black">
                                  🏨 Hotel Reservations
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.serviceType && (
                              <p className="mt-1 text-xs text-red-600">{errors.serviceType}</p>
                            )}
                          </div>

                          <div>
                            <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                              Destination Country
                            </Label>
                            <SearchableSelect
                              value={destinationCountry}
                              onValueChange={handleCountryChange}
                              placeholder="Select a country"
                              options={countries}
                              renderOption={(country) => `${country.flag} ${country.name} (${country.isoCode})`}
                              emptyMessage="No countries found"
                              valueKey="isoCode"
                            />
                          </div>

                          {destinationCountry && (
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Destination State/Province
                              </Label>
                              <SearchableSelect
                                value={destinationState}
                                onValueChange={(value) => {
                                  handleStateChange(value);
                                  if (errors.destinationState) {
                                    setErrors(prev => ({ ...prev, destinationState: '' }));
                                  }
                                }}
                                disabled={!destinationCountry}
                                placeholder={
                                  selectedCountryObj 
                                    ? `Select state in ${selectedCountryObj.name}` 
                                    : 'Select a country first'
                                }
                                options={states}
                                renderOption={(state) => state.name}
                                renderSelected={(state) => state ? state.name : ''}
                                emptyMessage="No states found"
                                error={errors.destinationState}
                                valueKey="isoCode"
                              />
                              {errors.destinationState && (
                                <p className="mt-1 text-xs text-red-600">{errors.destinationState}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Flight Reservation Section */}
                    {serviceType === 'flights' && (
                      <Card className="shadow-none border">
                        <CardContent className="p-3">
                          <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block">
                            Flight Reservation Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Trip Type *
                              </Label>
                              <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-row mt-1">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="one-way" id="one-way" />
                                  <Label htmlFor="one-way" className="text-gray-600">One Way</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="round-trip" id="round-trip" />
                                  <Label htmlFor="round-trip" className="text-gray-600">Round Trip</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Flight Class *
                              </Label>
                              <Select value={flightClass} onValueChange={setFlightClass}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="economy" className="hover:bg-blue-50 text-black">
                                    Economy Class
                                  </SelectItem>
                                  <SelectItem value="premium-economy" className="hover:bg-blue-50 text-black">
                                    Premium Economy
                                  </SelectItem>
                                  <SelectItem value="business" className="hover:bg-blue-50 text-black">
                                    Business Class
                                  </SelectItem>
                                  <SelectItem value="first" className="hover:bg-blue-50 text-black">
                                    First Class
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Departure City * <span className="text-gray-400 font-normal">(Max 100 chars)</span>
                              </Label>
                              <Input
                                type="text"
                                name="departureCity"
                                value={departureCity}
                                onChange={(e) => {
                                  setDepartureCity(e.target.value);
                                  if (errors.departureCity) {
                                    setErrors(prev => ({ ...prev, departureCity: '' }));
                                  }
                                }}
                                placeholder="Enter departure city (e.g., New York, London)"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.departureCity ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                                maxLength={100}
                              />
                              {errors.departureCity && (
                                <p className="mt-1 text-xs text-red-600">{errors.departureCity}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Arrival City * <span className="text-gray-400 font-normal">(Max 100 chars)</span>
                              </Label>
                              <Input
                                type="text"
                                name="arrivalCity"
                                value={arrivalCity}
                                onChange={(e) => {
                                  setArrivalCity(e.target.value);
                                  if (errors.arrivalCity) {
                                    setErrors(prev => ({ ...prev, arrivalCity: '' }));
                                  }
                                }}
                                placeholder="Enter arrival city (e.g., Dubai, Singapore)"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.arrivalCity ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                                maxLength={100}
                              />
                              {errors.arrivalCity && (
                                <p className="mt-1 text-xs text-red-600">{errors.arrivalCity}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Departure Date *
                              </Label>
                              <Input
                                type="date"
                                value={flightDepartureDate}
                                onChange={(e) => {
                                  setFlightDepartureDate(e.target.value);
                                  if (errors.flightDepartureDate) {
                                    setErrors(prev => ({ ...prev, flightDepartureDate: '' }));
                                  }
                                }}
                                min={getMinDate()}
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.flightDepartureDate ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.flightDepartureDate && (
                                <p className="mt-1 text-xs text-red-600">{errors.flightDepartureDate}</p>
                              )}
                            </div>

                            {tripType === 'round-trip' && (
                              <div>
                                <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                  Return Date *
                                </Label>
                                <Input
                                  type="date"
                                  value={flightReturnDate}
                                  onChange={(e) => {
                                    setFlightReturnDate(e.target.value);
                                    if (errors.flightReturnDate) {
                                      setErrors(prev => ({ ...prev, flightReturnDate: '' }));
                                    }
                                  }}
                                  min={flightDepartureDate || getMinDate()}
                                  className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                    errors.flightReturnDate ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                  }`}
                                />
                                {errors.flightReturnDate && (
                                  <p className="mt-1 text-xs text-red-600">{errors.flightReturnDate}</p>
                                )}
                              </div>
                            )}

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Preferred Airline (Optional)
                              </Label>
                              <Select value={preferredAirline} onValueChange={setPreferredAirline}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Any airline" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {popularAirlines.map((airline) => (
                                    <SelectItem 
                                      key={airline} 
                                      value={airline}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {airline}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Flight Passengers Section */}
                          <div className="mt-4">
                            <Label className="text-gray-600 mb-2 text-xs font-semibold uppercase block">
                              Number of Passengers *
                            </Label>
                            <div className="space-y-3">
                              <PassengerCounter
                                label="Adults"
                                value={flightAdults}
                                setValue={(value) => {
                                  setFlightAdults(value);
                                  if (errors.flightAdults) {
                                    setErrors(prev => ({ ...prev, flightAdults: '' }));
                                  }
                                }}
                                min={1}
                                description="12+ years"
                                error={errors.flightAdults}
                              />
                              <PassengerCounter
                                label="Children"
                                value={flightChildren}
                                setValue={setFlightChildren}
                                min={0}
                                description="2-11 years"
                              />
                              <PassengerCounter
                                label="Infants"
                                value={flightInfants}
                                setValue={setFlightInfants}
                                min={0}
                                description="Under 2 years"
                              />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Total Passengers: {flightAdults + flightChildren + flightInfants}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Hotel Reservation Section */}
                    {serviceType === 'hotels' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block">
                            Hotel Reservation Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                City *
                              </Label>
                              <SearchableSelect
                                value={selectedCity}
                                onValueChange={handleCitySelection}
                                placeholder={cities.length > 0 ? "Select a city" : "Select country and state first"}
                                options={cities}
                                renderOption={(city) => {
                                  const stateName = getStates(destinationCountry).find(s => s.isoCode === city.stateCode)?.name || '';
                                  return `${city.name}${stateName ? `, ${stateName}` : ''}`;
                                }}
                                renderSelected={(city) => {
                                  if (!city) return '';
                                  const stateName = getStates(destinationCountry).find(s => s.isoCode === city.stateCode)?.name || '';
                                  return `${city.name}${stateName ? `, ${stateName}` : ''}`;
                                }}
                                emptyMessage={cities.length === 0 ? "Please select country and state first" : "No cities found"}
                                error={errors.hotelDestinationCity}
                                valueKey="name"
                              />
                              {errors.hotelDestinationCity && (
                                <p className="mt-1 text-xs text-red-600">{errors.hotelDestinationCity}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Number of Guests * <span className="text-gray-400 font-normal">(1-50)</span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many guests?"
                                value={numberOfGuests}
                                onChange={(e) => {
                                  setNumberOfGuests(e.target.value);
                                  if (errors.numberOfGuests) {
                                    setErrors(prev => ({ ...prev, numberOfGuests: '' }));
                                  }
                                }}
                                min="1"
                                max="50"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.numberOfGuests ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.numberOfGuests && (
                                <p className="mt-1 text-xs text-red-600">{errors.numberOfGuests}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Check-in Date *
                              </Label>
                              <Input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => {
                                  setCheckInDate(e.target.value);
                                  if (errors.checkInDate) {
                                    setErrors(prev => ({ ...prev, checkInDate: '' }));
                                  }
                                }}
                                min={getMinDate()}
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.checkInDate ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.checkInDate && (
                                <p className="mt-1 text-xs text-red-600">{errors.checkInDate}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Check-out Date *
                              </Label>
                              <Input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => {
                                  setCheckOutDate(e.target.value);
                                  if (errors.checkOutDate) {
                                    setErrors(prev => ({ ...prev, checkOutDate: '' }));
                                  }
                                }}
                                min={checkInDate || getMinDate()}
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.checkOutDate ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.checkOutDate && (
                                <p className="mt-1 text-xs text-red-600">{errors.checkOutDate}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Number of Rooms * <span className="text-gray-400 font-normal">(1-20)</span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many rooms?"
                                value={numberOfRooms}
                                onChange={(e) => {
                                  setNumberOfRooms(e.target.value);
                                  if (errors.numberOfRooms) {
                                    setErrors(prev => ({ ...prev, numberOfRooms: '' }));
                                  }
                                }}
                                min="1"
                                max="20"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.numberOfRooms ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.numberOfRooms && (
                                <p className="mt-1 text-xs text-red-600">{errors.numberOfRooms}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Room Type (Optional)
                              </Label>
                              <Select value={roomType} onValueChange={setRoomType}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Any room type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="standard" className="hover:bg-blue-50 text-black">
                                    Standard Room
                                  </SelectItem>
                                  <SelectItem value="deluxe" className="hover:bg-blue-50 text-black">
                                    Deluxe Room
                                  </SelectItem>
                                  <SelectItem value="suite" className="hover:bg-blue-50 text-black">
                                    Suite
                                  </SelectItem>
                                  <SelectItem value="family" className="hover:bg-blue-50 text-black">
                                    Family Room
                                  </SelectItem>
                                  <SelectItem value="executive" className="hover:bg-blue-50 text-black">
                                    Executive Room
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Budget Range (Optional)
                              </Label>
                              <Select value={hotelBudget} onValueChange={setHotelBudget}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="budget" className="hover:bg-blue-50 text-black">
                                    Budget ($50-$100 per night)
                                  </SelectItem>
                                  <SelectItem value="mid-range" className="hover:bg-blue-50 text-black">
                                    Mid-range ($100-$250 per night)
                                  </SelectItem>
                                  <SelectItem value="luxury" className="hover:bg-blue-50 text-black">
                                    Luxury ($250-$500 per night)
                                  </SelectItem>
                                  <SelectItem value="ultra-luxury" className="hover:bg-blue-50 text-black">
                                    Ultra-luxury ($500+ per night)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Visa Details Section */}
                    {serviceType === 'visa' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block">
                            Visa Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Your Age * <span className="text-gray-400 font-normal">(1-120)</span>
                              </Label>
                              <Input
                                type="number"
                                name="age"
                                value={formData.visaDetails.age}
                                onChange={handleVisaDetailsChange}
                                placeholder="Enter your age"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors['visaDetails.age'] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                                min="1"
                                max="120"
                                required
                              />
                              {errors['visaDetails.age'] && (
                                <p className="mt-1 text-xs text-red-600">{errors['visaDetails.age']}</p>
                              )}
                            </div>
                            
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Gender *
                              </Label>
                              <RadioGroup 
                                value={formData.visaDetails.gender} 
                                onValueChange={(value) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      gender: value
                                    }
                                  }));
                                }} 
                                className="flex flex-row mt-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <Label htmlFor="male" className="text-gray-600">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <Label htmlFor="female" className="text-gray-600">Female</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Number of Visas * <span className="text-gray-400 font-normal">(1-50)</span>
                              </Label>
                              <Input
                                type="number"
                                name="numberOfVisas"
                                value={formData.visaDetails.numberOfVisas}
                                onChange={handleVisaDetailsChange}
                                placeholder="How many visas?"
                                min="1"
                                max="50"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors['visaDetails.numberOfVisas'] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                                required
                              />
                              {errors['visaDetails.numberOfVisas'] && (
                                <p className="mt-1 text-xs text-red-600">{errors['visaDetails.numberOfVisas']}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Visa Type *
                              </Label>
                              <Select 
                                value={visaType} 
                                onValueChange={(value) => {
                                  setVisaType(value);
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      visaType: value
                                    }
                                  }));
                                  if (errors.visaType) {
                                    setErrors(prev => ({ ...prev, visaType: '' }));
                                  }
                                }}
                                required
                              >
                                <SelectTrigger className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.visaType ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}>
                                  <SelectValue placeholder="Select visa type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="tourist" className="hover:bg-blue-50 text-black">
                                    Tourist Visa
                                  </SelectItem>
                                  <SelectItem value="business" className="hover:bg-blue-50 text-black">
                                    Business Visa
                                  </SelectItem>
                                  <SelectItem value="student" className="hover:bg-blue-50 text-black">
                                    Student Visa
                                  </SelectItem>
                                  <SelectItem value="work" className="hover:bg-blue-50 text-black">
                                    Work Visa
                                  </SelectItem>
                                  <SelectItem value="other" className="hover:bg-blue-50 text-black">
                                    Other
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.visaType && (
                                <p className="mt-1 text-xs text-red-600">{errors.visaType}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Which Country's Visa Do You Want? *
                              </Label>
                              <SearchableSelect
                                value={visaCountry}
                                onValueChange={(value) => {
                                  setVisaCountry(value);
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      visaCountry: value
                                    }
                                  }));
                                  if (errors.visaCountry) {
                                    setErrors(prev => ({ ...prev, visaCountry: '' }));
                                  }
                                }}
                                placeholder="Search for a country..."
                                options={countries}
                                renderOption={(country) => `${country.flag} ${country.name} (${country.isoCode})`}
                                emptyMessage="No countries found"
                                error={errors.visaCountry}
                                valueKey="isoCode"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Tours Section */}
                    {serviceType === 'tours' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block">
                            Tours & Packages Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Departure Date *
                              </Label>
                              <Input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => {
                                  setCheckInDate(e.target.value);
                                  if (errors.toursDate) {
                                    setErrors(prev => ({ ...prev, toursDate: '' }));
                                  }
                                }}
                                min={getMinDate()}
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.toursDate ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.toursDate && (
                                <p className="mt-1 text-xs text-red-600">{errors.toursDate}</p>
                              )}
                            </div>
                            
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Number of Nights * <span className="text-gray-400 font-normal">(1-365)</span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many nights?"
                                value={numberOfNights}
                                onChange={(e) => {
                                  setNumberOfNights(e.target.value);
                                  if (errors.numberOfNights) {
                                    setErrors(prev => ({ ...prev, numberOfNights: '' }));
                                  }
                                }}
                                min="1"
                                max="365"
                                className={`rounded-lg bg-gray-50 border transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg ${
                                  errors.numberOfNights ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {errors.numberOfNights && (
                                <p className="mt-1 text-xs text-red-600">{errors.numberOfNights}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Hotel Star Rating (Optional)
                              </Label>
                              <Select value={hotelStars} onValueChange={setHotelStars}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select preferred star rating" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="any" className="hover:bg-blue-50 text-black">
                                    Any Rating
                                  </SelectItem>
                                  <SelectItem value="3-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐ 3 Star
                                  </SelectItem>
                                  <SelectItem value="4-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐⭐ 4 Star
                                  </SelectItem>
                                  <SelectItem value="5-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐⭐⭐ 5 Star
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Budget Per Person (Optional)
                              </Label>
                              <Select value={toursBudget} onValueChange={setToursBudget}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="budget" className="hover:bg-blue-50 text-black">
                                    Budget ($500-$1,000)
                                  </SelectItem>
                                  <SelectItem value="mid-range" className="hover:bg-blue-50 text-black">
                                    Mid-range ($1,000-$2,500)
                                  </SelectItem>
                                  <SelectItem value="premium" className="hover:bg-blue-50 text-black">
                                    Premium ($2,500-$5,000)
                                  </SelectItem>
                                  <SelectItem value="luxury" className="hover:bg-blue-50 text-black">
                                    Luxury ($5,000+)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Tours Passengers Section */}
                          <div className="mt-4">
                            <Label className="text-gray-600 mb-2 text-xs font-semibold uppercase block">
                              Number of Travelers *
                            </Label>
                            <div className="space-y-3">
                              <PassengerCounter
                                label="Adults"
                                value={toursAdults}
                                setValue={(value) => {
                                  setToursAdults(value);
                                  if (errors.toursAdults) {
                                    setErrors(prev => ({ ...prev, toursAdults: '' }));
                                  }
                                }}
                                min={1}
                                description="12+ years"
                                error={errors.toursAdults}
                              />
                              <PassengerCounter
                                label="Children"
                                value={toursChildren}
                                setValue={setToursChildren}
                                min={0}
                                description="2-11 years"
                              />
                              <PassengerCounter
                                label="Infants"
                                value={toursInfants}
                                setValue={setToursInfants}
                                min={0}
                                description="Under 2 years"
                              />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Total Travelers: {toursAdults + toursChildren + toursInfants}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Message Section */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block">
                          Your Message
                        </h3>
                        
                        <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                          Tell us about your requirements * <span className="text-gray-400 font-normal">(10-1000 characters)</span>
                        </Label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Please provide details about your travel requirements, special requests, budget considerations, or any questions you have..."
                            style={{
                              minHeight: '120px',
                              maxHeight: '300px',
                              overflowY: 'auto',
                              resize: 'none',
                              lineHeight: '1.5rem',
                              padding: '0.5rem 0.75rem',
                              boxSizing: 'border-box',
                              width: '100%',
                              borderRadius: '0.5rem',
                              backgroundColor: errors.message ? '#FEF2F2' : '#F9FAFB',
                              border: errors.message ? '1px solid #FCA5A5' : '1px solid #E5E7EB',
                              transition: 'all 0.3s',
                              outline: 'none',
                              fontFamily: 'inherit',
                              fontSize: '0.875rem'
                            }}
                            onFocus={(e) => {
                              e.target.style.backgroundColor = '#FFFFFF';
                              e.target.style.borderColor = '#2563EB';
                              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.backgroundColor = errors.message ? '#FEF2F2' : '#F9FAFB';
                              e.target.style.borderColor = errors.message ? '#FCA5A5' : '#E5E7EB';
                              e.target.style.boxShadow = 'none';
                            }}
                            onMouseEnter={(e) => {
                              if (document.activeElement !== e.target) {
                                e.target.style.backgroundColor = errors.message ? '#FEE2E2' : '#F3F4F6';
                                e.target.style.borderColor = errors.message ? '#FCA5A5' : '#2563EB';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (document.activeElement !== e.target) {
                                e.target.style.backgroundColor = errors.message ? '#FEF2F2' : '#F9FAFB';
                                e.target.style.borderColor = errors.message ? '#FCA5A5' : '#E5E7EB';
                                e.target.style.boxShadow = 'none';
                              }
                            }}
                            maxLength={1000}
                          />
                        </div>
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                        )}
                        <div className="mt-1 text-xs text-gray-500 text-right">
                          {formData.message.length}/1000 characters
                        </div>
                      </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <div className="h-4"></div>
                      {isSubmitted ? (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                          <p className="font-medium">Thank you for your submission!</p>
                          <p className="text-sm">We'll get back to you soon.</p>
                        </div>
                      ) : (
                        <Button
                          type="submit"
                          className={`py-2 px-6 rounded-full bg-black text-white text-lg font-semibold uppercase shadow-lg transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-xl ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : 'Send My Request'}
                        </Button>
                      )}
                      {submitError && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                          {submitError}
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-3">
              {/* GET IN TOUCH Box */}
              <Card className="bg-white border">
                <CardContent className="p-4">
                  <h2 className="mb-3 font-bold uppercase text-lg text-center">
                    Our Offices
                  </h2>

                  {/* Country Selection */}
                  <div className="mb-4">
                    <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                      Select Office Location
                    </Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg cursor-pointer">
                        <SelectValue className="cursor-pointer" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                        <SelectItem value="juba" className="hover:bg-blue-50 text-black">
                          🇸🇸 Juba, Republic of South Sudan
                        </SelectItem>
                        <SelectItem value="nairobi" className="hover:bg-blue-50 text-black">
                          🇰🇪 Nairobi, Kenya
                        </SelectItem>
                        <SelectItem value="khartoum" className="hover:bg-blue-50 text-black">
                          🇸🇩 Khartoum, Sudan
                        </SelectItem>
                        <SelectItem value="ajmer" className="hover:bg-blue-50 text-black">
                          🇮🇳 Ajmer, India
                        </SelectItem>
                        <SelectItem value="kampala" className="hover:bg-blue-50 text-black">
                          🇺🇬 Kampala, Uganda
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-3" />

                  {/* Dynamic Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Phone:
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Email:
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Address:
                        </p>
                        <p className="mb-0.5 text-gray-600 italic">
                          {officeLocations[selectedCountry].company}
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Office Hours:
                        </p>
                        <p className="mb-1 text-gray-600">
                          Monday - Saturday: 9:00 AM to 7:00 PM
                        </p>
                        <p className="text-gray-600">
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                
              <div className="h-4"></div>

              {/* ENHANCED SOCIAL MEDIA Box */}
              <Card className="bg-white border">
                <CardContent className="p-4">
                  <h2 className="mb-4 font-bold uppercase text-lg text-center">
                    Connect With Us
                  </h2>

                  {/* Social Media Icons Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {socialMediaLinks.slice(0, 4).map((social, index) => (
                      <div key={index} className="text-center">
                        {social.name === 'Facebook' ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-16 h-16 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-transparent"
                            style={{ 
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              boxShadow: 'none'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <img 
                              src="/assets/gallery/winter/facebook.png" 
                              alt="Facebook" 
                              className="w-10 h-10"
                            />
                          </Button>
                        ) : social.name === 'Instagram' ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-16 h-16 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-transparent"
                            style={{ 
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              boxShadow: 'none'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <img 
                              src="/assets/gallery/winter/instagram.png" 
                              alt="Instagram" 
                              className="w-10 h-10"
                            />
                          </Button>
                        ) : social.name === 'LinkedIn' ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-16 h-16 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-transparent"
                            style={{ 
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              boxShadow: 'none'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <img 
                              src="/assets/gallery/winter/linkedin.png" 
                              alt="LinkedIn" 
                              className="w-10 h-10"
                            />
                          </Button>
                        ) : social.name === 'WhatsApp' ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-16 h-16 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-transparent"
                            style={{ 
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              boxShadow: 'none'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <img 
                              src="/assets/gallery/winter/social.png" 
                              alt="WhatsApp" 
                              className="w-10 h-10"
                            />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                            style={{ 
                              backgroundColor: social.color,
                              borderColor: social.color,
                              color: 'white'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <social.icon size={24} />
                          </Button>
                        )}
                        <p className="mt-1 text-xs font-medium text-gray-600">
                          {social.name}
                        </p>
                      </div>
                    ))}
                  </div>
                
                  <div className="h-4"></div>

                  {/* Social Media Details */}
                  <div className="space-y-2.5">
                    <p className="text-center text-gray-600 text-sm italic py-2">
                      Follow us on social media for travel tips, deals, and updates!
                    </p>
                  </div>

                  {/* WhatsApp Direct Contact */}
                  <Separator className="my-3" />
                  
                  <div 
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-green-50 border border-green-200 transition-all duration-300 hover:bg-green-100 hover:-translate-y-0.5"
                    onClick={() => window.open(socialMediaLinks[3].url, '_blank')}
                  >
                    <img 
                      src="/assets/gallery/winter/social.png" 
                      alt="WhatsApp" 
                      className="w-6 h-6"
                    />
                    <div className="w-full flex justify-center h-auto items-start flex-col">
                      <p className="font-semibold text-black text-sm">
                        <div className="h-auto"></div>
                        WhatsApp Us Directly
                      </p>
                      <p className="text-gray-600 text-xs">
                        Quick support & instant replies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;