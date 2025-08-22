'use client'

import React, { useEffect, useState } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { Controller } from 'react-hook-form'

const allHours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
const allMinutes = ['00', '15', '30', '45']
const periods = ['AM', 'PM']

export default function PickupDate({ register, control, watch }) {
    const pickupDate = watch('pickupDate')

    // Compute minTime = now + 2 hours
    const [minTime] = useState(() => {
        const now = new Date()
        now.setHours(now.getHours() + 2)
        return now
    })

    // Check if selected date is today
    const isToday = (() => {
        if (!pickupDate) return false
        const today = new Date()
        const sel = new Date(pickupDate)
        return (
            sel.getDate() === today.getDate() &&
            sel.getMonth() === today.getMonth() &&
            sel.getFullYear() === today.getFullYear()
        )
    })()

    // Round up minute to next slot
    const getNextMinuteSlot = (minutes) => {
        return allMinutes.find(m => parseInt(m) >= minutes) || allMinutes[0]
    }

    // Filter hours based on selected period
    const getFilteredHours = (selectedPeriod) => {
        if (!isToday) return allHours
        const hr24 = minTime.getHours()
        const minHour12 = hr24 % 12 || 12
        const minPeriod = hr24 >= 12 ? 'PM' : 'AM'

        if (selectedPeriod === minPeriod) {
            return allHours.filter(h => parseInt(h) >= minHour12)
        }
        if (selectedPeriod === 'PM' && minPeriod === 'AM') {
            return allHours
        }
        // other combos yield none
        return []
    }

    // Filter minutes when hour & period match
    const getFilteredMinutes = (h, p) => {
        if (!isToday) return allMinutes
        const hr24 = minTime.getHours()
        const minHour12 = hr24 % 12 || 12
        const minPeriod = hr24 >= 12 ? 'PM' : 'AM'

        if (p === minPeriod && parseInt(h) === minHour12) {
            const minutes = minTime.getMinutes()
            return allMinutes.filter(m => parseInt(m) >= minutes)
        }
        return allMinutes
    }

    return (
        // <div className='w-full'>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                    <CalendarDays size={16} className="text-primary" />
                    Pickup Date
                </label>
                <input
                    type="date"
                    {...register('pickupDate', { required: true })}
                    className="w-full px-4 py-1 rounded-lg border border-gray-300"
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>

            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                    <Clock size={16} className="text-primary" />
                    Pickup Time
                </label>
                <Controller
                    name="pickupTime"
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => {
                        const [hour, setHour] = useState('')
                        const [minute, setMinute] = useState('')
                        const [period, setPeriod] = useState('')

                        // On date change to today, preset to minTime
                        useEffect(() => {
                            if (isToday) {
                                const hr24 = minTime.getHours()
                                const h12 = hr24 % 12 || 12
                                const p = hr24 >= 12 ? 'PM' : 'AM'
                                const m = getNextMinuteSlot(minTime.getMinutes())
                                setHour(h12.toString().padStart(2, '0'))
                                setMinute(m)
                                setPeriod(p)
                                field.onChange(`${h12.toString().padStart(2, '0')}:${m} ${p}`)
                            }
                        }, [isToday])

                        useEffect(() => {
                            if (field.value && !isToday) {
                                const [h, m, p] = field.value.split(/[: ]/)
                                setHour(h)
                                setMinute(m)
                                setPeriod(p)
                            }
                        }, [field.value, isToday])

                        const updateTime = (h, m, p) => {
                            setHour(h)
                            setMinute(m)
                            setPeriod(p)
                            if (h && m && p) field.onChange(`${h}:${m} ${p}`)
                        }

                        const filteredHours = getFilteredHours(period || (minTime.getHours() >= 12 ? 'PM' : 'AM'))
                        const filteredMinutes = getFilteredMinutes(hour || (minTime.getHours() % 12 || 12).toString(), period || (minTime.getHours() >= 12 ? 'PM' : 'AM'))

                        return (
                            <div className="flex gap-2">
                                <select
                                    value={hour}
                                    onChange={e => updateTime(e.target.value, minute, period)}
                                    className="flex-1 px-1 py-1 border rounded-lg border-gray-300"
                                >
                                    <option value="">Hour</option>
                                    {filteredHours.map(h => (<option key={h} value={h}>{h}</option>))}
                                </select>

                                <select
                                    value={minute}
                                    onChange={e => updateTime(hour, e.target.value, period)}
                                    className="flex-1 px-1 py-1 border rounded-lg border-gray-300"
                                >
                                    <option value="">Min</option>
                                    {filteredMinutes.map(m => (<option key={m} value={m}>{m}</option>))}
                                </select>

                                <select
                                    value={period}
                                    onChange={e => updateTime(hour, minute, e.target.value)}
                                    className="flex-1 px-1 py-1 border rounded-lg border-gray-300"
                                >
                                    {/* <option value="">AM/PM</option> */}
                                    {periods.map(p => (<option key={p} value={p}>{p}</option>))}
                                </select>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
        // </div>
    )
}
