'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { ChevronsUpDown, MapPin, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { TRIP_TYPES } from '@/lib/constants/constants';

export default function LocationSearch({
    tripType,
    register,
    setValue,
    dropOffs,
    setDropOffs,
    query,
    setQuery,
    pickupCity,
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null); // one-way or current search
    const [inputValue, setInputValue] = useState('');

    // Fetch suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (inputValue.length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&countrycodes=IN&addressdetails=1`
                );
                const data = await res.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounce);
    }, [inputValue]);

    // Register dropCity for one-way
    useEffect(() => {
        if (tripType === TRIP_TYPES.oneWay) {
            register('dropCity', { required: true });
        }
    }, [tripType, register]);

    const handleSelect = (place) => {
        if (tripType === TRIP_TYPES.oneWay) {
            setSelectedCity(place);
            setValue('dropCity', place.display_name);
            setOpen(false);
        } else {
            setSelectedCity(place);
            setOpen(false); // keep open until user clicks +
        }
        setQuery(place?.display_name);
    };

    const handleAddDropoff = () => {
        if (
            selectedCity &&
            !dropOffs.includes(selectedCity.display_name)
        ) {
            setDropOffs((prev) => [...prev, selectedCity.display_name]);
            setSelectedCity(null);
            setInputValue('');
            setQuery("");
            setSuggestions([]);
        }
    };

    const handleRemoveDropoff = (city) => {
        setDropOffs((prev) => prev.filter((c) => c !== city));
    };

    return (
        <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
                <MapPin size={16} className="text-primary" />
                Drop Location
            </label>

            {/* Hidden input for react-hook-form in One Way */}
            {tripType === TRIP_TYPES.oneWay && (
                <input
                    type="hidden"
                    {...register('dropCity', { required: true })}
                />
            )}

            <div className="flex gap-2">
                {/* Command Dropdown */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                'w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:outline-none',
                                !selectedCity?.display_name && 'text-gray-400'
                            )}
                        >
                            {selectedCity?.display_name || 'Search drop location'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[400px] p-0">
                        <Command>
                            <CommandInput
                                value={inputValue}
                                onValueChange={setInputValue}
                                placeholder="Search city..."
                                className="h-10"
                            />
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                                {suggestions.map((place) => (
                                    <CommandItem
                                        key={place.place_id}
                                        onSelect={() => handleSelect(place)}
                                    >
                                        {place.display_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Plus Button for Round Trip */}
                {tripType === TRIP_TYPES.roundTrip && (
                    <button
                        type="button"
                        onClick={handleAddDropoff}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-3 rounded-lg"
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {/* DropOffs List */}
            {tripType === TRIP_TYPES.roundTrip && dropOffs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {dropOffs.map((city, idx) => (
                        <span
                            key={idx}
                            className="flex items-center bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                        >
                            {city}
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-red-500"
                                onClick={() => handleRemoveDropoff(city)}
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
