import AirportTripFormContextProvider from './context/airportTripContext'

function layout({ children }) {
    return (
        <AirportTripFormContextProvider>
            <div>
                {children}
            </div>
        </AirportTripFormContextProvider>
    )
}

export default layout
